import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { IoSearch, IoClose, IoSparkles } from "react-icons/io5";
import { orderApi } from "../../connection/BaseUrl";
import { useTranslation } from "react-i18next";

const inputStyle =
  "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.25)] transition";

const ServicesPage = () => {
  const { t } = useTranslation();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const [orderLoading, setOrderLoading] = useState(false);

  // 🔥 NEW: cashback state
  const [cashback, setCashback] = useState(0);

  const [form, setForm] = useState({
    companyName: "",
    orderAmount: "",
    deadline: "",
    description: "",
    useCashback: false,
  });

  // ===================== GET SERVICES =====================
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(
          "https://api.iprogroup.org/api/v1/service/all"
        );
        setServices(res.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // 🔥 NEW: GET USER CASHBACK
  useEffect(() => {
    const getCashback = async () => {
      try {
        const res = await axios.get("/api/user/me"); // o‘zingni endpoint
        setCashback(res.data?.cashback || 0);
      } catch (err) {
        console.log(err);
      }
    };

    getCashback();
  }, []);

  // ===================== FILTER =====================
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

  // 🔥 NEW: CALCULATION
  const cashbackUsed = form.useCashback
    ? Math.min(Number(form.orderAmount || 0), cashback)
    : 0;

  const remaining =
    Number(form.orderAmount || 0) - cashbackUsed;

  // ===================== CREATE ORDER API =====================
  const handleSubmitOrder = async () => {
    if (!selectedService?.id) return;

    setOrderLoading(true);

    try {
      const payload = {
        companyName: form.companyName,
        orderAmount: Number(form.orderAmount),
        deadline: new Date().toISOString(),
        description: form.description,
        useCashback: Boolean(form.useCashback),
      };

      const res = await orderApi.createOrder(
        selectedService.id,
        payload
      );

      if (res.data) {
        setOpenModal(false);
        setSelectedService(null);

        setForm({
          companyName: "",
          orderAmount: "",
          deadline: "",
          description: "",
          useCashback: false,
        });
      }
    } catch (err) {
      console.log("ORDER ERROR:", err?.response?.data || err.message);
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <div className=" bg-[#0A0F1F] text-white p-6 sm:p-10">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-10">

        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <IoSparkles className="text-blue-400" />
            {t("title")}
          </h1>
          <p className="text-white/50 text-sm mt-1">
            {t("desc")}
          </p>
        </div>

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

      {/* SERVICES */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((s) => (
          <div
            key={s.id}
            onClick={() => openOrder(s)}
            className="group cursor-pointer p-6 rounded-2xl bg-gradient-to-b from-white/5 to-white/0 border border-white/10 hover:border-blue-500 hover:scale-[1.02] transition-all duration-300"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 mb-4">
              <IoSparkles />
            </div>

            <h2 className="text-lg font-semibold group-hover:text-blue-400">
              {s.name}
            </h2>

            <p className="text-sm text-white/60 mt-2">
              {s.description || "No description"}
            </p>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpenModal(false)}
          />

          <div className="relative w-full max-w-2xl bg-[#0b1020] border border-white/10 rounded-2xl">

            {/* HEADER */}
            <div className="flex justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold">
                {selectedService?.name}
              </h2>

              <button onClick={() => setOpenModal(false)}>
                <IoClose />
              </button>
            </div>

            {/* FORM */}
            <div className="p-6 grid grid-cols-2 gap-4">

              <input
                name="companyName"
                placeholder={t("companyName")}
                className={inputStyle}
                onChange={handleChange}
                value={form.companyName}
              />

              <input
                name="orderAmount"
                placeholder={t("orderAmount")}
                className={inputStyle}
                onChange={handleChange}
                value={form.orderAmount}
              />

              <input
                name="deadline"
                placeholder={t("deadline")}
                className={inputStyle}
                onChange={handleChange}
                value={form.deadline}
              />

              <textarea
                name="description"
                placeholder={t("description")}
                className={`${inputStyle} col-span-2 h-28`}
                onChange={handleChange}
                value={form.description}
              />

              {/* 🔥 CASHBACK */}
              <label className="col-span-2 flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  name="useCashback"
                  onChange={handleChange}
                  checked={form.useCashback}
                />
                {t("useCashback")} ({cashback}$)
              </label>

              {/* 🔥 CALC INFO */}
              {form.useCashback && (
                <div className="col-span-2 text-sm space-y-1">
                  <p className="text-green-400">
                    Cashback ishlatiladi: {cashbackUsed}$
                  </p>

                  <p className="text-yellow-400">
                    Qolgan to‘lov: {remaining}$
                  </p>

                  {cashback < Number(form.orderAmount) && (
                    <p className="text-yellow-500">
                      Cashback yetarli emas, qolgan summa oddiy to‘lanadi
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* BUTTON */}
            <div className="p-6 border-t border-white/10">
              <button
                onClick={handleSubmitOrder}
                disabled={orderLoading}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition"
              >
                {orderLoading ? t("sending") : t("submit")}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;