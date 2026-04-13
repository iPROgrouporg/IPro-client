import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "../../components/user/Sidebar";
import ProfileModal from "../../components/user/ProfileModal";
import Navbar from "../../components/user/Navbar";

import Orders from "./orders";
import Request from "./request";

const UserDashboard = () => {
  const [user, setUser] = useState({});
  const [activePage, setActivePage] = useState("orders");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(
        "https://api.iprogroup.org/api/v1/auth/getMe",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(res.data);
    };
    fetchUser();
  }, []);

  return (
    <div className="flex h-screen text-white">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 overflow-y-auto">
        <Navbar
          user={user}
          setModalOpen={setModalOpen}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="p-6">
          {activePage === "orders" && <Orders />}
          {activePage === "requests" && <Request />}
        </div>
      </div>

      <ProfileModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default UserDashboard;
