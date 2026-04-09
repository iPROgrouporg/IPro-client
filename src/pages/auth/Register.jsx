import React, { useState, useRef } from "react";
import Logo from "../../assets/icons/Logo.svg";
import { StepperCircles, ProgressBar } from "./RegisterStepper";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// --- API FUNCTION --- //
const authApi = {
  register: async (data) => {
    const res = await fetch("http://localhost:2025/api/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  verifyOtp: async (data) => {
    const res = await fetch("http://localhost:2025/api/v1/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const phoneRef = useRef(null);
  const inputRefs = useRef([]);
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
  const [loading, setLoading] = useState(false);

  const inputClass = `w-full rounded-md border-2 px-4 py-2 focus:outline-none 
    border-gray-300 focus:border-blue-500 text-sm sm:text-base transition`;
  const errorClass = "text-red-500 text-xs mt-1";

  // --- OTP HANDLERS --- //
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtp = formData.smsCode.split("");
    newOtp[index] = value;
    setFormData((prev) => ({ ...prev, smsCode: newOtp.join("") }));

    if (value && index < otpLength - 1) inputRefs.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !formData.smsCode[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, otpLength);
    if (!/^\d+$/.test(paste)) return;
    setFormData((prev) => ({ ...prev, smsCode: paste }));
  };

  // --- INPUT HANDLER --- //
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

  // --- VALIDATION --- //
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName || formData.firstName.trim().length < 3)
      newErrors.firstName = "Ism kamida 3 ta harf";
    if (!formData.lastName || formData.lastName.trim().length < 3)
      newErrors.lastName = "Familiya kamida 3 ta harf";
    if (!formData.phone.startsWith("+998") || formData.phone.length !== 13)
      newErrors.phone = "Telefon noto‘g‘ri";
    if (!formData.password || formData.password.length < 8)
      newErrors.password = "Parol kamida 8 ta";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Parollar mos emas";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.smsCode || formData.smsCode.length !== 6)
      newErrors.smsCode = "SMS kod 6 ta raqam";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- SUBMIT --- //
  const handleSubmit = async () => {
    if (currentStep === 1) {
      if (!validateStep1()) return;

      setLoading(true);
      try {
        const phoneForBackend = formData.phone.replace("+", "");
        const res = await authApi.register({
          fullName: formData.firstName + " " + formData.lastName,
          phoneNumber: phoneForBackend,
          password: formData.password,
        });

        if (res.success) {
          setCurrentStep(2);
        } else {
          setErrors({ phone: res.message || "Xatolik yuz berdi" });
        }
      } catch (err) {
        setErrors({ phone: "Server bilan bog‘lanishda xatolik" });
      } finally {
        setLoading(false);
      }
    } else if (currentStep === 2) {
      if (!validateStep2()) return;

      setLoading(true);
      try {
        const phoneForBackend = formData.phone.replace("+", "");
        const res = await authApi.verifyOtp({
          phoneNumber: phoneForBackend,
          code: formData.smsCode,
        });

        if (res.success) {
          setCurrentStep(3);
          setTimeout(() => navigate("/login"), 1500);
        } else {
          setErrors({ smsCode: res.message || "Kod noto‘g‘ri" });
        }
      } catch (err) {
        setErrors({ smsCode: "Server bilan bog‘lanishda xatolik" });
      } finally {
        setLoading(false);
      }
    }
  };

  // --- PHONE UX --- //
  const handlePhoneFocus = () => {
    if (!formData.phone) setFormData((prev) => ({ ...prev, phone: "+998" }));
  };

  const handlePhoneBlur = () => {
    if (formData.phone === "+998") setFormData((prev) => ({ ...prev, phone: "" }));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">

      {/* LEFT */}
      <div className="flex-1 lg:flex-[7.5] flex flex-col">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4">
          <img src={Logo} alt="Logo" className="w-20 cursor-pointer sm:w-24" onClick={() => navigate('/')} />
          <div className="flex items-center gap-x-3">
            <p className="text-xs sm:text-sm">{t('loginText')}</p>
            <Link to="/login" className="rounded-md text-black border-2 border-black py-1 px-4 sm:px-6 text-sm">
              {t('loginButton')}
            </Link>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 sm:px-6 pb-10 sm:pb-16">
          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">IPRO GROUP</h1>
              <p className="text-gray-400 text-sm sm:text-base">
                {currentStep === 1 && t('pageSubtitleStep1')}
                {currentStep === 2 && t('pageSubtitleStep2')}
                {currentStep === 3 && t('pageSubtitleStep3')}
              </p>
            </div>

            {/* STEP 1 */}
            {currentStep === 1 && (
              <div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="w-full">
                    <input
                      name="firstName"
                      placeholder={t('firstNamePlaceholder')}
                      className={`${inputClass} ${errors.firstName && "border-red-500"}`}
                      onChange={handleChange}
                    />
                    {errors.firstName && <p className={errorClass}>{errors.firstName}</p>}
                  </div>

                  <div className="w-full">
                    <input
                      name="lastName"
                      placeholder={t('lastNamePlaceholder')}
                      className={`${inputClass} ${errors.lastName && "border-red-500"}`}
                      onChange={handleChange}
                    />
                    {errors.lastName && <p className={errorClass}>{errors.lastName}</p>}
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div>
                    <input
                      ref={phoneRef}
                      name="phone"
                      placeholder={t('phonePlaceholder')}
                      className={`${inputClass} ${errors.phone && "border-red-500"}`}
                      onChange={handleChange}
                      onFocus={handlePhoneFocus}
                      onBlur={handlePhoneBlur}
                    />
                    {errors.phone && <p className={errorClass}>{errors.phone}</p>}
                  </div>

                  <div>
                    <input
                      type="password"
                      name="password"
                      placeholder={t('passwordPlaceholder')}
                      className={`${inputClass} ${errors.password && "border-red-500"}`}
                      onChange={handleChange}
                    />
                    {errors.password && <p className={errorClass}>{errors.password}</p>}
                  </div>

                  <div>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder={t('confirmPasswordPlaceholder')}
                      className={`${inputClass} ${errors.confirmPassword && "border-red-500"}`}
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && <p className={errorClass}>{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {currentStep === 2 && (
              <>
                <p className="text-center text-sm text-gray-500 mb-4">
                  Kod yuborildi: <span className="font-medium">{formData.phone}</span>
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
                      className={`w-12 h-12 text-center border-2 rounded-lg text-lg font-semibold 
                      ${errors.smsCode ? "border-red-500" : "border-gray-300"}`}
                    />
                  ))}
                </div>
                {errors.smsCode && <p className="text-red-500 text-xs mt-2">{errors.smsCode}</p>}
              </>
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

            {/* BUTTONS */}
            <div className="mt-6 flex gap-3">
              {currentStep === 2 && (
                <button
                  onClick={() => setCurrentStep(1)}
                  className="w-1/2 border border-gray-300 py-2.5 rounded-md font-medium hover:bg-gray-100"
                >
                  {t('rBack')}
                </button>
              )}
              {currentStep < 3 && (
                <button
                  onClick={handleSubmit}
                  className={`${currentStep === 2 ? "w-1/2" : "w-full"} bg-blue-600 text-white py-2.5 rounded-md font-medium hover:bg-blue-700`}
                  disabled={loading}
                >
                  {loading ? "Yuklanmoqda..." : currentStep === 1 ? t("rButton") : t("rtButton")}
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