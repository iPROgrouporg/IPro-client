import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { base_url } from "../../../connection/BaseUrl";

export const OrderForms = ({ setShowModal, service }) => {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [orderAmount, setOrderAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [useCashback, setUseCashback] = useState(false);

  const [errors, setErrors] = useState("");

  // ================= GET USER =================
  useEffect(() => {
    if (!token) return;

    base_url
      .get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, [token]);

  const handleAmount = (e) => {
    const onlyNums = e.target.value.replace(/\D/g, "");
    setOrderAmount(onlyNums);
  };

  // ================= CHECK AUTH =================
  const canOrder = () => {
    if (!token) return "Ro‘yxatdan o‘ting";
    if (!user?.enabled) return "Ro‘yxatdan o‘ting";
    if (!user?.verified) return "Telefon tasdiqlanmagan";
    return null;
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const authError = canOrder();
    if (authError) {
      setErrors(authError);
      return;
    }

    if (!companyName || !orderAmount || !deadline) {
      setErrors("Barcha maydonlarni to‘ldiring");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        companyName,
        orderAmount: Number(orderAmount),
        deadline,
        description,
        useCashback,
      };

      const res = await base_url.post(
        `/order/${service?.id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("ORDER SUCCESS:", res.data);

      setShowModal(false);
    } catch (err) {
      setErrors(
        err.response?.data?.message || "Order yuborishda xatolik"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="relative w-full max-w-2xl rounded-2xl bg-gradient-to-br from-[#1E2238]/90 to-[#0F172A]/90 p-6 text-white">

        {/* CLOSE */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5"
        >
          <IoMdClose size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          Buyurtma berish
        </h2>

        {/* ERROR MESSAGE */}
        {errors && (
          <p className="text-center text-red-500 mb-3">{errors}</p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* COMPANY */}
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Kompaniya nomi"
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10"
          />

          {/* AMOUNT */}
          <input
            value={orderAmount}
            onChange={handleAmount}
            placeholder="Narx"
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10"
          />

          {/* DEADLINE */}
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10"
          />

          {/* CASHBACK */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={useCashback}
              onChange={(e) => setUseCashback(e.target.checked)}
            />
            <label>Cashback ishlatish</label>
          </div>

          {/* DESCRIPTION */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Izoh"
            className="sm:col-span-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10"
          />

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="sm:col-span-2 py-3 bg-blue-600 rounded-xl"
          >
            {loading ? "Yuborilmoqda..." : "Buyurtma berish"}
          </button>

        </form>
      </div>
    </div>
  );
};