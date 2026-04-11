import { useState, useRef } from "react";

const OtpStep = ({ phone, onVerify, onBack }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    if (value === "") {
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }

    newOtp[index] = value[value.length - 1];
    setOtp(newOtp);

    // next input
    if (index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // =========================
  // BACKSPACE NAVIGATION
  // =========================
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  // =========================
  // PASTE SUPPORT (PRO FEATURE)
  // =========================
  const handlePaste = (e) => {
    e.preventDefault();

    const text = e.clipboardData.getData("text").replace(/\D/g, "");
    const digits = text.slice(0, 6).split("");

    const newOtp = [...otp];

    digits.forEach((d, i) => {
      newOtp[i] = d;
    });

    setOtp(newOtp);

    const nextIndex = digits.length < 6 ? digits.length : 5;
    inputsRef.current[nextIndex]?.focus();
  };

  // =========================
  // VERIFY
  // =========================
  const handleSubmit = () => {
    const code = otp.join("");

    if (code.length !== 6) {
      alert("6 xonali kod kiriting");
      return;
    }

    onVerify(code);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* MODAL */}
      <div className="
        relative w-full max-w-md
        bg-[#0b1020]
        border border-white/10
        rounded-2xl p-6 text-center
        shadow-2xl
      ">

        {/* TITLE */}
        <h2 className="text-xl font-bold text-white">
          OTP Verification
        </h2>

        <p className="text-sm text-white/50 mt-2">
          Code sent to {phone}
        </p>

        {/* OTP INPUTS */}
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
              className="
                w-12 h-12 text-center text-xl
                bg-white/5 border border-white/10
                rounded-lg text-white outline-none
                focus:border-blue-500 focus:scale-105 transition
              "
            />
          ))}
        </div>

        {/* VERIFY BUTTON */}
        <button
          onClick={handleSubmit}
          className="
            mt-6 w-full py-3 rounded-xl
            bg-blue-600 hover:bg-blue-500
            text-white font-semibold transition
          "
        >
          Verify OTP
        </button>

        {/* BACK BUTTON */}
        <button
          onClick={onBack}
          className="mt-3 text-sm text-white/50 hover:text-white"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default OtpStep;