import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/icons/Logo.svg";
import { ProgressBar, StepperCircles } from "./RegisterStepper";
import { base_url } from "../../connection/BaseUrl";
import { Eye, EyeOff } from "lucide-react";


const RecoveryPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

  const otpLength = 6;
  const inputRefs = useRef([]);
  const timerRef = useRef(null);

  const [step, setStep] = useState(() => {
    return Number(localStorage.getItem("recovery_step")) || 1;
  });

  const [formData, setFormData] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("recovery_form")) || {
        phone: "+998",
        smsCode: "",
        newPassword: "",
        confirmPassword: "",
      }
    );
  });
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

  // ================= TIMER (FIXED) =================
  const [otpTimer, setOtpTimer] = useState(() => {
    return Number(localStorage.getItem("otp_timer")) || 0;
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const inputClass =
    "w-full rounded-md border-2 px-4 py-2 focus:outline-none border-gray-300 focus:border-blue-500 text-sm sm:text-base transition";

  const errorClass = "text-red-500 text-xs mt-1";

  // ================= TIMER ENGINE =================
  const startTimer = (seconds = 120) => {
    const endTime = Date.now() + seconds * 1000;
    localStorage.setItem("otp_end_time", endTime);

    runTimer();
  };

  const runTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      const endTime = Number(localStorage.getItem("otp_end_time"));
      const diff = Math.max(0, Math.floor((endTime - Date.now()) / 1000));

      setOtpTimer(diff);
      localStorage.setItem("otp_timer", diff);

      if (diff <= 0) {
        clearInterval(timerRef.current);
      }
    }, 1000);
  };

  // ================= RESTORE TIMER ON LOAD =================
  useEffect(() => {
    const endTime = Number(localStorage.getItem("otp_end_time"));

    if (endTime) {
      runTimer();
    }

    return () => clearInterval(timerRef.current);
  }, []);

  // ================= SAVE STATE =================
  useEffect(() => {
    localStorage.setItem("recovery_step", step);
  }, [step]);

  useEffect(() => {
    localStorage.setItem("recovery_form", JSON.stringify(formData));
  }, [formData]);

  // ================= PHONE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((p) => ({
      ...p,
      [name]: value,
    }));
  };

  // ================= OTP =================
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const arr = formData.smsCode.split("");
    arr[index] = value;

    const newOtp = arr.join("");

    setFormData((p) => ({ ...p, smsCode: newOtp }));

    if (value && index < otpLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !formData.smsCode[index]) {
      inputRefs.current[index - 1]?.focus();
    }
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

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, otpLength);
    if (!/^\d+$/.test(paste)) return;

    setFormData((p) => ({ ...p, smsCode: paste }));
  };

  // ================= API =================
  const sendOtp = async () => {
    setLoading(true);
    try {
      await base_url.post("/auth/forgot-password", {
        phoneNumber: formData.phone.replace(/\D/g, ""),
      });

      setStep(2);
      startTimer(120);
    } catch (err) {
      setErrors({ phone: "Telefon xato" });
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      await base_url.post("/auth/verify-reset-otp", {
        phoneNumber: formData.phone.replace(/\D/g, ""),
        otp: formData.smsCode,
      });

      setStep(3);
    } catch {
      setErrors({ smsCode: "Kod xato" });
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    setLoading(true);
    try {
      await base_url.post("/auth/reset-password", {
        phoneNumber: formData.phone.replace(/\D/g, ""),
        newPassword: formData.newPassword,
      });

      localStorage.removeItem("recovery_step");
      localStorage.removeItem("recovery_form");
      localStorage.removeItem("otp_timer");
      localStorage.removeItem("otp_end_time");

      navigate("/login");
    } catch {
      setErrors({ confirmPassword: "Xatolik" });
    } finally {
      setLoading(false);
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = () => {
    if (step === 1) return sendOtp();
    if (step === 2) return verifyOtp();
    if (step === 3) return resetPassword();
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
            {step === 3 && (
              <div className="space-y-3">
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
                {errors.newPassword && (
                  <p className={errorClass}>{errors.newPassword}</p>
                )}

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