import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

export const OrderForms = ({ setShowModal, service }) => {
  const [companyName, setCompanyName] = useState("");
  const [orderAmount, setOrderAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [useCashback, setUseCashback] = useState(false);
  const [errors, setErrors] = useState({});

  const handleAmount = (e) => {
    const onlyNums = e.target.value.replace(/\D/g, "");
    setOrderAmount(onlyNums);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!companyName) newErrors.companyName = "Kompaniya nomi kiritilishi kerak";
    if (!orderAmount) newErrors.orderAmount = "Buyurtma narxi kiritilishi kerak";
    if (!deadline) newErrors.deadline = "Deadline kiritilishi kerak";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const data = { companyName, orderAmount, deadline, description, useCashback };
      console.log("ORDER DATA:", data);
      setShowModal(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl rounded-2xl bg-gradient-to-br from-[#1E2238]/90 to-[#0F172A]/90 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,112,244,0.3)] p-6 text-white animate-fadeIn">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-2xl rounded-2xl -z-10"></div>

        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-blue-500/20 text-gray-300 hover:text-white transition"
        >
          <IoMdClose size={24} />
        </button>

        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-transparent bg-clip-text">
          Buyurtma berish
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Company */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Kompaniya nomi</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="My Company"
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none transition-all"
            />
            {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
          </div>

          {/* Amount */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Buyurtma narxi ($)</label>
            <input
              type="text"
              value={orderAmount}
              onChange={handleAmount}
              placeholder="1000"
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            />
            {errors.orderAmount && <p className="text-red-500 text-sm mt-1">{errors.orderAmount}</p>}
          </div>

          {/* Deadline */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300">Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 outline-none transition-all"
            />
            {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>}
          </div>

          {/* Cashback */}
          <div className="flex flex-col mt-4 sm:mt-6">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-2 w-max">
              <input
                type="checkbox"
                checked={useCashback}
                onChange={(e) => setUseCashback(e.target.checked)}
                className="w-5 h-5 accent-cyan-400 cursor-pointer transition-all duration-200 hover:scale-110"
              />
              <label className="text-gray-300 select-none">Cashback ishlatish</label>
            </div>
          </div>

          {/* Description */}
          <div className="sm:col-span-2 flex flex-col gap-1">
            <label className="text-sm text-gray-300">Izoh</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              placeholder="Qo‘shimcha ma’lumot..."
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400 outline-none transition-all resize-none"
            />
          </div>

          {/* Submit */}
          <div className="sm:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,112,244,0.6)] transition-all duration-300"
            >
              Buyurtmani yuborish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};