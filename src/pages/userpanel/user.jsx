import { useEffect, useState } from "react";
import { FaUserCircle, FaShoppingCart, FaClipboardList, FaCamera } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { NavLink } from "react-router-dom";
import logo from "../../assets/icons/Logo.svg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbMoneybag } from "react-icons/tb";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoClose, IoEye, IoEyeOff } from "react-icons/io5";
import Request from "./request";
import Orders from "./orders";
import Layout from "./layout";
import Logouser from "../../assets/icons/userpanellog.svg";
import { HiMenuAlt3 } from "react-icons/hi";
import axios from "axios";

const AdminDashboard = () => {
  const [user,setUser]=useState([])
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [hover, setHover] = useState(false);
  const [activePage, setActivePage] = useState("orders");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
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

  return (
    <div className="flex h-screen text-white">
      {/* Sidebar */}
      <div
        className={`fixed z-50 md:static top-0 left-0 h-full bg-[#292d32] w-72 p-6 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <NavLink to={"/"}>
          <img src={logo} alt="Logo" className="text-xl font-bold mb-14 mt-10 ml-4" />
        </NavLink>
        <p className="text-2xl font-semibold mb-4 ml-4"></p>
        <ul className="ml-4 space-y-2">
          <button
            className={`flex items-center gap-2 p-2 rounded-lg w-full ${
              activePage === "orders" ? "text-blue-500" : "hover:bg-gray-700"
            }`}
            onClick={() => {
              setActivePage("orders");
              setSidebarOpen(false);
            }}
          >
            <FaShoppingCart /> Orders
          </button>

          <button
            className={`flex items-center gap-2 p-2 rounded-lg w-full ${
              activePage === "requests" ? "text-blue-500" : "hover:bg-gray-700"
            }`}
            onClick={() => {
              setActivePage("requests");
              setSidebarOpen(false);
            }}
          >
            <FaClipboardList /> My requests
          </button>

          <button
            className={`flex items-center gap-2 p-2 rounded-lg w-full ${
              activePage === "layout" ? "text-blue-500" : "hover:bg-gray-700"
            }`}
            onClick={() => {
              setActivePage("layout");
              setSidebarOpen(false);
            }}
          >
            <LuLayoutDashboard /> Layout
          </button>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#323232] overflow-y-auto">
        {/* Top Navbar */}
        <div className="flex justify-between items-center p-4 bg-[#292d32] sticky top-0 z-30 shadow-md">
  {/* Menu Icon on Mobile */}
  <button
    className="text-white text-2xl md:hidden"
    onClick={() => setSidebarOpen(!sidebarOpen)}
  >
    <HiMenuAlt3 />
  </button>

  {/* O'ngga tekislash uchun butun navbar tarkibini reverse qildim */}
  <div className="flex items-center gap-4 ml-auto">
    {/* Profile */}
    <div className="relative flex items-center gap-2">
      <button
        className="flex items-center space-x-2"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {/* John Doe matni o‘ngga tekislangan */}
        <span className="block text-right">{user?.fullName}</span>
        <IoMdArrowDropdown />
      </button>

      <div
        className="relative w-10 h-10 rounded-full overflow-hidden cursor-pointer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {profilePic ? (
          <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <FaUserCircle className="w-full h-full text-gray-400" />
        )}
        {hover && (
          <label className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer">
            <FaCamera className="text-white text-lg" />
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
          </label>
        )}
      </div>

      {/* Dropdown */}
      {dropdownOpen && (
        <div className="absolute top-12 right-0 bg-[#292d32] w-40 rounded-md shadow-md z-50">
          <button
            onClick={() => {
              setDropdownOpen(false);
              setModalOpen(true);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-700"
          >
            Edit profile
          </button>
          <hr className="border-white" />
          <NavLink to={"/"}>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-700">
              Sign out
            </button>
          </NavLink>
        </div>
      )}
    </div>

    <IoMdNotificationsOutline className="w-10 h-10 border border-white rounded-full p-2 cursor-pointer" />
    <TbMoneybag className="w-10 h-10 border border-white rounded-full p-2 cursor-pointer" />
  </div>
</div>


        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#292d32] p-6 rounded-lg w-full max-w-3xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl">Profile</h2>
                <button onClick={() => setModalOpen(false)} className="text-2xl">
                  <IoClose />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label>
                  <p>Full name</p>
                  <input
                    type="text"
                    className="w-full p-3 bg-gray-700 rounded-md mt-1"
                    placeholder="Full Name"
                  />
                </label>
                <label>
                  <p>Username</p>
                  <input
                    type="number"
                    className="w-full p-3 bg-gray-700 rounded-md mt-1"
                    placeholder="Username"
                  />
                </label>
                <label className="relative">
                  <p>Password</p>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full p-3 pr-10 bg-gray-700 rounded-md mt-1"
                    placeholder="New Password"
                  />
                  <button
                    className="absolute top-10 right-3"
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                  >
                    {showPassword ? <IoEyeOff /> : <IoEye />}
                  </button>
                </label>
                <label className="relative">
                  <p>Repeat password</p>
                  <input
                    type={showRepeatPassword ? "text" : "password"}
                    className="w-full p-3 pr-10 bg-gray-700 rounded-md mt-1"
                    placeholder="Confirm Password"
                  />
                  <button
                    className="absolute top-10 right-3"
                    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                    type="button"
                  >
                    {showRepeatPassword ? <IoEyeOff /> : <IoEye />}
                  </button>
                </label>
              </div>
              <button className="w-full mt-6 py-3 bg-blue-500 rounded-md">Edit Profile</button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="p-4">
          {activePage === "orders" && <Orders />}
          {activePage === "requests" && <Request />}
          {activePage === "layout" && <Layout />}
        </div>

        <div className="absolute top-[300px] right-0 z-[1] hidden lg:block">
          <img src={Logouser} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
