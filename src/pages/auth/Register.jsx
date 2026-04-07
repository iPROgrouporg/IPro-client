import React, { useState, useRef } from "react";
import Logo from "../../assets/icons/Logo.svg";
import { StepperCircles, ProgressBar } from "./RegisterStepper";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const phoneRef = useRef(null);
  const inputRefs = useRef([]); // 🔥 OTP refs
  const otpLength = 6;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    confirmPassword: "",
    smsCode: "",
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

  // 🔥 backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !formData.smsCode[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // 🔥 paste
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

  // Input change
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

  // Validation
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName || formData.firstName.trim().length < 3) {
      newErrors.firstName = "Ismingizni to'liq kiriting";
    }
    if (!formData.lastName || formData.lastName.trim().length < 4) {
      newErrors.lastName = "Familiyangizni to'liq kiriting";
    }
    if (!formData.phone || !formData.phone.startsWith("+998") || formData.phone.length !== 13) {
      newErrors.phone = "Telefon noto‘g‘ri";
    }
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Parol kamida 8 ta";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Parollar mos emas";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.smsCode || formData.smsCode.length !== 6) {
      newErrors.smsCode = "SMS kod 6 ta raqamdan iborat bo'lishi kerak";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (currentStep === 1 && validateStep1()) setCurrentStep(2);
    else if (currentStep === 2 && validateStep2()) setCurrentStep(3);
    else if (currentStep === 3) {
      alert("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
    }
  };

  // Phone UX
  const handlePhoneFocus = () => {
    if (!formData.phone) {
      setFormData((prev) => ({ ...prev, phone: "+998" }));
      if (phoneRef.current) {
        const len = phoneRef.current.value.length;
        phoneRef.current.setSelectionRange(len, len);
      }
    }
  };

  const handlePhoneBlur = () => {
    if (formData.phone === "+998") {
      setFormData((prev) => ({ ...prev, phone: "" }));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">

      {/* LEFT */}
      <div className="flex-1 lg:flex-[7.5] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4">
          <img src={Logo} alt="Logo" className="w-20 cursor-pointer sm:w-24" onClick={() => navigate('/')} />
          <div className="flex items-center gap-x-3">
            <p className="text-xs sm:text-sm">Ro'yxatdan o'tganmisiz?</p>
            <Link
              to="/login"
              className="rounded-md border-2 border-black py-1 px-4 sm:px-6 text-sm text-black font-medium hover:shadow-lg transition"
            >
              Log In
            </Link>
          </div>
        </div>

        {/* FORM */}
        <div className="flex flex-1 items-center justify-center px-4 sm:px-6 pb-10 sm:pb-16">
          <div className="w-full max-w-md">

            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">IPRO GROUP</h1>
              <p className="text-gray-400 text-sm sm:text-base">
                {currentStep === 1 && "Ro'yxatdan o'ting"}
                {currentStep === 2 && "Telefon raqamingizni tasdiqlang"}
                {currentStep === 3 && "Tabriklaymiz!"}
              </p>
            </div>

            {/* STEP 1 */}
            {currentStep === 1 && (
              <div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input name="firstName" placeholder="Ismingiz" className={inputClass} onChange={handleChange} />
                  <input name="lastName" placeholder="Familiyangiz" className={inputClass} onChange={handleChange} />
                </div>

                <div className="mt-4 space-y-3">
                  <input ref={phoneRef} name="phone" placeholder="Telefon" className={inputClass} onChange={handleChange} onFocus={handlePhoneFocus} onBlur={handlePhoneBlur} />
                  <input type="password" name="password" placeholder="Parol" className={inputClass} onChange={handleChange} />
                  <input type="password" name="confirmPassword" placeholder="Parolni takrorlang" className={inputClass} onChange={handleChange} />
                </div>
              </div>
            )}

            {/* STEP 2 OTP */}
            {currentStep === 2 && (
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
            {currentStep === 3 && (
              <div className="text-center mt-6">
                <p className="text-blue-600 font-semibold text-lg">
                  Siz muvaffaqiyatli ro'yxatdan o'tdingiz!
                </p>
              </div>
            )}

            <div className="w-full max-w-sm mt-5 mx-auto">
              <ProgressBar currentStep={currentStep} />
            </div>

            <div className="mt-6">
              {currentStep < 3 && (
                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 text-white py-2.5 rounded-md font-medium hover:bg-blue-700 transition"
                >
                  {currentStep === 1 ? "Davom etish" : "Tasdiqlash"}
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="hidden lg:flex lg:flex-[2.5] p-8 text-white justify-center items-center bg-blue-700">
        <StepperCircles currentStep={currentStep} />
      </div>
    </div>
  );
};

export default Register;