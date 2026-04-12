import React, { useState, useRef, useEffect } from "react";
import Logo from "../../assets/icons/Logo.svg";
import { StepperCircles, ProgressBar } from "./RegisterStepper";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { authApi } from "../../connection/BaseUrl";
import { Eye, EyeOff } from "lucide-react";


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
 const navigate = useNavigate();
  const { t } = useTranslation();

  const otpLength = 6;
  const inputRefs = useRef([]);
  const timerRef = useRef(null);

  // ================= SAFE INIT =================
  const [currentStep, setCurrentStep] = useState(() => {
    return Number(localStorage.getItem("registerStep")) || 1;
  });

  const [formData, setFormData] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("registerForm")) || {
        firstName: "",
        lastName: "",
        phone: "+998",
        password: "",
        confirmPassword: "",
        smsCode: "",
      }
    );
  });

  const [otpExpire, setOtpExpire] = useState(() => {
    return Number(localStorage.getItem("otpExpire")) || 0;
  });

  const [otpTimer, setOtpTimer] = useState(0);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ================= STYLE FIX (ERROR FIXED) =================
  const inputClass =
    "w-full rounded-md border-2 px-4 py-2 focus:outline-none border-gray-300 focus:border-blue-500 text-sm sm:text-base transition";

  const errorClass = "text-red-500 text-xs mt-1";

  // ================= TIMER ENGINE (REAL FIX) =================
  const syncTimer = () => {
    const diff = Math.floor((otpExpire - Date.now()) / 1000);
    setOtpTimer(diff > 0 ? diff : 0);
  };

  useEffect(() => {
    syncTimer();
    const interval = setInterval(syncTimer, 1000);
    return () => clearInterval(interval);
  }, [otpExpire]);

  // ================= START OTP =================
  const startOtpTimer = () => {
    const expire = Date.now() + 120 * 1000;
    setOtpExpire(expire);
    localStorage.setItem("otpExpire", expire);
  };

  // ================= RESEND =================
  const handleResendOtp = async () => {
    const phone = formData.phone.replace(/\D/g, "");

    try {
      const res = await authApi.resendOtp(phone);

      if (res.data?.success) {
        setFormData((p) => ({ ...p, smsCode: "" }));
        startOtpTimer();
      }
    } catch (err) {
      setErrors({ smsCode: "Server error" });
    }
  };

  // ================= INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors((p) => ({ ...p, [name]: "" }));
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // ================= OTP =================
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const arr = formData.smsCode.split("");
    arr[index] = value;

    setFormData((p) => ({
      ...p,
      smsCode: arr.join(""),
    }));

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

    setFormData((p) => ({ ...p, smsCode: paste }));
  };

  // ================= VALIDATE =================
  const validateStep1 = () => {
    const err = {};
    const phone = formData.phone.replace(/\D/g, "");

    if (formData.firstName.length < 3) err.firstName = "Ism 3 ta harf";
    if (formData.lastName.length < 3) err.lastName = "Familiya 3 ta harf";
    if (!phone.startsWith("998") || phone.length !== 12)
      err.phone = "Telefon noto‘g‘ri";
    if (formData.password.length < 8) err.password = "Parol 8 ta";
    if (formData.password !== formData.confirmPassword)
      err.confirmPassword = "Parollar mos emas";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const validateStep2 = () => {
    const err = {};
    if (formData.smsCode.length !== 6)
      err.smsCode = "SMS kod 6 ta raqam";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    const phone = formData.phone.replace(/\D/g, "");

    if (currentStep === 1) {
      if (!validateStep1()) return;

      setLoading(true);
      try {
        const res = await authApi.register({
          fullName: formData.firstName + " " + formData.lastName,
          phoneNumber: phone,
          password: formData.password,
        });

        if (res.data?.success) {
          setCurrentStep(2);
          localStorage.setItem("registerStep", "2");

          startOtpTimer(); // 🔥 REAL FIX
        }
      } finally {
        setLoading(false);
      }
    }

    if (currentStep === 2) {
      if (!validateStep2()) return;

      setLoading(true);
      try {
        const res = await authApi.verifyOtp({
          phoneNumber: phone,
          otp: formData.smsCode,
        });

        if (res.data?.success) {
          const loginRes = await authApi.login({
            phoneNumber: phone,
            password: formData.password,
          });

          const token =
            loginRes.data?.token ||
            loginRes.data?.data?.token ||
            loginRes.data?.accessToken;

          if (!token) return;

          localStorage.setItem("token", token);

          localStorage.removeItem("registerStep");
          localStorage.removeItem("otpExpire");

          setCurrentStep(3);

          setTimeout(() => navigate("/"), 500);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  // ================= PERSIST =================
  useEffect(() => {
    localStorage.setItem("registerStep", currentStep);
  }, [currentStep]);

  useEffect(() => {
    localStorage.setItem("registerForm", JSON.stringify(formData));
  }, [formData]);

  // ================= CLEANUP =================
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const phoneRef = useRef(null);


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
                    <input name="firstName" placeholder={t('firstNamePlaceholder')}
                      className={`${inputClass} ${errors.firstName && "border-red-500"}`}
                      onChange={handleChange}
                      value={formData.firstName}/>
                    {errors.firstName && <p className={errorClass}>{errors.firstName}</p>}
                  </div>

                  <div className="w-full">
                    <input name="lastName" placeholder={t('lastNamePlaceholder')}
                      className={`${inputClass} ${errors.lastName && "border-red-500"}`}
                      onChange={handleChange}
                      value={formData.lastName}/>
                    {errors.lastName && <p className={errorClass}>{errors.lastName}</p>}
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <input ref={phoneRef} name="phone" placeholder={t('phonePlaceholder')}
                    className={`${inputClass} ${errors.phone && "border-red-500"}`}
                    onChange={handleChange}
                    onFocus={handlePhoneFocus}
                    onBlur={handlePhoneBlur}
                    value={formData.phone}/>
                  {errors.phone && <p className={errorClass}>{errors.phone}</p>}

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="newPassword"
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Yangi parol"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                
                  </div>

                 <div className="relative mt-3">
  <input
    type={showConfirmPassword ? "text" : "password"}
    name="confirmPassword"
    onChange={handleChange}
    className={inputClass}
    placeholder="Parolni takrorlang"
  />

  <button
    type="button"
    onClick={() => setShowConfirmPassword((p) => !p)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
  >
    {showConfirmPassword ? (
      <EyeOff size={18} />
    ) : (
      <Eye size={18} />
    )}
  </button>
</div>
                  {errors.confirmPassword && <p className={errorClass}>{errors.confirmPassword}</p>}
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
                    <input key={index} type="text" maxLength={1}
                      value={formData.smsCode[index] || ""}
                      onChange={(e) => handleOtpChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      ref={(el) => (inputRefs.current[index] = el)}
                      className={`w-12 h-12 text-center border-2 rounded-lg text-lg font-semibold 
                      ${errors.smsCode ? "border-red-500" : "border-gray-300"}`}/>
                  ))}
                </div>
                {errors.smsCode && <p className="text-red-500 text-xs mt-2">{errors.smsCode}</p>}

                <p className="text-center text-xs text-blue-600 mt-2">
                  {otpTimer > 0
                    ? `Kod amal qilish vaqti: ${Math.floor(otpTimer / 60)}:${(otpTimer % 60)
                        .toString()
                        .padStart(2, "0")}`
                    : "Kod muddati tugagan"}
                </p>

                {otpTimer === 0 && (
                  <button
                    onClick={handleResendOtp}
                    className="text-blue-600 text-xs mt-2 underline"
                  >
                    Yangi kod olish
                  </button>
                )}
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

            <div className="mt-6 flex gap-3">
              {currentStep === 2 && (
                <button onClick={() => setCurrentStep(1)}
                  className="w-1/2 border border-gray-300 py-2.5 rounded-md font-medium hover:bg-gray-100">
                  {t('rBack')}
                </button>
              )}

              {currentStep < 3 && (
                <button onClick={handleSubmit}
                  className={`${currentStep === 2 ? "w-1/2" : "w-full"} bg-blue-600 text-white py-2.5 rounded-md font-medium hover:bg-blue-700`}
                  disabled={loading}>
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