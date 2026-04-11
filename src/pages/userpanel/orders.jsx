import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { IoSearch, IoClose, IoSparkles } from "react-icons/io5";

const inputStyle =
  "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.25)] transition";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [selectedService, setSelectedService] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [form, setForm] = useState({
    companyName: "",
    orderAmount: "",
    deadline: "",
    description: "",
    useCashback: false,
  });

  // =====================
  // GET SERVICES
  // =====================
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(
          "http://localhost:2025/api/v1/service/all"
        );

        setServices(res.data?.data || res.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // =====================
  // FILTER (PERFECT)
  // =====================
  const filtered = useMemo(() => {
    return services.filter((s) =>
      (s.name || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [search, services]);

  const openOrder = (service) => {
    setSelectedService(service);
    setOpenModal(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className=" bg-[#0A0F1F] text-white p-6 sm:p-10">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-10">

        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <IoSparkles className="text-blue-400" />
            Services
          </h1>
          <p className="text-white/50 text-sm mt-1">
            Choose service and create your order
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative w-full sm:w-80">
          <IoSearch className="absolute left-4 top-4 text-white/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search service..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-44 rounded-2xl bg-white/5 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* SERVICES GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {filtered.map((s) => (
          <div
            key={s.id}
            onClick={() => openOrder(s)}
            className="
              group relative cursor-pointer
              p-6 rounded-2xl
              bg-gradient-to-b from-white/5 to-white/0
              border border-white/10
              hover:border-blue-500
              hover:scale-[1.02]
              transition-all duration-300
            "
          >

            {/* ICON */}
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 mb-4">
              <IoSparkles />
            </div>

            {/* TITLE */}
            <h2 className="text-lg font-semibold group-hover:text-blue-400">
              {s.name}
            </h2>

            {/* DESC */}
            <p className="text-sm text-white/60 mt-2 line-clamp-3">
              {s.description || "No description available"}
            </p>

            {/* FOOTER */}
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs px-3 py-1 rounded-full bg-white/10">
                Service
              </span>

              <span className="text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition">
                Click to order →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ===================== */}
      {/* MODAL (PRO VERSION) */}
      {/* ===================== */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

  {/* BACKDROP */}
  <div
    className="absolute inset-0 bg-black/70 backdrop-blur-sm"
    onClick={() => setOpenModal(false)}
  />

  {/* MODAL */}
  <div className="
    relative w-full max-w-2xl
    bg-[#0b1020]/95
    border border-white/10
    rounded-2xl
    shadow-[0_0_40px_rgba(59,130,246,0.15)]
    overflow-hidden
  ">

    {/* HEADER */}
    <div className="flex justify-between items-start p-6 border-b border-white/10">
      <div>
        <h2 className="text-xl font-bold text-white">
          {selectedService?.name}
        </h2>
        <p className="text-xs text-white/50 mt-1">
          Fill order details carefully
        </p>
      </div>

      <button
        onClick={() => setOpenModal(false)}
        className="p-2 rounded-full hover:bg-white/10 transition"
      >
        <IoClose className="text-2xl text-white" />
      </button>
    </div>

    {/* FORM */}
    <div className="p-6 grid grid-cols-2 gap-5">

      {/* COMPANY */}

       <input
        name="Service type"
        placeholder="Service type"
        className={inputStyle}
        onChange={handleChange}
      /> 


      <input
        name="companyName"
        placeholder="Company name"
        className={inputStyle}
        onChange={handleChange}
      />

      {/* ORDER AMOUNT (ONLY NUMBERS) */}
      <input
        name="orderAmount"
        placeholder="Order amount ($)"
        className={inputStyle}
        inputMode="numeric"
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, ""); // only digits
          setForm((prev) => ({ ...prev, orderAmount: value }));
        }}
        value={form.orderAmount}
      />

      {/* DEADLINE (ONLY NUMBERS) */}
      <input
        name="deadline"
        placeholder="Deadline (days)"
        className={inputStyle}
        inputMode="numeric"
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, "");
          setForm((prev) => ({ ...prev, deadline: value }));
        }}
        value={form.deadline}
      />

      {/* DESCRIPTION */}
      <textarea
        name="description"
        placeholder="Project description..."
        className={`${inputStyle} col-span-2 h-28 resize-none`}
        onChange={handleChange}
      />

      {/* CASHBACK */}
      <label className="
        col-span-2 flex items-center gap-3
        text-sm text-white/70
        bg-white/5 border border-white/10
        p-3 rounded-xl cursor-pointer
        hover:bg-white/10 transition
      ">
        <input
          type="checkbox"
          name="useCashback"
          onChange={handleChange}
        />
        <span>
          <b className="text-white">Use cashback balance</b>
          <p className="text-xs text-white/50">
            Apply your earned cashback to reduce order price
          </p>
        </span>
      </label>

    </div>

    {/* FOOTER */}
    <div className="p-6 border-t border-white/10">
      <button className="
        w-full py-3 rounded-xl
        bg-gradient-to-r from-blue-600 to-blue-500
        hover:from-blue-500 hover:to-blue-400
        text-white font-semibold
        shadow-lg shadow-blue-500/20
        transition
      ">
        Submit Order
      </button>
    </div>

  </div>
</div>
      )}
    </div>
  );
};

export default ServicesPage;