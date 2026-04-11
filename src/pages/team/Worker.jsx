import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Aos from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";

export const Worker = () => {
  const { t } = useTranslation();
  useEffect(() => {
    Aos.init({ once: true });
  }, []);

  // Form state
  const [fio, setFio] = useState("");
  const [phone, setPhone] = useState("");
  const [yunalish, setYunalish] = useState("");
  const [daraja, setDaraja] = useState("");
  const [url, setUrl] = useState("");
  const [narx, setNarx] = useState("");

  // Error state
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!fio) newErrors.fio = "Iltimos, FIO kiriting";
    if (!phone || phone.length !== 9) newErrors.phone = "Iltimos, 9 ta raqamli telefon kiriting";
    if (!yunalish) newErrors.yunalish = "Iltimos, yo‘nalishni kiriting";
    if (!daraja) newErrors.daraja = "Iltimos, darajani tanlang";
    if (!url) newErrors.url = "Iltimos, URL kiriting";
    if (!narx) newErrors.narx = "Iltimos, narx kiriting";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Telegram yuborish
      const telegramBotToken = "SENING_BOT_TOKEN";
      const chatId = "SENING_CHAT_ID";
      const message = `
FIO: ${fio}
Telefon: +998${phone}
Yunalish: ${yunalish}
Daraja: ${daraja}
Portfolio: ${url}
Narx : ${narx}
`;

      fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message }),
      })
        .then(() => alert("Ma’lumot yuborildi!"))
        .catch(() => alert("Xatolik yuz berdi!"));
    }
  };

  return (
    <section className="relative z-10 bg-gradient-to-br from-[#0A0F1F] via-[#0E1628] to-[#111B30] py-32 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center text-white text-[42px] md:text-[64px] font-extrabold leading-[1.2] drop-shadow-[0_5px_30px_rgba(0,112,244,0.8)] mb-12"
        >
          {t("jointeam")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-center text-gray-300 text-lg mb-10 max-w-2xl mx-auto"
        >
          {t("searchworker")}
        </motion.p>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
          {/* FIO */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">{t("fio")}</label>
            <input
              type="text"
              placeholder={t("fioples")}
              value={fio}
              onChange={(e) => setFio(e.target.value)}
              className="w-full bg-[#11152A] border border-blue-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.fio && <p className="text-red-500 text-sm mt-1">{errors.fio}</p>}
          </div>

          {/* Telefon */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">{t("tel")}</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg bg-blue-700 text-white">+998</span>
              <input
                type="text"
                placeholder="991234567"
                maxLength={9}
                value={phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 9);
                  setPhone(value);
                }}
                className="w-full bg-[#11152A] border border-blue-700 rounded-r-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Yunalish */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">{t("yunalish")}</label>
            <input
              type="text"
              placeholder="Frontend, Backend, Design..."
              value={yunalish}
              onChange={(e) => setYunalish(e.target.value)}
              className="w-full bg-[#11152A] border border-blue-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.yunalish && <p className="text-red-500 text-sm mt-1">{errors.yunalish}</p>}
          </div>

          {/* Daraja */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">{t("daraja")}</label>
            <select
              value={daraja}
              onChange={(e) => setDaraja(e.target.value)}
              className="w-full appearance-none bg-[#11152A] border border-blue-700 rounded-lg px-4 py-[14px] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled selected>
                {t("select_department")}
              </option>
              <option value="Junior">Junior (1-3) yil</option>
              <option value="Middle">Middle (3-6) yil</option>
              <option value="Senior">Senior (6+) yil</option>
            </select>
            {errors.daraja && <p className="text-red-500 text-sm mt-1">{errors.daraja}</p>}
          </div>

          {/* URL */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">{t("url")}</label>
            <input
              type="url"
              placeholder="https://portfolio.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-[#11152A] border border-blue-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url}</p>}
          </div>

          {/* Narx */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">{t("narx")}</label>
            <input
              type="text"
              placeholder="1000000"
              value={narx}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setNarx(value);
              }}
              className="w-full bg-[#11152A] border border-blue-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.narx && <p className="text-red-500 text-sm mt-1">{errors.narx}</p>}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-2 mt-6 flex justify-center"
          >
            <button
              type="submit"
              className="px-10 py-3 text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg shadow-[0_0_25px_5px_rgba(0,122,255,0.5)] hover:shadow-[0_0_35px_10px_rgba(0,122,255,0.7)] hover:scale-105 transition-all duration-300"
            >
              {t("yuborish")}
            </button>
          </motion.div>
        </form>
      </div>
    </section>
  );
};