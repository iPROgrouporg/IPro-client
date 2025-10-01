import React, { useState } from "react";
import { requests } from "../../mocks/mock";
import RequestModal from "./reqmodal";

const Request = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderClick = (orderId) => {
    const selected = requests.find((req) => req.id === orderId);
    if (selected) {
      setSelectedOrder(selected);
    }
  };

  return (
    <div className="p-10">
      <div className="p-4 rounded-lg flex justify-between">
        <h2 className="text-3xl font-normal">Request list</h2>
        <h2 className="text-3xl font-normal">
          Total cashback: ${requests.reduce((acc, req) => acc + req.cashback, 0)}
        </h2>
      </div>

      <div className="mt-2 bg-[#292d32] px-4 rounded-lg shadow-lg">
        <div className="max-h-[520px] overflow-y-auto">
          <table className="w-full">
            <thead className="border-b border-white sticky top-0 bg-[#292d32] z-10">
              <tr>
                <th className="p-4 text-left">Number request</th>
                <th className="p-4 text-left">Topic</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Last updated</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Cashback</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr
                  key={req.id}
                  className="border-b-2 border-gray-600 cursor-pointer hover:bg-gray-700 transition"
                  onClick={() => handleOrderClick(req.id)}
                >
                  <td className="p-4">{req.id}</td>
                  <td className="p-4">{req.topic}</td>
                  <td className="p-4">{req.date}</td>
                  <td className="p-4">{req.updated}</td>
                  <td
                    className={`p-4 font-semibold ${
                      req.status === "Accepted"
                        ? "text-green-400"
                        : req.status === "Rejected"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {req.status}
                  </td>
                  <td className="p-4">{req.cashback}$</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <RequestModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default Request;
