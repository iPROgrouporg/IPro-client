import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * AuthGuard – himoyalangan yo'llar uchun komponent.
 * Foydalanuvchi tizimga kirganmi-yo'qligini (token bor-yo'qligini) tekshiradi.
 * 
 * @param {ReactNode} children – himoyalangan komponent(lar)
 * @returns {ReactNode} – token bor bo'lsa: children, yo'q bo'lsa: xabar va orqaga tugmasi
 */
const AuthGuard = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!token) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2 style={{ color: "crimson" }}>
          Siz ro‘yxatdan o‘tmagansiz, bu sahifaga kira olmaysiz!
        </h2>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Orqaga
        </button>
      </div>
    );
  }

  return children;
};

export default AuthGuard;
