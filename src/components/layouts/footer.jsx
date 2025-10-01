import React from "react";
import {FaTelegramPlane, FaInstagram, FaFacebookF, FaYoutube} from "react-icons/fa";
import Logo from "../../assets/icons/Logo.svg";
import {useTranslation} from "react-i18next";
import "../../i18";
import {Link, NavLink} from "react-router-dom";

const Footer = () => {
    const {t} = useTranslation();

    return (
        <footer className="bg-gradient-to-t mb-5 from-[#0A0F1F] via-[#0E1628] to-[#111B30] text-white pt-16 pb-10 px-4">
            <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

                <div className="space-y-4 text-center sm:text-left">
                    <img src={Logo} alt="iPro Logo" className="w-44 mx-auto sm:mx-0"/>
                    <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto sm:mx-0">
                        {t("footer_description") || "Professional IT solutions for your business needs. Innovate with iPro."}
                    </p>
                    <p className="text-xs text-gray-500">© 2020-2025 «iPro». All rights reserved.</p>
                </div>

                <div className="text-center sm:text-left">
                    <h3 className="text-xl font-bold mb-4 text-blue-100 inline-block pb-1">
                        {t("links")}
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-4 sm:mt-6">
                        {[
                            {name: t("about"), path: "/aboutus"},
                            {name: t("team"), path: "/team"},
                            {name: t("portfolio"), path: "/portfolio"},
                            {name: t("services"), path: "/services"},
                            {name: t("careers"), path: "/careers"},
                        ].map((item, i) => (
                            <li key={i}>
                                <NavLink
                                    to={item.path}
                                    className="text-gray-300 hover:text-cyan-400 text-sm md:text-base font-medium transition duration-200 relative pl-2 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-cyan-400 before:rounded-full"
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="text-center ml-16 sm:text-left ">
                    <h3 className="text-xl font-bold mb-4 text-blue-100  inline-block pb-1">
                        {t("contact")}
                    </h3>
                    <ul className="text-gray-300 space-y-2 text-sm mt-4">
                        <li>{t("google_map")}</li>
                        <li>{t("yandex_map")}</li>
                        <li>+998 90 000 00 00</li>
                    </ul>
                </div>

                <div className="text-center ml-16 sm:text-left ">
                    <h3 className="text-xl font-bold mb-4 text-blue-100 inline-block pb-1">
                        {t("follow_us")}
                    </h3>
                    <div className="flex justify-center sm:justify-start gap-4 mt-4 flex-wrap">
                        <Link to="http://t.me/iPRO_group" className="hover:scale-110 transition">
                            <FaTelegramPlane className="text-2xl text-blue-100 hover:text-blue-500"/>
                        </Link>
                        <Link to="https://www.instagram.com/iprogroupuz/#" className="hover:scale-110 transition">
                            <FaInstagram className="text-2xl text-pink-100 hover:text-pink-500"/>
                        </Link>
                        <Link to="https://www.facebook.com/share/16EFV1KTV8/" className="hover:scale-110 transition">
                            <FaFacebookF className="text-2xl text-blue-100 hover:text-blue-600"/>
                        </Link>
                        <Link to="https://www.youtube.com/@iprouz" className="hover:scale-110 transition">
                            <FaYoutube className="text-2xl text-red-100 hover:text-red-600"/>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>

    );
};

export default Footer;
