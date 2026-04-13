import { useEffect, useState } from "react";
import { IoEye } from "react-icons/io5";
import RequestModal from "../../components/user/RequestModal";
import { orderApi } from "../../connection/BaseUrl";

const Request = () => {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const res = await orderApi.getMyOrders();

        const data = res.data?.data;

        setOrders(Array.isArray(data) ? data : []);

      } catch (err) {
        console.log("ORDER ERROR:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const totalCashback = (orders || []).reduce(
    (acc, o) => acc + (o.cashbackUsed || 0),
    0
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "text-green-400";
      case "REJECTED":
        return "text-red-400";
      default:
        return "text-yellow-400";
    }
  };

  return (
    <div className="p-6 text-white">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold">My Requests</h2>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="text-center py-10 text-white/60">
          Yuklanmoqda...
        </div>
      ) : (
        <div className="bg-[#0d1128] border border-white/10 rounded-xl overflow-hidden">

          <div className="max-h-[500px] overflow-y-auto">

            <table className="w-full text-sm">

              <thead className="bg-white/5 sticky top-0">
                <tr className="text-white/70">
                  <th className="p-4 text-left">#</th>
                  <th className="p-4 text-left">Company</th>
                  <th className="p-4 text-left">Amount</th>
                  <th className="p-4 text-left">Deadline</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((o) => (
                  <tr
                    key={o.id}
                    className="border-t border-white/10 hover:bg-white/5 transition"
                  >

                    <td className="p-4">{o.id}</td>
                    <td className="p-4">{o.companyName}</td>

                    {/* AMOUNT */}
                    <td className="p-4">
                      ${o.orderAmount || o.cashRemaining || 0}
                    </td>

                    {/* CASHBACK */}
                    <td className="p-4 text-green-400">
                      {o.deadline}
                    </td>

                    {/* STATUS */}
                    <td className={`p-4 font-semibold ${getStatusColor(o.status)}`}>
                      {o.status}
                    </td>

                    {/* ACTION */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => setSelected(o)}
                        className="p-2 rounded-lg hover:bg-blue-500/20 text-blue-400"
                      >
                        <IoEye className="w-5 h-5" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        </div>
      )}

      {/* MODAL */}
      {selected && (
        <RequestModal
          order={selected}
          onClose={() => setSelected(null)}
        />
      )}

    </div>
  );
};

export default Request;