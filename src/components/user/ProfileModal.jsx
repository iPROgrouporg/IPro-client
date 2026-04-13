import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import OtpStep from "./OtpStep";
import { userApi } from "../../connection/BaseUrl";
import { useTranslation } from "react-i18next";

const ProfileModal = ({ modalOpen, setModalOpen }) => {
  const [step, setStep] = useState("edit");
  const [initialData, setInitialData] = useState(null);
  const {t} = useTranslation();
  const [form, setForm] = useState(null);
const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!modalOpen) return;

    const fetchUser = async () => {
      const res = await userApi.getMe();
      const data = res.data;

      const splitName = data.fullName?.split(" ") || [];

      const formatted = {
        firstName: splitName[0] || "",
        lastName: splitName[1] || "",
        company: data.companyName || "",
        phone: data.phoneNumber,
      };

      setInitialData(formatted);
      setForm(formatted);
    };

    fetchUser();
  }, [modalOpen]);

  if (!modalOpen || !form) return null;

  const handleInput = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const normalizePhone = (p) => p.replace(/\D/g, "");

  const getChangedFields = () => {
    const changed = {};

    if (
      form.firstName !== initialData.firstName ||
      form.lastName !== initialData.lastName
    ) {
      changed.fullName = `${form.firstName} ${form.lastName}`;
    }

    if (form.company !== initialData.company) {
      changed.companyName = form.company;
    }

    if (
      normalizePhone(form.phone) !== normalizePhone(initialData.phone)
    ) {
      changed.phoneNumber = normalizePhone(form.phone);
    }

    return changed;
  };

  const handleSave = async () => {
    const changedData = getChangedFields();

    if (Object.keys(changedData).length === 0) {
      alert("Hech narsa o‘zgarmagan");
      return;
    }

    try {
      setLoading(true);
      await userApi.update(changedData);

      // 🔥 faqat phone change bo‘lsa OTP
      if (changedData.phoneNumber) {
        setStep("otp");
        return;
      }

      alert("Profile updated");
      setModalOpen(false);
    } catch (err) {
      console.log(err);
    }finally{
      setLoading(false)
    }
  };

  const handleVerify = async (code) => {
    try {
      await userApi.verifyUpdateOtp({ otp: code });

      alert("Profile updated successfully!");
      setModalOpen(false);
      setStep("edit");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {step === "otp" ? (
        <OtpStep
          phone={form.phone}
          onVerify={handleVerify}
          onBack={() => setStep("edit")}
        />
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setModalOpen(false)}
          />

          <div className="
            relative w-full max-w-3xl mx-4
            rounded-3xl
            bg-[#0b1020]/90
            border border-white/10
            shadow-[0_0_60px_rgba(59,130,246,0.15)]
            backdrop-blur-2xl
            overflow-hidden
          ">

            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">
                {t('editTitle')}

              </h2>

              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10"
              >
                <IoClose className="text-2xl text-white" />
              </button>
            </div>

            {/* BODY */}
            <div className="p-6 grid md:grid-cols-2 gap-5">

              {/* FIRST NAME */}
              <input
                value={form.firstName}
                onChange={(e) => handleInput("firstName", e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-xl
                bg-white/5 border border-white/10
                text-white outline-none
                focus:border-blue-500 transition"
placeholder={t("firstName")}              />

              {/* LAST NAME */}
              <input
                value={form.lastName}
                onChange={(e) => handleInput("lastName", e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-xl
                bg-white/5 border border-white/10
                text-white outline-none
                focus:border-blue-500 transition"
                placeholder={t("lastName")}
              />

              {/* COMPANY */}
              <input
                value={form.company}
                onChange={(e) => handleInput("company", e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-xl
                bg-white/5 border border-white/10
                text-white outline-none
                focus:border-blue-500 transition"
                placeholder={t("company")}
              />

              {/* PHONE */}
              <input
                value={form.phone}
                onChange={(e) => handleInput("phone", e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-xl
                bg-white/5 border border-white/10
                text-white outline-none
                focus:border-blue-500 transition"
                placeholder={t("phone")}
              />

            </div>

            {/* FOOTER */}
            <div className="px-6 py-5 border-t border-white/10 flex justify-end gap-3">

              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-white/10 text-white"
              >
                {t('cancel')}
              </button>

              <button
                onClick={handleSave}
                disabled={loading}
                className="px-6 py-2 rounded-xl bg-blue-600 text-white flex items-center justify-center gap-2"
              >
                {loading ? t('saving') : t('save')}
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default ProfileModal;