import { IoMdClose } from "react-icons/io";
import { FileApi, reqTeamApi } from "../../../connection/BaseUrl";
import { useState } from "react";

export const VacancyForms = ({ setShowModal, id }) => {
  const [workerFullName, setWorkerFullName] = useState("");
  const [workerPhone, setWorkerPhone] = useState("+998");
  const [level, setLevel] = useState("");
  const [workTime, setWorkTime] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [cv, setCv] = useState(null);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // PHONE (+998 + 9 ta raqam)
  const handlePhoneChange = (e) => {
    let value = e.target.value;

    if (!value.startsWith("+998")) value = "+998";

    const onlyNums = value.replace(/\D/g, "");
    const formatted = "+998" + onlyNums.slice(3, 12);

    setWorkerPhone(formatted);
  };

  // PRICE
  const handlePriceChange = (e) => {
    const onlyNums = e.target.value.replace(/\D/g, "");
    setPrice(onlyNums);
  };

  // URL CHECK
  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!workerFullName.trim()) {
      newErrors.workerFullName = "Ism kiriting";
    }

    if (workerPhone.length !== 13) {
      newErrors.workerPhone = "Telefon noto‘g‘ri (+998XXXXXXXXX)";
    }

    if (!workTime) {
      newErrors.workTime = "Ish vaqtini tanlang";
    }

    if (!level) {
      newErrors.level = "Darajani tanlang";
    }

    if (!price.trim()) {
      newErrors.price = "Oylik kiriting";
    }

    if (!link.trim()) {
      newErrors.link = "Portfolio kiriting";
    } else if (!isValidURL(link)) {
      newErrors.link = "URL noto‘g‘ri (https://...)";
    }

    if (!cv) {
      newErrors.cv = "CV yuklang";
    }

    if (!localStorage.getItem("token")) {
      newErrors.auth = "Avval login qiling";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    if (!cv) {
      setErrors({ cv: "CV majburiy" });
      return;
    }

    const uploadRes = await FileApi.upload(cv);

    console.log("UPLOAD RESPONSE:", uploadRes.data);

    const fileName = typeof uploadRes.data === "string"
      ? uploadRes.data
      : uploadRes.data?.fileName || uploadRes.data?.data;

    if (!fileName) {
      throw new Error("File upload failed");
    }

    const payload = {
      workerFullName,
      workerPhone,
      level,
      workTime,
      price,
      link,
      cv: fileName,
    };

    console.log("FINAL PAYLOAD:", payload);

    await reqTeamApi.send(id, payload);

    setShowModal(false);

  } catch (err) {
    console.log("ERROR:", err);

    setErrors({
      api: err?.response?.data?.message || err.message || "Xatolik",
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl rounded-2xl bg-gradient-to-br from-[#1E2238]/90 to-[#0F172A]/90 backdrop-blur-xl border border-white/10 shadow-lg p-6 text-white">

        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"
        >
          <IoMdClose size={24} />
        </button>

        <h2 className="text-3xl text-center font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-transparent bg-clip-text">
          Ariza topshirish
        </h2>

        {/* AUTH ERROR */}
        {errors.auth && (
          <p className="text-red-500 text-center mb-3">{errors.auth}</p>
        )}

        {errors.api && (
          <p className="text-red-500 text-center mb-3">{errors.api}</p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* FULL NAME */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">To‘liq ism</label>
            <input
              type="text"
              placeholder="To‘liq ism"
              value={workerFullName}
              onChange={(e) => setWorkerFullName(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 outline-none"
            />
            {errors.workerFullName && (
              <span className="text-red-500 text-sm">{errors.workerFullName}</span>
            )}
          </div>

          {/* PHONE */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Telefon raqam</label>
            <input
              type="text"
              value={workerPhone}
              onChange={handlePhoneChange}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-blue-400 outline-none"
            />
            {errors.workerPhone && (
              <span className="text-red-500 text-sm">{errors.workerPhone}</span>
            )}
          </div>

          {/* WORK TIME */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Ish vaqti</label>
            <select
              value={workTime}
              onChange={(e) => setWorkTime(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10"
            >
              <option value="">Tanlang</option>
              <option value="ONLINE">ONLINE</option>
              <option value="OFFLINE">OFFLINE</option>
            </select>
            {errors.workTime && (
              <span className="text-red-500 text-sm">{errors.workTime}</span>
            )}
          </div>

          {/* LEVEL */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Daraja</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10"
            >
              <option value="">Tanlang</option>
              <option value="JUNIOR">JUNIOR</option>
              <option value="MIDDLE">MIDDLE</option>
              <option value="SENIOR">SENIOR</option>
            </select>
            {errors.level && (
              <span className="text-red-500 text-sm">{errors.level}</span>
            )}
          </div>

          {/* PRICE */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Oylik</label>
            <input
              type="text"
              placeholder="100$"
              value={price}
              onChange={handlePriceChange}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10"
            />
            {errors.price && (
              <span className="text-red-500 text-sm">{errors.price}</span>
            )}
          </div>

          {/* PORTFOLIO */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Portfolio</label>
            <input
              type="text"
              placeholder="http://example.com"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10"
            />
            {errors.link && (
              <span className="text-red-500 text-sm">{errors.link}</span>
            )}
          </div>

          {/* CV (UI O‘ZGARMAGAN) */}
          <div className="sm:col-span-2 flex flex-col gap-1">
  <label className="text-sm text-gray-300">CV / Resume</label>

  <div
    className={`relative border border-dashed rounded-lg p-4 text-center cursor-pointer bg-white/5 transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] ${
      errors.cv ? "border-red-500" : "border-white/20"
    }`}
  >
    <input
      type="file"
      onChange={(e) => setCv(e.target.files[0])}
      className="hidden"
      id="cvUpload"
      accept=".pdf,.doc,.docx"
    />

    <label
      htmlFor="cvUpload"
      className="cursor-pointer flex flex-col items-center justify-center gap-2"
    >
      <div className="text-2xl">📄</div>

      <span className="text-sm text-gray-300">
        CV faylni tanlang yoki shu yerga bosing
      </span>

      <span className="text-xs text-gray-500">
        PDF, DOC, DOCX (max 10MB)
      </span>
    </label>

    {cv && (
  <p className="mt-2 text-sm text-cyan-400 font-medium">
    {cv.name}
  </p>
)}
  </div>

  {errors.cv && (
    <span className="text-red-500 text-sm">{errors.cv}</span>
  )}
</div>

          <button
            type="submit"
            disabled={loading}
            className="sm:col-span-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold"
          >
            {loading ? "Yuborilmoqda..." : "Arizani yuborish"}
          </button>

        </form>
      </div>
    </div>
  );
};