import { IoClose } from "react-icons/io5";
import { useState } from "react";
import OtpStep from "./OtpStep";

const ProfileModal = ({ modalOpen, setModalOpen }) => {
  const [step, setStep] = useState("edit"); // edit | otp
  const [phone, setPhone] = useState("+998");

  if (!modalOpen) return null;

  // =========================
  // PHONE FORMAT (+998 + 9 digits)
  // =========================
  const handleChange = (e) => {
    let value = e.target.value;

    if (!value.startsWith("+998")) {
      value = "+998";
    }

    let digits = value.replace(/\D/g, "").slice(3);
    digits = digits.slice(0, 9);

    setPhone("+998" + digits);
  };

  // =========================
  // SEND OTP (FAKE)
  // =========================
  const handleSendOtp = () => {
    console.log("OTP SEND TO:", phone);
    setStep("otp");
  };

  // =========================
  // VERIFY OTP
  // =========================
  const handleVerify = (code) => {
    console.log("OTP:", code);

    alert("Profile updated successfully!");
    setModalOpen(false);
    setStep("edit");
  };

  return (
    <>
      {step === "otp" ? (
        <OtpStep
          phone={phone}
          onVerify={handleVerify}
          onBack={() => setStep("edit")}
        />
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />

          {/* MODAL */}
          <div className="
            relative w-full max-w-3xl mx-4
            rounded-3xl
            bg-[#0b1020]/90
            border border-white/10
            shadow-[0_0_60px_rgba(59,130,246,0.15)]
            backdrop-blur-2xl
            overflow-hidden
          ">

            {/* ================= HEADER ================= */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Edit Profile
                </h2>
                <p className="text-xs text-white/50 mt-1">
                  Update your account information securely
                </p>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 transition"
              >
                <IoClose className="text-2xl text-white" />
              </button>
            </div>

            {/* ================= BODY ================= */}
            <div className="p-6 grid md:grid-cols-2 gap-5">

              {/* FIRST NAME */}
              <div>
                <label className="text-xs text-white/60">First name</label>
                <input
                  placeholder="Enter your first name"
                  className="w-full mt-2 px-4 py-3 rounded-xl
                  bg-white/5 border border-white/10
                  text-white outline-none
                  focus:border-blue-500 transition"
                />
              </div>

              {/* LAST NAME */}
              <div>
                <label className="text-xs text-white/60">Last name</label>
                <input
                  placeholder="Enter last name"
                  className="w-full mt-2 px-4 py-3 rounded-xl
                  bg-white/5 border border-white/10
                  text-white outline-none
                  focus:border-blue-500 transition"
                />
              </div>

              {/* COMPANY */}
              <div>
                <label className="text-xs text-white/60">Company</label>
                <input
                  placeholder="Enter company name"
                  className="w-full mt-2 px-4 py-3 rounded-xl
                  bg-white/5 border border-white/10
                  text-white outline-none
                  focus:border-blue-500 transition"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="text-xs text-white/60">Phone number</label>
                <input
                  value={phone}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-3 rounded-xl
                  bg-white/5 border border-white/10
                  text-white outline-none
                  focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* ================= FOOTER ================= */}
            <div className="px-6 py-5 border-t border-white/10 flex gap-3 justify-end">

              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleSendOtp}
                className="
                  px-6 py-2.5 rounded-xl
                  bg-gradient-to-r from-blue-600 to-blue-500
                  hover:from-blue-500 hover:to-blue-400
                  text-white font-semibold
                  shadow-lg shadow-blue-500/20
                  transition
                "
              >
                Save & Send OTP
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default ProfileModal;