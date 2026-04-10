import React from "react";
import { useTranslation } from "react-i18next";
import uzFlag from "../../assets/images/flags/uz.png";
import ruFlag from "../../assets/images/flags/ru.png";
import enFlag from "../../assets/images/flags/en.png";
const flags = {
  uz: uzFlag,
  ru: ruFlag,
  en: enFlag,
};

const LangDropdown = ({ openDropdown, setOpenDropdown }) => {
  const { i18n } = useTranslation();

  const currentLang = i18n.language || "uz";

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setOpenDropdown(null);
  };

  return (
    <div className="relative dropdown flex items-center">

      {/* BUTTON */}
      <button
        onClick={() =>
          setOpenDropdown(openDropdown === "lang" ? null : "lang")
        }
        className="flex items-center justify-center"
      >
        <img
          src={flags[currentLang]}
          alt="lang"
          className="w-7 h-4 object-cover"
        />
      </button>

      {/* DROPDOWN */}
      {openDropdown === "lang" && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-24 z-50">
          <div className="py-2 px-2 bg-[#16182B] rounded-none flex flex-col gap-2 items-center">

            {Object.entries(flags).map(([key, flag]) => (
              <button
                key={key}
                onClick={() => changeLanguage(key)}
                className="hover:scale-110 transition"
              >
                <img
                  src={flag}
                  alt={key}
                  className={`w-7 h-4 object-cover ${
                    currentLang === key ? "ring-2 ring-blue-500" : ""
                  }`}
                />
              </button>
            ))}

          </div>
        </div>
      )}
    </div>
  );
};

export default LangDropdown;