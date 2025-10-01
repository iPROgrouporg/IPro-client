import React, { useState } from "react";
import { requests as mockRequests } from "../../mocks/mock";

const Request = () => {
  const [requests, setRequests] = useState(mockRequests);
  const [tempRequests, setTempRequests] = useState([...mockRequests]);

  const getCurrentTime = () => {
    return new Date().toLocaleString("en-GB", { 
      year: "numeric", 
      month: "2-digit", 
      day: "2-digit", 
      hour: "2-digit", 
      minute: "2-digit", 
      second: "2-digit",
      hour12: false,
    });
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedRequests = [...tempRequests];
    updatedRequests[index].status = newStatus;
    updatedRequests[index].updated = getCurrentTime();
    setTempRequests(updatedRequests);
  };

  const handleCashbackChange = (index, newCashback) => {
    const updatedRequests = [...tempRequests];
    updatedRequests[index].cashback = newCashback;
    updatedRequests[index].updated = getCurrentTime();
    setTempRequests(updatedRequests);
  };

  const handleConfirmChanges = (index) => {
    const updatedRequests = [...requests];
    updatedRequests[index] = { ...tempRequests[index] };
    setRequests(updatedRequests);
    setTempRequests(updatedRequests);
  };

  const handleDeleteRequest = (index) => {
    const updatedRequests = requests.filter((_, i) => i !== index);
    setRequests(updatedRequests);
    setTempRequests(updatedRequests);
  };

  return (
    <div className="p-5">
      <div className="p-4 rounded-lg flex justify-between items-center">
        <h2 className="text-3xl font-normal">Requests Table</h2>
      </div>

      {/* Responsive table wrapper */}
      <div className="mt-4 bg-[#292d32] px-4 rounded-lg shadow-lg overflow-x-auto">
        <div className="max-h-[537px] overflow-y-auto">
          <table className="w-full min-w-[700px]">
            <thead className="border-b border-white sticky top-0 bg-[#292d32] z-10">
              <tr>
                <th className="p-4 text-left whitespace-nowrap">Number request</th>
                <th className="p-4 text-left whitespace-nowrap">Topic</th>
                <th className="p-4 text-left whitespace-nowrap">Date</th>
                <th className="p-4 text-left whitespace-nowrap">Last updated</th>
                <th className="p-4 text-left whitespace-nowrap">Status</th>
                <th className="p-4 text-left whitespace-nowrap">Cashback</th>
                <th className="p-4 text-left whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tempRequests.map((req, index) => (
                <tr key={index} className="border-b-2 border-gray-600">
                  <td className="p-4 whitespace-nowrap">{req.id}</td>
                  <td className="p-4 whitespace-nowrap">{req.topic}</td>
                  <td className="p-4 whitespace-nowrap">{req.date}</td>
                  <td className="p-4 whitespace-nowrap">{req.updated}</td>
                  <td className="p-4">
                    <select
                      value={req.status}
                      onChange={(e) => handleStatusChange(index, e.target.value)}
                      className={`p-2 bg-gray-700 rounded-md focus:outline-none ${
                        req.status === "Pending" ? "text-yellow-400" :
                        req.status === "Accepted" ? "text-green-500" :
                        "text-red-600"
                      }`}
                    >
                      <option value="Pending" className="bg-gray-700 text-yellow-400">Pending</option>
                      <option value="Accepted" className="bg-gray-700 text-green-500">Accepted</option>
                      <option value="Rejected" className="bg-gray-700 text-red-600">Rejected</option>
                    </select>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <input
                      type="number"
                      value={req.cashback}
                      onChange={(e) => handleCashbackChange(index, e.target.value)}
                      className="p-2 w-20 bg-gray-700 rounded-md"
                    />$
                  </td>
                  <td className="p-4 flex gap-2 whitespace-nowrap">
                    <button 
                      className="px-2 py-1 bg-green-500 rounded-md text-white"
                      onClick={() => handleConfirmChanges(index)}
                    >
                      Confirm
                    </button>
                    <button 
                      className="px-2 py-1 bg-red-500 rounded-md text-white"
                      onClick={() => handleDeleteRequest(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Request;
