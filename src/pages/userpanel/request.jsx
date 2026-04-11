import axios from "axios";
import { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import RequestModal from "../../components/user/RequestModal";
// import RequestModal from "./RequestModal";


export const orderss = [
  {
    id: 1,
    companyName: "iPro Group",
    serviceType: "SMM Marketing",
    orderAmount: 500,
    status: "APPROVED",
    adminPrice: 450,
    adminDeadline: "7 days",
    adminDescription: "Project accepted successfully",
    cashback: {
      cashbackAmount: 50,
      cashbackPercent: 10,
    },
  },

  {
    id: 2,
    companyName: "TechNova",
    serviceType: "Web Development",
    orderAmount: 1200,
    status: "REJECTED",
    adminPrice: 0,
    adminDeadline: "N/A",
    adminDescription: "Project rejected due to unclear requirements",
    cashback: {
      cashbackAmount: 0,
      cashbackPercent: 0,
    },
  },

  {
    id: 3,
    companyName: "Marketify",
    serviceType: "SEO Optimization",
    orderAmount: 300,
    status: "REJECTED",
    adminPrice: 0,
    adminDeadline: "N/A",
    adminDescription: "Budget too low for requested service",
    cashback: {
      cashbackAmount: 0,
      cashbackPercent: 0,
    },
  },
];
const Request = () => {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);

  const token = sessionStorage.getItem("token");

  // 🔥 GET USER ORDERS
  useEffect(() => {
    axios
      .get("https://ipro.javohir-dev.uz/api/order/my", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  // cashback total
  const totalCashback = orders.reduce(
    (acc, o) => acc + (o.cashback?.cashbackAmount || 0),
    0
  );

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold">My Requests</h2>
        <span className="text-sm text-green-400">
          {/* Total cashback: ${totalCashback} */}
        </span>
      </div>

      {/* TABLE */}
      <div className="bg-[#0d1128] border border-white/10 rounded-xl overflow-hidden">
        <div className="max-h-[500px] overflow-y-auto">

          <table className="w-full text-sm">
            <thead className="bg-white/5 sticky top-0">
              <tr className="text-white/70">
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Service</th>
                <th className="p-4 text-left">Companiy Name</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Cashback</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {orderss.map((o) => (
                <tr
                  key={o.id}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="p-4">{o.id}</td>

                  {/* SERVICE TYPE */}
                  <td className="p-4 font-medium">
                    {o.serviceType || "Service"}
                  </td>

                  {/* AMOUNT */}
                                    <td className="p-4">{o.companyName}</td>

                  <td className="p-4">${o.orderAmount}</td>

                  {/* STATUS */}
                  <td
                    className={`p-4 font-semibold
                    ${
                      o.status === "APPROVED"
                        ? "text-green-400"
                        : o.status === "REJECTED"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {o.status}
                  </td>

                  {/* CASHBACK */}
                  <td className="p-4 text-green-400">
                    {o.cashback?.cashbackAmount || 0}$
                  </td>

                  {/* ACTION */}
                  <td className="p-4 text-center">
                    <button
                      onClick={() => setSelected(o)}
                      className="p-2  rounded-lg hover:bg-blue-500/20 text-blue-400"
                    >
                      <IoEye className="w-5 h-5"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <RequestModal order={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

export default Request;