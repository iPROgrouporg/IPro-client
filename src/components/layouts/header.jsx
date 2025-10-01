import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/icons/Logo.svg";
import { FaBell } from "react-icons/fa";
import { IoClose, IoPersonOutline } from "react-icons/io5";
import { CgMenuRightAlt } from "react-icons/cg";
import { MdArrowDropUp } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import LangDropdown from "../langdropdown/langdropdown";
import { useTranslation } from "react-i18next";
import "../../i18";
import AOS from 'aos';
import 'aos/dist/aos.css';
import TestModeBanner from "../ui/testmodebanner";
import axios from 'axios';

AOS.init();

const Header = () => {
  const token = localStorage.getItem("token");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleSignOut = async () => {
    try {
      if (!token) return;
      const response = await axios.post(
        "https://ipro.javohir-dev.uz/api/auth/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logoutda xatolik:", error.response?.status || error.message);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("https://ipro.javohir-dev.uz/api/auth/getMe", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Foydalanuvchini olishda xatolik:", error);
      }
    };
    fetchUser();
  }, []);

  const truncateName = (name, maxLength = 7) => {
    if (!name) return "Loading...";
    return name.length > maxLength ? name.slice(0, maxLength) + "..." : name;
  };

  return (
    <>
      <TestModeBanner />

      <header
        className={`w-full py-4 fixed top-0 h-20 z-40 text-white flex transition-all duration-300 backdrop-blur-md bg-[#0A0F1F]/70`}
      >
        <nav
          data-aos="flip-up"
          data-aos-duration="1200"
          className="flex container mx-auto md:max-w-none xl:max-w-none px-10 py-5 justify-between items-center"
        >

          {/* Logo */}
          <NavLink to="/">
            <img src={Logo} alt="Logo" className="w-32" />
          </NavLink>

          {/* Desktop Navbar */}
          <ul className="hidden lg:flex gap-10">
            {[
              { name: "", path: "/" },
              { name: t("about"), path: "/aboutus" },
              { name: t("team"), path: "/team" },
              { name: t("portfolio"), path: "/portfolio" },
              { name: t("services"), path: "/services" },
              { name: t("careers"), path: "/careers" },
            ].map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className="relative transition duration-300 ease-in-out text-white hover:text-blue-500 text-lg font-semibold group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            ))}
          </ul>

          {/* Icons */}
          <div className="relative flex items-center gap-5">

            {/* Language Dropdown */}
            <div className="flex items-center md:gap-7 relative">
              <LangDropdown openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />

              {/* Notifications Dropdown */}
              <div className="relative dropdown">
                <button onClick={() => setOpenDropdown(openDropdown === "notif" ? null : "notif")}>
                  <FaBell fontSize={25} className="text-white ml-3 sm:ml-0" />
                </button>

                {openDropdown === "notif" && (
                  <div className="absolute top-12 -left-20 border w-[230px] text-white rounded-lg shadow-lg">
                    <MdArrowDropUp className="absolute -bottom-5 left-16 text-[#16182B] text-[48px]" />
                    <div className="py-2 px-3 bg-[#16182B] w-[174px] rounded-xl">
                      <button
                        onClick={() => setOpenDropdown(null)}
                        className="block w-full border-b-2 border-gray-600 text-start py-2 text-xs"
                      >
                        {t("your_approved")}
                        <p className="text-xs text-[#999999]">5 days ago</p>
                      </button>
                      <button
                        onClick={() => setOpenDropdown(null)}
                        className="block w-full text-start border-b-2 border-gray-600 py-2 text-xs"
                      >
                        {t("your_rejected")}
                        <p className="text-xs text-[#999999]">15 days ago</p>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Dropdown */}
              <div className="relative dropdown">
                <button onClick={() => setOpenDropdown(openDropdown === "user" ? null : "user")}>
                  <IoPersonOutline fontSize={25} color="white" className="hidden md:block" />
                </button>

                {openDropdown === "user" && (
                  <div className="absolute top-12 -right-1 w-40 text-white rounded-lg shadow-lg">
                    <div className="py-5 px-2 bg-[#16182B] w-[190px] rounded-xl">

                      {token ? (
                        <div className="relative">
                          <h2 className="font-bold text-lg mb-2">Hi, {truncateName(user?.fullName || "Loading...")}</h2>
                          <hr className="border-gray-500 my-2" />
                          <button
                            onClick={() => navigate("/user")}
                            className="block w-full text-left text-white text-lg py-1 hover:underline"
                          >
                            My Profile
                          </button>
                          <hr className="border-gray-500 my-2" />
                          <button
                            onClick={handleSignOut}
                            className="block w-full text-left text-red-500 text-lg font-semibold hover:underline"
                          >
                            Sign Out
                          </button>
                        </div>
                      ) : (
                        <>
                          <NavLink
                            to="/login"
                            onClick={() => setOpenDropdown(null)}
                            className="block w-full py-0.5 mb-3 text-center rounded-sm bg-white text-blue-600 font-bold border-b-2 px-5"
                          >
                            {t('in')}
                          </NavLink>
                          <NavLink
                            to="/register"
                            onClick={() => setOpenDropdown(null)}
                            className="block w-full border py-0.5 border-blue-600 rounded-sm text-center font-bold px-2"
                          >
                            {t('up')}
                          </NavLink>
                        </>
                      )}

                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="mt-[-5px] lg:hidden text-white text-3xl"
              >
                {menuOpen ? <IoClose /> : <CgMenuRightAlt />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-[#0d1128] text-white z-50 transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-600">
            <div className="flex items-center gap-4">
              {token && (
                <h2 className="text-lg font-bold">
                  Hi, {truncateName(user?.fullName || "")}
                </h2>
              )}
            </div>
            <button onClick={() => setMenuOpen(false)} className="text-3xl">
              <IoMdClose />
            </button>
          </div>

          <ul className="flex flex-col gap-6 text-xl font-semibold px-6 pt-4 overflow-y-auto h-[calc(100%-110px)]">
            {[
              { name: "", path: "/" },
              { name: t("about"), path: "/aboutus" },
              { name: t("team"), path: "/team" },
              { name: t("portfolio"), path: "/portfolio" },
              { name: t("services"), path: "/services" },
              { name: t("careers"), path: "/careers" },
            ].map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-blue-400 transition"
              >
                {item.name}
              </NavLink>
            ))}

            {token ? (
              <>
                <NavLink
                  to="/user"
                  onClick={() => setMenuOpen(false)}
                  className="text-white hover:text-blue-400 transition"
                >
                  My Profile
                </NavLink>
                <button
                  onClick={() => {
                    handleSignOut();
                    setMenuOpen(false);
                  }}
                  className="text-red-500 font-semibold hover:underline"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full mb-3 text-center bg-white text-blue-600 font-bold border-b-2 px-5 py-2 rounded-md hover:bg-blue-100 transition"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="w-full border border-blue-600 text-center font-bold px-5 py-2 rounded-md text-white hover:bg-blue-600 transition"
                >
                  Sign Up
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
