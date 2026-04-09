import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/icons/Logo.svg";
import { ProgressBar, StepperCircles } from "./RegisterStepper";

const RecoveryPassword = () => {
  const navigate = useNavigate();
  const phoneRef = useRef(null);
  const inputRefs = useRef([]); // 🔥 OTP refs

  const otpLength = 6;

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    phone: "",
    smsCode: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const inputClass = `w-full rounded-md border-2 px-4 py-2 focus:outline-none 
    border-gray-300 focus:border-blue-500 text-sm sm:text-base transition`;

  // 🔥 OTP change
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtp = formData.smsCode.split("");
    newOtp[index] = value;

    const finalOtp = newOtp.join("");
    setFormData((prev) => ({ ...prev, smsCode: finalOtp }));

    if (value && index < otpLength - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // 🔥 OTP backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !formData.smsCode[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // 🔥 OTP paste
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, otpLength);
    if (!/^\d+$/.test(paste)) return;

    setFormData((prev) => ({ ...prev, smsCode: paste }));

    paste.split("").forEach((num, i) => {
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = num;
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const v = value.replace(/\s+/g, "");
      if (!/^\+?\d*$/.test(v)) return;
      if (v.length > 13) return;
      setFormData((prev) => ({ ...prev, phone: v }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneFocus = () => {
    if (!formData.phone) {
      setFormData((prev) => ({ ...prev, phone: "+998" }));
      setTimeout(() => {
        const len = phoneRef.current.value.length;
        phoneRef.current.setSelectionRange(len, len);
      }, 0);
    }
  };

  const handlePhoneBlur = () => {
    if (formData.phone === "+998") {
      setFormData((prev) => ({ ...prev, phone: "" }));
    }
  };

  const validateStep1 = () => {
    const err = {};
    if (!formData.phone || !formData.phone.startsWith("+998") || formData.phone.length !== 13) {
      err.phone = "Telefon to‘liq bo‘lishi kerak (+998901234567)";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const validateStep2 = () => {
    const err = {};
    if (!formData.smsCode || formData.smsCode.length !== 6) {
      err.smsCode = "SMS kod 6 ta raqam";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const validateStep3 = () => {
    const err = {};
    if (!formData.newPassword || formData.newPassword.length < 8) {
      err.newPassword = "Parol kamida 8 ta belgidan iborat";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      err.confirmPassword = "Parollar mos emas";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
    else if (step === 3 && validateStep3()) {
      alert("Parol muvaffaqiyatli o‘zgartirildi!");
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">

      {/* LEFT */}
      <div className="flex-1 lg:flex-[7.5] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4">
          <img
            src={Logo}
            alt="Logo"
            className="w-20 cursor-pointer sm:w-24"
            onClick={() => navigate("/")}
          />
          <button
            onClick={() => navigate("/login")}
            className="rounded-md border-2 border-black py-1 px-5 text-sm font-medium hover:shadow-lg transition"
          >
            Log In
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex flex-1 items-center justify-center px-4 pb-10">
          <div className="w-full max-w-md">

            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold">Parolni tiklash</h1>
              <p className="text-gray-400 text-sm mt-1">
                {step === 1 && "Telefon raqamingizni kiriting"}
                {step === 2 && "SMS kodni kiriting"}
                {step === 3 && "Yangi parol yarating"}
              </p>
            </div>

            <div className="w-full max-w-sm mb-6 mx-auto">
              <ProgressBar currentStep={step} totalSteps={3} />
            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <div>
                <input
                  ref={phoneRef}
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={handlePhoneFocus}
                  onBlur={handlePhoneBlur}
                  placeholder="Telefon raqam"
                  className={inputClass}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            )}

            {/* STEP 2 OTP */}
            {step === 2 && (
              <div onPaste={handlePaste} className="flex justify-between gap-2">
                {[...Array(otpLength)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={formData.smsCode[index] || ""}
                    onChange={(e) => handleOtpChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg text-lg font-semibold focus:border-blue-500 focus:outline-none transition"
                  />
                ))}
              </div>
            )}

            {errors.smsCode && (
              <p className="text-red-500 text-xs mt-2">{errors.smsCode}</p>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-3">
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Yangi parol"
                  className={inputClass}
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-xs">{errors.newPassword}</p>
                )}

                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Parolni takrorlang"
                  className={inputClass}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {/* BUTTON */}
            <div className="mt-6">
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-2.5 rounded-md font-medium hover:bg-blue-700 transition"
              >
                {step === 3 ? "Saqlash" : "Davom etish"}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div
        className="hidden lg:flex lg:flex-[2.5] p-8 text-white flex-col justify-center items-center"
        style={{
          background:
            "linear-gradient(119deg, #1d4ed8 50%, #1d4ed8 55%, #1e3a8a 55%, #1e3a8a 100%)",
        }}
      >
        <div className="w-full max-w-xs">
          <StepperCircles currentStep={step} totalSteps={3} />
        </div>
      </div>
    </div>
  );
};

export default RecoveryPassword;