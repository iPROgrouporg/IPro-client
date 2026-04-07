import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

export const VacancyForms = ({ setShowModal }) => {
  const [workerFullName, setWorkerFullName] = useState("");
  const [workerPhone, setWorkerPhone] = useState("+998");
  const [level, setLevel] = useState("");
  const [workTime, setWorkTime] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [cv, setCv] = useState(null);

  const [errors, setErrors] = useState({});

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    // +998 bilan boshlashni majburlash
    if (!value.startsWith("+998")) {
      value = "+998";
    }
    const onlyNums = value.replace(/\D/g, "");
    setWorkerPhone("+998" + onlyNums.slice(3));
  };

  const handlePriceChange = (e) => {
    const onlyNums = e.target.value.replace(/\D/g, "");
    setPrice(onlyNums);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!workerFullName.trim()) newErrors.workerFullName = "Iltimos, ismingizni kiriting";
    if (workerPhone.length !== 13) newErrors.workerPhone = "To‘liq telefon raqam kiriting (+998901234567)";
    if (!workTime) newErrors.workTime = "Iltimos, ish vaqtini tanlang";
    if (!level) newErrors.level = "Iltimos, darajangizni tanlang";
    if (!price.trim()) newErrors.price = "Iltimos, oylik maoshni kiriting";
    if (!link.trim()) newErrors.link = "Iltimos, portfoliongiz linkini kiriting";
    if (!cv) newErrors.cv = "Iltimos, CV faylini yuklang";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // formni yuborish logikasi
      console.log({
        workerFullName,
        workerPhone,
        workTime,
        level,
        price,
        link,
        cv,
      });
      setShowModal(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl rounded-2xl bg-gradient-to-br from-[#1E2238]/90 to-[#0F172A]/90 backdrop-blur-xl border border-white/10 shadow-lg p-6 text-white">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-2xl rounded-2xl -z-10"></div>

        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-blue-500/20 text-gray-300 hover:text-white transition"
        >
          <IoMdClose size={24} />
        </button>

        <h2 className="text-3xl text-center font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-transparent bg-clip-text">
          Ariza topshirish
        </h2>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-5" onSubmit={handleSubmit}>
          {/* Full name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">To‘liq ism</label>
            <input
              type="text"
              value={workerFullName}
              onChange={(e) => setWorkerFullName(e.target.value)}
              placeholder="Ismingiz"
              className={`px-4 py-2 rounded-lg bg-white/5 border ${
                errors.workerFullName ? "border-red-500" : "border-white/10"
              } focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none transition-all`}
            />
            {errors.workerFullName && <span className="text-red-500 text-sm">{errors.workerFullName}</span>}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Telefon raqam</label>
            <input
              type="text"
              value={workerPhone}
              onChange={handlePhoneChange}
              placeholder="+998901234567"
              maxLength={13}
              className={`px-4 py-2 rounded-lg bg-white/5 border ${
                errors.workerPhone ? "border-red-500" : "border-white/10"
              } focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition-all`}
            />
            {errors.workerPhone && <span className="text-red-500 text-sm">{errors.workerPhone}</span>}
          </div>

          {/* Work time */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Ish vaqti</label>
            <select
              value={workTime}
              onChange={(e) => setWorkTime(e.target.value)}
              className={`px-4 py-2 rounded-lg bg-white/5 border ${
                errors.workTime ? "border-red-500" : "border-white/10"
              } focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none transition-all`}
            >
             <option value="" className="bg-[#1E2238]/90 text-white">Tanlang</option>
              <option value="ONLINE" className="bg-[#1E2238]/90 text-white">ONLINE</option>
              <option value="OFFLINE" className="bg-[#1E2238]/90 text-white">OFFLINE</option>
            </select>
            {errors.workTime && <span className="text-red-500 text-sm">{errors.workTime}</span>}
          </div>

          {/* Level */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Darajangiz</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className={`px-4 py-2 rounded-lg bg-white/5 border ${
                errors.level ? "border-red-500" : "border-white/10"
              } focus:border-purple-400 focus:ring-2 focus:ring-purple-400 outline-none transition-all`}
            >
              <option className="bg-[#1E2238]/90 text-white" value="">Tanlang</option>
              <option className="bg-[#1E2238]/90 text-white" value="JUNIOR">JUNIOR</option>
              <option className="bg-[#1E2238]/90 text-white" value="STRONG_JUNIOR">STRONG JUNIOR</option>
              <option className="bg-[#1E2238]/90 text-white" value="MIDDLE">MIDDLE</option>
              <option className="bg-[#1E2238]/90 text-white" value="STRONG_MIDDLE">STRONG MIDDLE</option>
              <option className="bg-[#1E2238]/90 text-white" value="SENIOR">SENIOR</option>
            </select>
            {errors.level && <span className="text-red-500 text-sm">{errors.level}</span>}
          </div>

          {/* Salary */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Oylik ($)</label>
            <input
              type="text"
              value={price}
              onChange={handlePriceChange}
              placeholder="1000"
              className={`px-4 py-2 rounded-lg bg-white/5 border ${
                errors.price ? "border-red-500" : "border-white/10"
              } focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition-all`}
            />
            {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
          </div>

          {/* Link */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Portfolio</label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://..."
              className={`px-4 py-2 rounded-lg bg-white/5 border ${
                errors.link ? "border-red-500" : "border-white/10"
              } focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none transition-all`}
            />
            {errors.link && <span className="text-red-500 text-sm">{errors.link}</span>}
          </div>

          {/* File */}
          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm text-gray-300">CV/Resume yuklash</label>
            <div className={`border border-dashed rounded-lg p-4 text-center cursor-pointer bg-white/5 hover:border-cyan-400 transition ${
              errors.cv ? "border-red-500" : "border-white/20"
            }`}>
              <input
                type="file"
                className="hidden"
                id="fileUpload"
                onChange={(e) => setCv(e.target.files[0])}
                accept=".pdf,.doc,.docx"
              />
              <label htmlFor="fileUpload" className="cursor-pointer">
                📄 Fayl tanlang yoki tashlang
              </label>
              {cv && <p className="text-sm mt-2 text-cyan-400">{cv.name}</p>}
            </div>
            {errors.cv && <span className="text-red-500 text-sm">{errors.cv}</span>}
          </div>

          <div className="sm:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,112,244,0.6)] transition-all duration-300"
            >
              Arizani yuborish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};