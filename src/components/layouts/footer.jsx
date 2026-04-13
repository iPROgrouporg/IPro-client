import React from "react";
import {
  FaTelegramPlane,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";
import Logo from "../../assets/icons/Logo.svg";
import { useTranslation } from "react-i18next";
import "../../i18";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-t mb-5 from-[#0A0F1F] via-[#0E1628] to-[#111B30] text-white pt-12 sm:pt-16 pb-10 px-4">
      
      <div className="w-full max-w-[1400px] mx-auto 
      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
      gap-10 sm:gap-12">

        {/* LOGO */}
        <div className="space-y-4 text-center sm:text-left">
          <img
            src={Logo}
            alt="iPro Logo"
            className="w-36 sm:w-44 mx-auto sm:mx-0"
          />

          <p className="text-sm text-gray-400 leading-relaxed 
          max-w-xs mx-auto sm:mx-0">
              Professional IT solutions for your business needs. Innovate with iPro.
          </p>

          <p className="text-xs text-gray-500">
            © 2020-2025 «iPro». All rights reserved.
          </p>
        </div>

        {/* LINKS */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-blue-100">
            {t("links")}
          </h3>

          <ul className="grid grid-cols-2 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 mt-3 sm:mt-6">
            {[
              { name: t("about"), path: "/aboutus" },
              { name: t("team"), path: "/team" },
              { name: t("portfolio"), path: "/portfolio" },
              { name: t("services"), path: "/services" },
              { name: t("careers"), path: "/vacancy" },
            ].map((item, i) => (
              <li key={i}>
                <NavLink
                  to={item.path}
                  className="text-gray-300 hover:text-cyan-400 
                  text-sm md:text-base font-medium transition duration-200 
                  relative pl-3 before:absolute before:left-0 
                  before:top-1/2 before:-translate-y-1/2 
                  before:w-1 before:h-1 before:bg-cyan-400 
                  before:rounded-full"
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-blue-100">
            {t("contact")}
          </h3>

          <ul className="text-gray-300 space-y-2 text-sm mt-3 sm:mt-6">
            <li >
  <a
    href="https://www.google.com/maps?q=41.289208,69.225914"
    target="_blank"
    className="text-sm"
    rel="noopener noreferrer"
  >
    {t("google_map")}
  </a>
</li>

<li>
  <a
    href="https://yandex.uz/maps/?ll=69.225914%2C41.289208&z=17"
    target="_blank"
    className="text-sm"
    rel="noopener noreferrer"
  >
    {t("yandex_map")}
  </a>
</li>
            <li className="font-medium text-white/90">
              +998 93 553 33 52
            </li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-blue-100">
            {t("follow_us")}
          </h3>

          <div className="flex justify-center sm:justify-start 
          gap-4 mt-3 sm:mt-6 flex-wrap">

            <Link
              to="http://t.me/iPRO_group"
              className="p-2 rounded-full bg-white/5 hover:bg-blue-500/20 transition"
            >
              <FaTelegramPlane className="text-xl sm:text-2xl text-blue-100 hover:text-blue-500" />
            </Link>

            <Link
              to="https://www.instagram.com/iprogroupuz/#"
              className="p-2 rounded-full bg-white/5 hover:bg-pink-500/20 transition"
            >
              <FaInstagram className="text-xl sm:text-2xl text-pink-100 hover:text-pink-500" />
            </Link>

            <Link
              to="https://www.facebook.com/share/16EFV1KTV8/"
              className="p-2 rounded-full bg-white/5 hover:bg-blue-500/20 transition"
            >
              <FaFacebookF className="text-xl sm:text-2xl text-blue-100 hover:text-blue-600" />
            </Link>

            <Link
              to="https://www.youtube.com/@iprouz"
              className="p-2 rounded-full bg-white/5 hover:bg-red-500/20 transition"
            >
              <FaYoutube className="text-xl sm:text-2xl text-red-100 hover:text-red-600" />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;