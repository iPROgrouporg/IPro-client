import { HiMenuAlt3 } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { userApi } from "../../connection/BaseUrl";
import { useTranslation } from "react-i18next";

const Navbar = ({ sidebarOpen, setSidebarOpen, setModalOpen }) => {
  const [user, setUser] = useState(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const {t} =useTranslation()

  const notifRef = useRef(null);
  const settingsRef = useRef(null);

  // 🔥 GET USER
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await userApi.getMe();
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  // 🔥 FIRST NAME
  const firstName = user?.fullName?.split(" ")[0] || "";

  // 🔥 CLICK OUTSIDE
  useEffect(() => {
    const handleClick = (e) => {
      if (!notifRef.current?.contains(e.target)) setNotifOpen(false);
      if (!settingsRef.current?.contains(e.target)) setSettingsOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    navigate("/");

  };

  return (
    <div className="relative z-50 flex justify-between items-center px-6 py-4
      bg-[#0A0F1F]/80 backdrop-blur-xl border-b border-white/10">

      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          className="text-2xl md:hidden text-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <HiMenuAlt3 />
        </button>

        <h1 className="text-lg font-semibold text-white/90">
          {firstName}
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        {/* 🪙 COIN */}
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full
          bg-blue-500/20 border border-blue-500/30">
          <span className="text-yellow-400">🪙</span>
          <span className="text-white font-semibold">
            {user?.cashback ?? 0}$
          </span>
        </div>

        {/* 🔔 NOTIFICATION */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              setSettingsOpen(false);
            }}
            className="relative p-2 rounded-full hover:bg-white/10"
          >
            <IoMdNotificationsOutline className="text-xl text-white" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-3 w-80
              rounded-xl shadow-2xl z-[999] backdrop-blur-xl">

              <div className="bg-[#0d1128] border border-white/10 rounded-xl">

                {/* HEADER */}
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-white/80">
                    Notifications
                  </h3>
                  <span className="text-xs text-white/40">
                    latest
                  </span>
                </div>

                {/* LIST */}
                <div className="max-h-64 overflow-y-auto">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="px-4 py-3 text-sm text-white/70
                      hover:bg-white/5 cursor-pointer transition flex items-start gap-2"
                    >
                      <span className="text-blue-400">🔔</span>
                      <div>
                        <p className="font-medium">New update #{item}</p>
                        <p className="text-xs text-white/40">
                          Your request has been updated
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* FOOTER */}
                <button className="w-full py-3 text-center text-blue-400 text-sm hover:bg-white/5 rounded-b-xl">
                  View all notifications
                </button>

              </div>
            </div>
          )}
        </div>

        {/* ⚙️ SETTINGS */}
        <div className="relative" ref={settingsRef}>
          <button
            onClick={() => {
              setSettingsOpen(!settingsOpen);
              setNotifOpen(false);
            }}
            className="p-2 rounded-full hover:bg-white/10"
          >
            <FiSettings className="text-xl text-white" />
          </button>

          {settingsOpen && (
            <div className="absolute right-0 top-full mt-3 w-48
              rounded-xl shadow-2xl z-[999]">

              <div className="bg-[#0d1128] border border-white/10 rounded-xl">

                <button
                  onClick={() => {
                    setSettingsOpen(false);
                    setModalOpen(true);
                  }}
                  className="w-full px-4 py-2 text-center bg-blue-600 text-sm rounded-xl mb-2 hover:bg-blue-500"
                >
                  {t('editTitle')}
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-center rounded-xl bg-red-700 text-sm hover:bg-red-500"
                >
                  {t('logOut')}
                </button>

              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;