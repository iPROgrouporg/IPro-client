import { FaClipboardList, FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../../assets/icons/Logo.svg";
import { useTranslation } from "react-i18next";

const Sidebar = ({
  activePage,
  setActivePage,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const { t } = useTranslation();
  const menus = [
    { key: "orders", icon: <FaShoppingCart />, label: `${t('orders')}` },
    { key: "requests", icon: <FaClipboardList />, label: `${t('requests')}` },
  ];

  return (
    <>
      {/* BACKDROP (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed md:static z-50 top-0 left-0 h-full w-72 p-6 
        bg-[#0A0F1F]/80 backdrop-blur-xl border-r border-white/10
        transition-transform duration-300 flex flex-col
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* LOGO */}
        <NavLink to={"/"} className="mb-10">
          <img src={logo} className="w-32 opacity-90 hover:opacity-100 transition" />
        </NavLink>

        {/* MENU */}
        <ul className="space-y-2 flex-1">
          {menus.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActivePage(item.key);
                setSidebarOpen(false);
              }}
              className={`group flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-300
              ${
                activePage === item.key
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg"
                  : "hover:bg-white/10"
              }`}
            >
              {/* ICON */}
              <span
                className={`text-lg transition 
                ${
                  activePage === item.key
                    ? "text-white"
                    : "text-white/70 group-hover:text-white"
                }`}
              >
                {item.icon}
              </span>

              {/* TEXT */}
              <span
                className={`font-medium transition 
                ${
                  activePage === item.key
                    ? "text-white"
                    : "text-white/70 group-hover:text-white"
                }`}
              >
                {item.label}
              </span>

              {/* ACTIVE INDICATOR */}
              {activePage === item.key && (
                <span className="ml-auto w-2 h-2 bg-white rounded-full"></span>
              )}
            </button>
          ))}
        </ul>

        {/* FOOTER (optional branding) */}
        <div className="text-xs text-white/40 pt-6 border-t border-white/10">
          © 2026 iPro User
        </div>
      </div>
    </>
  );
};

export default Sidebar;