// LangDropdown.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { FaEarthAsia } from "react-icons/fa6";
import { MdArrowDropUp } from "react-icons/md";
import "../../i18"

const LangDropdown = ({ openDropdown, setOpenDropdown }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setOpenDropdown(null);
  };

  return (
   <div className="flex  relative dropdown">
  <button onClick={() => setOpenDropdown(openDropdown === "lang" ? null : "lang")}>
    <FaEarthAsia fontSize={25} color="white" className="mt-[-3px]"/>
  </button>

  {openDropdown === "lang" && (
    <div className="absolute top-12 -left-12 w-32 text-white rounded-lg shadow-lg z-50">
      <MdArrowDropUp className="absolute -bottom-5 left-8 text-[#16182B] text-[48px]" />
      <div className="py-2 px-3 bg-[#16182B] w-[117px] rounded-xl">
        <button onClick={() => changeLanguage("uz")} className="block w-full text-center  border-gray-600 border-b-2 px-4 py-2">Uzbek</button>
        <button onClick={() => changeLanguage("ru")} className="block w-full text-center border-gray-600 border-b-2 px-4 py-2">Русский</button>
        <button onClick={() => changeLanguage("en")} className="block w-full text-center px-4 py-2">English</button>
      </div>
    </div>
  )}
</div>

  );
};

export default LangDropdown;
