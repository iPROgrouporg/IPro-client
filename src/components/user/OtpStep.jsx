import { useState, useRef, useEffect } from "react";
import { authApi } from "../../connection/BaseUrl";

const OtpStep = ({ phone, onVerify, onBack }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef([]);
  const timerRef = useRef(null);

  const [otpTimer, setOtpTimer] = useState(120);

  const startTimer = () => {
    setOtpTimer(120);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "");
    const digits = text.split("").slice(0, 6);

    const newOtp = [...otp];
    digits.forEach((d, i) => (newOtp[i] = d));
    setOtp(newOtp);
  };

  const handleVerify = async () => {
    const code = otp.join("");

    if (code.length !== 6) {
      alert("6 xonali kod kiriting");
      return;
    }

    setLoading(true);
    try {
      await onVerify(code);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setLoading(true);

      await authApi.resendOtp(phone); // 🔥 FIXED

      setOtp(["", "", "", "", "", ""]);
      startTimer();
    } catch (err) {
      alert("Kod yuborilmadi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#0b1020] border border-white/10 rounded-2xl p-6 text-center">

        <h2 className="text-xl font-bold text-white">OTP Verification</h2>

        <p className="text-sm text-white/50 mt-2">
          Code sent to {phone}
        </p>

        <div className="flex justify-between gap-2 mt-6">
          {otp.map((val, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              value={val}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handlePaste}
              maxLength={1}
              className="w-12 h-12 text-center text-xl bg-white/5 border border-white/10 rounded-lg text-white outline-none"
            />
          ))}
        </div>

        <p className="text-xs text-blue-400 mt-4">
          {otpTimer > 0
            ? `Qolgan vaqt: ${Math.floor(otpTimer / 60)}:${String(
                otpTimer % 60
              ).padStart(2, "0")}`
            : "Kod muddati tugagan"}
        </p>

        {otpTimer === 0 && (
          <button
            onClick={handleResend}
            disabled={loading}
            className="text-blue-400 text-xs mt-2 underline"
          >
            {loading ? "Yuborilmoqda..." : "Yangi kod olish"}
          </button>
        )}

        <button
          onClick={handleVerify}
          disabled={loading}
          className="mt-6 w-full py-3 rounded-xl bg-blue-600 text-white"
        >
          {loading ? "Tekshirilmoqda..." : "Verify OTP"}
        </button>

        <button
          onClick={onBack}
          className="mt-3 text-sm text-white/50"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default OtpStep;