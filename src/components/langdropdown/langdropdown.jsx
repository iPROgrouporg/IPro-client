import React from "react";
import { useTranslation } from "react-i18next";
import { MdArrowDropUp } from "react-icons/md";

const flags = {
  uz: "🇺🇿",
  ru: "🇷🇺",
  en: "🇬🇧",
};

const LangDropdown = ({ openDropdown, setOpenDropdown, currentLang }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setOpenDropdown(null);
  };

  return (
    <div className="relative dropdown flex items-center">
  <button
    onClick={() => setOpenDropdown(openDropdown === "lang" ? null : "lang")}
    className="text-2xl"
  >
    {flags[currentLang] || "🌐"}
  </button>

  {openDropdown === "lang" && (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-20 z-50">
      <div className="py-2 px-2 bg-[#16182B] rounded-xl flex flex-col gap-2 items-center">
        {Object.entries(flags).map(([key, flag]) => (
          <button
            key={key}
            onClick={() => changeLanguage(key)}
            className="text-2xl hover:scale-110 transition-transform mb-1 last:mb-0"
          >
            {flag}
          </button>
        ))}
      </div>
    </div>
  )}
</div>
  );
};

export default LangDropdown;