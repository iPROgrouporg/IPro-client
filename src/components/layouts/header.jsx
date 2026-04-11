import React, { useState, useEffect } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/icons/Logo.svg";
import { IoPersonOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { CgMenuRightAlt } from "react-icons/cg";
import LangDropdown from "../langdropdown/langdropdown";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";
import TestModeBanner from "../ui/testmodebanner";
import axios from "axios";

const Header = () => {
  const { t } = useTranslation();
  const navigate =useNavigate()

  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const [user, setUser] = useState(null);
  const [cashback, setCashback] = useState(0);

  const token = localStorage.getItem("token");

  // OUTSIDE CLOSE
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown")) setOpenDropdown(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // BODY SCROLL
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // ✅ GET USER (FIXED + SAFE)
  useEffect(() => {
    if (!token) return;

    axios
      .get("https://api.iprogroup.org/api/v1/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data;

        setUser(data);

        // cashback safe
        setCashback(data?.cashback ?? 0);
        console.log("USER DATA:", data);
        
      })
      .catch((err) => {
        console.log("USER ERROR:", err?.response?.status);
      });
  }, [token]);

  // LOGOUT
  const handleSignOut = () => {
    localStorage.clear();
    window.location.reload()
  };

  const truncateName = (name, max = 7) =>
    name?.length > max ? name.slice(0, max) + "..." : name || "";

  const navItems = [
    { name: "", path: "/" },
    { name: t("about"), path: "/aboutus" },
    { name: t("team"), path: "/team" },
    { name: t("portfolio"), path: "/portfolio" },
    { name: t("services"), path: "/services" },
    { name: t("careers"), path: "/vacancy" },
  ];

  return (
    <>
      <TestModeBanner />

      <header className="w-full py-4 fixed top-0 h-20 z-40 text-white flex backdrop-blur-md bg-[#0A0F1F]/70">
        <nav className="flex container mx-auto px-10 py-5 justify-between items-center">

          {/* LOGO */}
          <NavLink to="/">
            <img src={Logo} alt="Logo" className="w-32" />
          </NavLink>

          {/* NAV */}
          <ul className="hidden lg:flex gap-10">
            {navItems.map((item, i) => (
              <NavLink
                key={i}
                to={item.path}
                className="text-lg font-semibold hover:text-blue-500"
              >
                {item.name}
              </NavLink>
            ))}
          </ul>

          {/* RIGHT */}
          <div className="flex items-center gap-5">

            {/* 🪙 CASHBACK (UNCHANGED DESIGN) */}
            {token && (
              <div className="flex items-center gap-1 bg-blue-500/20 px-3 py-1 rounded-full">
                <span className="text-yellow-400">🪙</span>
                <span className="text-white font-semibold text-sm">
                  {cashback}
                </span>
              </div>
            )}

            {/* LANG */}
            <LangDropdown
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            />

            {/* USER DROPDOWN */}
            <div className="relative dropdown">
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === "user" ? null : "user")
                }
              >
                <IoPersonOutline className="text-2xl hidden md:block" />
              </button>

              {openDropdown === "user" && (
                <div className="absolute top-12 left-1/1 -translate-x-1/2 w-[190px] rounded-xl p-4 shadow-lg">

                  {token ? (
                    <>
                      {/* NAME ONLY */}
                      <h2 className="font-bold mb-3 text-gray-100">
                        {t('hi')}, {truncateName(user?.fullName)}
                      </h2>
                        <button
                        onClick={() => navigate('/user')}
                        className="w-full text-blue-500 border mb-2 text-sm border-blue-500 py-1.5 rounded-xl hover:bg-blue-500 hover:text-white transition"
                      >
                        MY proile
                      </button>

                      {/* SIGN OUT */}
                      <button
                        onClick={handleSignOut}
                        className="w-full text-red-500 border text-sm border-red-500 py-1.5 rounded-xl hover:bg-red-500 hover:text-white transition"
                      >
                        {t('out')}
                      </button>
                    </>
                  ) : (
                    <>
                      <NavLink
                        to="/login"
                        className="block w-full mb-2 text-sm  text-center bg-blue-600 text-white py-2 rounded-xl"
                      >
                        {t("in")}
                      </NavLink>

                      <NavLink
                        to="/register"
                        className="block w-full text-sm text-center border border-blue-600 text-white-600 py-2 rounded-xl"
                      >
                        {t("up")}
                      </NavLink>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* MOBILE MENU */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-3xl"
            >
              <CgMenuRightAlt />
            </button>

          </div>
        </nav>

        {/* MOBILE MENU */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-[#0d1128] z-50 transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between px-6 py-4 border-b border-gray-600">
            {token && <h2>Hi, {truncateName(user?.fullName)}</h2>}
            <button onClick={() => setMenuOpen(false)} className="text-3xl">
              <IoMdClose />
            </button>
          </div>

          <ul className="flex flex-col gap-6 px-6 pt-4">
            {navItems.map((item, i) => (
              <NavLink key={i} to={item.path} onClick={() => setMenuOpen(false)}>
                {item.name}
              </NavLink>
            ))}

            {token ? (
              <button onClick={handleSignOut} className="text-red-500 text-left">
                Sign Out
              </button>
            ) : (
              <>
                <NavLink to="/login" className="bg-white text-blue-600 py-2 text-center rounded">
                  {t("in")}
                </NavLink>
                <NavLink to="/register" className="border border-blue-600 py-2 text-center rounded">
                  {t("up")}
                </NavLink>
              </>
            )}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;