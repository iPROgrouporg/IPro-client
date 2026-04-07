import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/icons/Logo.svg";
import { IoClose, IoPersonOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { CgMenuRightAlt } from "react-icons/cg";
import LangDropdown from "../langdropdown/langdropdown";
import { useTranslation } from "react-i18next";
import "../../i18";
import AOS from 'aos';
import 'aos/dist/aos.css';
import TestModeBanner from "../ui/testmodebanner";
import axios from 'axios';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  // Close dropdown outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown")) setOpenDropdown(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [menuOpen]);

  // AOS init
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Fetch user
  useEffect(() => {
    if (!token) return;

    axios
      .get("https://ipro.javohir-dev.uz/api/auth/getMe", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) =>
        console.error("User fetch error:", err.response?.status || err.message)
      );
  }, [token]);

  const handleSignOut = async () => {
    try {
      if (!token) return;

      await axios.post(
        "https://ipro.javohir-dev.uz/api/auth/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (err) {
      console.error("Logout error:", err.response?.status || err.message);
    }
  };

  const truncateName = (name, max = 7) =>
    name?.length > max ? name.slice(0, max) + "..." : name || "Loading...";

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
        <nav
          data-aos="flip-up"
          className="flex container mx-auto px-10 py-5 justify-between items-center"
        >
          {/* Logo */}
          <NavLink to="/">
            <img src={Logo} alt="Logo" className="w-32" />
          </NavLink>

          {/* Desktop */}
          <ul className="hidden lg:flex gap-10">
            {navItems.map((item, i) => (
              <NavLink
                key={i}
                to={item.path}
                className="relative text-white hover:text-blue-500 text-lg font-semibold group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 group-hover:w-full transition-all"></span>
              </NavLink>
            ))}
          </ul>

          {/* Right */}
          <div className="flex items-center gap-5 ">
            <div className="flex items-center  gap-3 md:gap-7">

              <LangDropdown openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />

              {/* User */}
              <div className="relative dropdown ">
                <button onClick={() => setOpenDropdown(openDropdown === "user" ? null : "user")}>
                  <IoPersonOutline className="hidden md:block text-2xl" />
                </button>

                {openDropdown === "user" && (
                  <div className="absolute top-12 left-1/5 transform -translate-x-1/2 w-[190px] rounded-xl p-4">
                    {token ? (
                      <>
                        <h2 className="font-bold mb-2">
                          Hi, {truncateName(user?.fullName)}
                        </h2>
                        <hr className="border-gray-600 my-2" />

                        <button onClick={() => navigate("/user")} className="block w-full text-left py-1">
                          My Profile
                        </button>

                        <hr className="border-gray-600 my-2" />

                        <button onClick={handleSignOut} className="text-red-500 font-semibold">
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <NavLink
  to="/login"
  className="block w-full mb-3 text-center bg-gradient-to-r from-blue-600 to-blue-600 text-white py-2 px-4 text-sm rounded-xl font-medium shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 whitespace-nowrap"
>
  {t("in")}
</NavLink>

<NavLink
  to="/register"
  className="block w-full text-center py-2 px-4 text-sm rounded-xl font-medium border border-blue-600 text-blue-600 bg-white hover:bg-blue-600 hover:text-white hover:shadow-md transition-all duration-300 whitespace-nowrap"
>
  {t("up")}
</NavLink>
                      </>
                    )}
                  </div>
                )}
                </div>


              {/* Mobile btn */}
              <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-3xl">
                {menuOpen ? <IoClose /> : <CgMenuRightAlt />}
              </button>

            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`fixed top-0 left-0 w-full h-screen bg-[#0d1128] z-50 transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
          
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
              <>
                <NavLink to="/user">My Profile</NavLink>
                <button onClick={handleSignOut} className="text-red-500">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="bg-white text-blue-600 text-center py-2">
                  {t("in")}
                </NavLink>
                <NavLink to="/register" className="border border-blue-600 text-center py-2">
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