import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { orderApi } from "../../../connection/BaseUrl";
import { useTranslation } from "react-i18next";

export const OrderForms = ({ setShowModal, service }) => {
  const token = localStorage.getItem("token");
  const {t}=useTranslation()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    companyName: "",
    orderAmount: "",
    deadline: "",
    description: "",
    useCashback: false,
  });

  // ================= INPUT =================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.companyName || !form.orderAmount || !form.deadline) {
      return setError("Barcha maydonlarni to‘ldiring");
    }

    try {
      setLoading(true);

      const payload = {
        companyName: form.companyName,
        orderAmount: Number(form.orderAmount),
        deadline: form.deadline,
        description: form.description,
        useCashback: form.useCashback,
      };

      const res = await orderApi.createOrder(service?.id, payload);

      console.log("ORDER SUCCESS:", res.data);

      setShowModal(false);

    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Order yuborishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">

      <div className="relative w-full max-w-2xl rounded-2xl bg-[#0f172a] text-white shadow-2xl">

        {/* HEADER */}
        <div className="flex justify-between items-center p-5 border-b border-white/10">
          <h2 className="text-xl font-bold">
            {service?.title || "Buyurtma berish"}
          </h2>

          <button onClick={() => setShowModal(false)}>
            <IoMdClose size={24} />
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-center text-red-400 mt-3">{error}</p>
        )}

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5"
        >

          {/* COMPANY */}
          <input
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            placeholder={t('companyName')}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10"
          />

          {/* AMOUNT */}
          <input
            name="orderAmount"
            value={form.orderAmount}
            onChange={handleChange}
            placeholder={t('orderAmount')}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10"
          />

          {/* DEADLINE */}
          <input
            type="text"
            placeholder={t('deadline')}
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10"
          />

          {/* CASHBACK */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="useCashback"
              checked={form.useCashback}
              onChange={handleChange}
            />
            {t('useCashback')}
          </label>

          {/* DESCRIPTION */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder={t('description')}
            className="sm:col-span-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="sm:col-span-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
          >
            {loading ? t('sending') : t('submit')}
          </button>

        </form>
      </div>
    </div>
  );
};