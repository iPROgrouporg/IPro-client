import React, { useState, useRef } from "react";
import Logo from "../../assets/icons/Logo.svg";
import { StepperCircles, ProgressBar } from "./RegisterStepper";
import { Link } from "react-router-dom";

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);

  // Form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    confirmPassword: "",
    smsCode: "",
  });

  const [errors, setErrors] = useState({});
  const phoneRef = useRef(null);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const v = value.replace(/\s+/g, "");
      if (!/^\+?\d*$/.test(v)) return;
      if (v.length > 13) return;
      setFormData((prev) => ({ ...prev, phone: v }));
      return;
    }

    if (name === "smsCode") {
      if (!/^\d{0,6}$/.test(value)) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validation step 1
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName || formData.firstName.trim().length < 3) {
      newErrors.firstName = "Ismingizni to'liq kiriting (kamida 3 harf)";
    }
    if (!formData.lastName || formData.lastName.trim().length < 4) {
      newErrors.lastName = "Familiyangizni to'liq kiriting (kamida 4 harf)";
    }
    if (!formData.phone || !formData.phone.startsWith("+998") || formData.phone.length !== 13) {
      newErrors.phone = "Telefon raqam to'liq bo'lishi kerak (masalan: +998901234567)";
    }
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Parol kamida 8 ta belgidan iborat bo'lishi kerak";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Parol va takrorlash paroli bir xil bo'lishi kerak";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validation step 2
  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.smsCode || formData.smsCode.length !== 6) {
      newErrors.smsCode = "SMS kod 6 ta raqamdan iborat bo'lishi kerak";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit - ASOSIY TUZATISH
  const handleSubmit = () => {
    if (currentStep === 1) {
      const isValid = validateStep1();
      if (isValid) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      const isValid = validateStep2();
      if (isValid) {
        setCurrentStep(3);
      }
    } else if (currentStep === 3) {
      alert("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
    }
  };

  // Telefon input - TUZATILGAN
  const handlePhoneFocus = () => {
    if (!formData.phone || formData.phone === "") {
      setFormData((prev) => ({ ...prev, phone: "+998" }));
      // setTimeout ni olib tashladim, bu muammo chiqarardi
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

  const inputClass =
    "w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base";

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      {/* Chap panel */}
      <div className="flex-1 lg:flex-[7.5] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between w-full px-4 sm:px-6 lg:px-10 py-4">
          <img src={Logo} alt="Logo" className="w-20 sm:w-24" />
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

        {/* Form */}
        <div className="flex flex-1 items-center justify-center px-4 sm:px-6">
          <div className="w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-md">
            {/* Title */}
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">IPRO GROUP</h1>
              <p className="text-gray-400 text-sm sm:text-base">
                {currentStep === 1 && "Ro'yxatdan o'ting"}
                {currentStep === 2 && "Telefon raqamingizni tasdiqlang"}
                {currentStep === 3 && "Tabriklaymiz!"}
              </p>
            </div>

            {/* Step 1 - KEY QO'SHILDI */}
            {currentStep === 1 && (
              <div key="step1">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="w-full">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Ismingiz"
                      className={inputClass}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Familiyangiz"
                      className={inputClass}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div>
                    <input
                      ref={phoneRef}
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={handlePhoneFocus}
                      onBlur={handlePhoneBlur}
                      placeholder="Telefon raqamingizni kiriting"
                      className={inputClass}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Parol"
                      className={inputClass}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  </div>

                  <div>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Parolni takrorlang"
                      className={inputClass}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 - KEY QO'SHILDI */}
            {currentStep === 2 && (
              <div key="step2" className="mt-4 space-y-3">
                <input
                  type="text"
                  name="smsCode"
                  value={formData.smsCode}
                  onChange={handleChange}
                  placeholder="SMS kod (6 raqam)"
                  className={inputClass}
                  inputMode="numeric"
                />
                {errors.smsCode && <p className="text-red-500 text-xs mt-1">{errors.smsCode}</p>}
              </div>
            )}

            {/* Step 3 - KEY QO'SHILDI */}
            {currentStep === 3 && (
              <div key="step3" className="text-center mt-6">
                <p className="text-blue-600 font-semibold text-lg">
                  Siz muvaffaqiyatli ro'yxatdan o'tdingiz!
                </p>
              </div>
            )}

            {/* Progress */}
            <div className="w-full max-w-sm mt-4 mx-auto">
              <ProgressBar currentStep={currentStep} />
            </div>

            {/* Button */}
            <div className="mt-6">
              {currentStep < 3 && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 text-white py-2.5 rounded-md font-medium hover:bg-blue-700 transition text-sm sm:text-base"
                >
                  {currentStep === 1 ? "Davom etish" : "Tasdiqlash"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* O'ng panel */}
      <div
        className="hidden lg:flex lg:flex-[2.5] p-8 text-white flex-col justify-center items-center"
        style={{
          background: "linear-gradient(119deg, #1d4ed8 50%, #1d4ed8 55%, #1e3a8a 55%, #1e3a8a 100%)",
        }}
      >
        <div className="w-full max-w-xs">
          <StepperCircles currentStep={currentStep} />
        </div>
      </div>
    </div>
  );
};

export default Register;