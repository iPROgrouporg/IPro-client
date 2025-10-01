import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const orderList = [
  { id: 1, title: "Ux&UI dizayn", description: "Loyiha Mindmapini ishlab chiqish va ushbu arxetektura asosida optimal yechimga ega dizaynlarni chizish" },
  { id: 2, title: "Frontend Development", description: "React va Vue orqali mukammal UI yaratish va interaktiv sahifalar yaratish" },
  { id: 3, title: "Backend Development", description: "Node.js va Django orqali server tomonida ishlovchi tizimlarni yaratish" },
  { id: 4, title: "Mobile App Development", description: "React Native va Flutter orqali mobil ilovalar yaratish" },
  { id: 5, title: "SEO Optimization", description: "Web-saytlarni Google va boshqa qidiruv tizimlarida optimallashtirish" }
];

const Orders = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 sm:p-10 overflow-hidden">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-8 sm:mb-11">Shopping Cart</h2>

      <div className="max-h-[400px] overflow-y-auto space-y-4 pr-2">
        {orderList.map((order) => (
          <div key={order.id} className="w-full h-[194px] bg-[#252527] px-6 py-6">
            <h1 className="text-lg sm:text-2xl font-semibold text-center mb-3">{order.title}</h1>
            <p className="text-sm sm:text-base font-normal text-center">{order.description}</p>
          </div>
        ))}
      </div>

      <button
        className="bg-[#0186EF] rounded-lg w-full sm:w-auto px-10 py-4 mt-6 text-white"
        onClick={() => setIsOpen(true)}
      >
        Make an order
      </button>

    <div
        className={`fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Modal Content */}
      <div
        className={`fixed top-1/2 left-1/2 max-w-[748px] w-full max-h-[90vh] overflow-y-auto bg-[#292d32] rounded-lg p-6 sm:p-[51px] shadow-lg z-50
          transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300
          ${isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
        `}
      >
        <div className="flex justify-between items-start mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Request form</h2>
          <button
            className="text-white text-3xl"
            onClick={() => setIsOpen(false)}
            aria-label="Close modal"
          >
            <IoClose />
          </button>
        </div>

        <form action="#" className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-white">
          <label className="flex flex-col gap-2">
            <span>*Company name</span>
            <input
              type="text"
              className="p-3 bg-[#3A3F47] rounded-md text-white outline-none w-full"
              autoComplete="off"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span>*Service type</span>
            <input
              type="text"
              className="p-3 bg-[#3A3F47] rounded-md text-white outline-none w-full"
              autoComplete="off"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span>*Deadline (in a month)</span>
            <input
              type="text"
              className="p-3 bg-[#3A3F47] rounded-md text-white outline-none w-full"
              autoComplete="off"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span>*Proposed amount (in dollars)</span>
            <input
              type="text"
              className="p-3 bg-[#3A3F47] rounded-md text-white outline-none w-full"
              autoComplete="off"
            />
          </label>

          <label className="flex flex-col gap-2 sm:col-span-2">
            <span>Link for example</span>
            <input
              type="text"
              className="p-3 bg-[#3A3F47] rounded-md text-white outline-none w-full"
              autoComplete="off"
            />
          </label>

          <label className="flex flex-col gap-2 sm:col-span-2">
            <span>*Other description</span>
            <textarea
              className="h-[232px] resize-none p-3 bg-[#3A3F47] rounded-md text-white outline-none w-full"
            />
          </label>
        </form>

        <div className="flex justify-center mt-6">
          <button className="bg-blue-600 hover:bg-blue-700 transition w-full py-3 rounded-md text-white text-lg font-semibold">
            Make an order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
