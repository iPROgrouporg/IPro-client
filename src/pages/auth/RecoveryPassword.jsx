import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/icons/Logo.svg";
import { ProgressBar, StepperCircles } from "./RegisterStepper";
import { base_url } from "../../connection/BaseUrl";

const RecoveryPassword = () => {
  const navigate = useNavigate();
  const phoneRef = useRef(null);
  const inputRefs = useRef([]);

  const otpLength = 6;

  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    smsCode: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const inputClass = `w-full rounded-md border-2 px-4 py-2 focus:outline-none 
  border-gray-300 focus:border-blue-500 text-sm sm:text-base transition`;

  const errorClass = "text-red-500 text-xs mt-1";

  // ================= HELPERS =================
  const formatPhone = (phone) => phone.replace(/\+/g, ""); // +998 -> 998

  // ================= OTP =================
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const otpArray = formData.smsCode.split("");
    otpArray[index] = value;

    const newOtp = otpArray.join("");

    setFormData((prev) => ({ ...prev, smsCode: newOtp }));

    if (value && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !formData.smsCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, otpLength);
    if (!/^\d+$/.test(paste)) return;

    setFormData((prev) => ({ ...prev, smsCode: paste }));
  };

  // ================= INPUT =================
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
    }
  };

  const handlePhoneBlur = () => {
    if (formData.phone === "+998") {
      setFormData((prev) => ({ ...prev, phone: "" }));
    }
  };

  // ================= API CALLS =================

  // STEP 1 → SEND OTP
  const sendOtp = async () => {
    try {
      setLoading(true);

      const res = await base_url.post("/auth/forgot-password", {
        phoneNumber: formatPhone(formData.phone),
      });

      setStep(2);
      setErrors({});
    } catch (err) {
      setErrors({
        phone: err.response?.data?.message || "Xatolik yuz berdi",
      });
    } finally {
      setLoading(false);
    }
  };

  // STEP 2 → VERIFY OTP
  const verifyOtp = async () => {
    try {
      setLoading(true);

      await base_url.post("/auth/verify-reset-otp", {
        phoneNumber: formatPhone(formData.phone),
        otp: formData.smsCode,
      });

      setStep(3);
      setErrors({});
    } catch (err) {
      setErrors({
        smsCode: err.response?.data?.message || "Kod noto‘g‘ri",
      });
    } finally {
      setLoading(false);
    }
  };

  // STEP 3 → RESET PASSWORD
  const resetPassword = async () => {
    try {
      setLoading(true);

      await base_url.post("/auth/reset-password", {
        phoneNumber: formatPhone(formData.phone),
        newPassword: formData.newPassword,
      });

      navigate("/login");
    } catch (err) {
      setErrors({
        confirmPassword: err.response?.data?.message || "Xatolik",
      });
    } finally {
      setLoading(false);
    }
  };

  // ================= VALIDATION =================
  const validateStep1 = () => {
    if (!formData.phone.startsWith("+998") || formData.phone.length !== 13) {
      setErrors({ phone: "Telefon noto‘g‘ri" });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (formData.smsCode.length !== 6) {
      setErrors({ smsCode: "6 ta kod kiriting" });
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (formData.newPassword.length < 8) {
      setErrors({ newPassword: "Kamida 8 ta belgi" });
      return false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Parollar mos emas" });
      return false;
    }

    return true;
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    if (step === 1) {
      if (validateStep1()) await sendOtp();
    }

    if (step === 2) {
      if (validateStep2()) await verifyOtp();
    }

    if (step === 3) {
      if (validateStep3()) await resetPassword();
    }
  };

  // ================= UI (UNCHANGED) =================
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
            className="rounded-md border-2 border-black py-1 px-5 text-sm"
          >
            Log In
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex flex-1 items-center justify-center px-4 pb-10">
          <div className="w-full max-w-md">

            {/* TITLE */}
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold">
                Parolni tiklash
              </h1>
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
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={handlePhoneFocus}
                  onBlur={handlePhoneBlur}
                  placeholder="Telefon raqam"
                  className={`${inputClass} ${errors.phone && "border-red-500"}`}
                />
                {errors.phone && <p className={errorClass}>{errors.phone}</p>}
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <p className="text-center text-sm text-gray-500 mb-4">
                  Kod yuborildi:{" "}
                  <span className="font-medium">{formData.phone}</span>
                </p>

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
                      className={`w-12 h-12 text-center border-2 rounded-lg text-lg ${
                        errors.smsCode ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {errors.smsCode && (
                  <p className="text-red-500 text-xs mt-2">{errors.smsCode}</p>
                )}
              </>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-3">
                <input
                  type="password"
                  name="newPassword"
                  placeholder="Yangi parol"
                  onChange={handleChange}
                  className={`${inputClass} ${errors.newPassword && "border-red-500"}`}
                />
                {errors.newPassword && (
                  <p className={errorClass}>{errors.newPassword}</p>
                )}

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Parolni takrorlang"
                  onChange={handleChange}
                  className={`${inputClass} ${
                    errors.confirmPassword && "border-red-500"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className={errorClass}>{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {/* BUTTONS */}
            <div className="mt-6 flex gap-3">

              {(step === 2 || step === 3) && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="w-1/2 border border-gray-300 py-2.5 rounded-md"
                >
                  Ortga
                </button>
              )}

              <button
                disabled={loading}
                onClick={handleSubmit}
                className={`${step === 1 ? "w-full" : "w-1/2"} bg-blue-600 text-white py-2.5 rounded-md`}
              >
                {loading ? "Yuklanmoqda..." : step === 3 ? "Saqlash" : "Davom etish"}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="hidden lg:flex lg:flex-[2.5] p-8 text-white justify-center items-center bg-blue-700">
        <StepperCircles currentStep={step} totalSteps={3} />
      </div>
    </div>
  );
};

export default RecoveryPassword;