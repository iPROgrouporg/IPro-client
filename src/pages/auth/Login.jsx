import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/icons/Logo.svg";
import LogoBig from "../../assets/images/iproLogoRegister.png";
import { authApi } from "../../connection/BaseUrl.js";

const Login = () => {
    const navigate = useNavigate();

    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // 🔥 PHONE INPUT (global format)
    const handlePhoneChange = (e) => {
        let value = e.target.value;

        value = value.replace(/[^+\d]/g, "");

        if (value.includes("+")) {
            value = "+" + value.replace(/\+/g, "");
        }

        if (value.length > 16) {
            value = value.slice(0, 16);
        }

        setPhoneNumber(value);

        if (errors.phoneNumber) {
            setErrors({ ...errors, phoneNumber: "" });
        }
    };

    // 🔥 LOGIN
    const handleLogin = async () => {
        const newErrors = {};

        if (!phoneNumber.trim()) {
            newErrors.phoneNumber = "Telefon raqam kiriting!";
        }

        if (!password.trim()) {
            newErrors.password = "Parol kiriting!";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true);

            // 🔥 NORMALIZE
            let login = phoneNumber.replace(/[^\d]/g, "");
            login = "+" + login;

            const res = await authApi.login({
                login,
                password,
            });

            const result = res.data;

            if (result.accessToken) {
                sessionStorage.setItem("token", result.accessToken);
                sessionStorage.setItem("user", JSON.stringify(result.users));
                window.location.href = "/dashboard";
            } else {
                alert("Login muvaffaqiyatsiz!");
            }
        } catch (error) {
            if (error.response?.status === 401) {
                alert("Telefon yoki parol noto‘g‘ri!");
            } else {
                alert("Serverda xatolik!");
            }
            console.log("Login error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-white flex-col lg:flex-row">
            {/* LEFT */}
            <div className="w-full lg:flex-[7.5] flex flex-col">
                
                {/* HEADER */}
                <div className="flex items-center justify-between px-5 md:px-10 py-5 md:py-7">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="w-20 md:w-24 cursor-pointer"
                        onClick={() => navigate("/")}
                    />

                    <div className="flex items-center gap-3 md:gap-4">
                        <p className="text-xs hidden sm:block">Hisobingiz yo‘qmi?</p>
                        <Link
                            to="/register"
                            className="rounded-md border-2 border-black px-4 md:px-6 py-1 text-xs md:text-sm font-medium text-black transition hover:shadow-lg"
                        >
                            Ro‘yxatdan o‘tish
                        </Link>
                    </div>
                </div>

                {/* FORM */}
                <div className="flex flex-1 justify-center items-center px-4 py-10 md:py-24">
                    <div className="w-full max-w-md">
                        
                        {/* TITLE */}
                        <div className="mb-8 md:mb-10 text-center">
                            <h1 className="mb-3 text-2xl md:text-3xl font-bold">
                                IPRO GROUP
                            </h1>
                            <p className="text-gray-400 text-sm md:text-base">
                                Sizni saytimizda ko‘rganimizdan xursandmiz!
                            </p>
                        </div>

                        {/* PHONE */}
                        <div className="mb-3">
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={handlePhoneChange}
                                placeholder="+998901234567"
                                className={`w-full rounded-md border-2 px-4 py-3 text-sm md:text-base focus:outline-none ${
                                    errors.phoneNumber
                                        ? "border-red-500"
                                        : "border-gray-300 focus:border-blue-500"
                                }`}
                            />
                            {errors.phoneNumber && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.phoneNumber}
                                </p>
                            )}
                        </div>

                        {/* PASSWORD */}
                        <div className="mb-3">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Parolingizni kiriting"
                                className={`w-full rounded-md border-2 px-4 py-3 text-sm md:text-base focus:outline-none ${
                                    errors.password
                                        ? "border-red-500"
                                        : "border-gray-300 focus:border-blue-500"
                                }`}
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* OPTIONS */}
                        <div className="mt-2 flex items-center justify-between text-sm">
                            <label className="flex cursor-pointer items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 accent-blue-500"
                                />
                                <span className="text-gray-600 text-xs md:text-sm">
                                    Yodda saqlash
                                </span>
                            </label>

                            <Link
                                to="/recoveryPassword"
                                className="text-gray-600 text-xs md:text-sm transition hover:text-blue-600"
                            >
                                Parolni unutdingizmi?
                            </Link>
                        </div>

                        {/* BUTTON */}
                        <div className="mt-4">
                            <button
                                onClick={handleLogin}
                                disabled={loading}
                                className="w-full rounded-md bg-blue-600 py-3 text-sm md:text-base font-medium text-white transition hover:bg-blue-700 active:scale-95 disabled:opacity-50"
                            >
                                {loading ? "Yuklanmoqda..." : "Kirish"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="mb-6 md:mb-10 mt-4 flex items-center justify-center">
                    <h5 className="text-center text-xs md:text-sm font-light text-gray-400">
                        ©2020 - 2025 All Rights Reserved. Qpay
                    </h5>
                </div>
            </div>

            {/* RIGHT (ONLY DESKTOP) */}
            <div
                className="hidden lg:flex lg:flex-[2.5] h-screen flex-col items-center justify-center"
                style={{
                    background: `
                    linear-gradient(225deg,
                      #2D2F76 0%, #2E307C 30%,
                      #1d4ed8 30%, #1d4ed8 40%,
                      #1e40af 40%, #1e40af 70%,
                      #312e81 55%, #312e81 80%
                    )
                  `,
                }}
            >
                <img src={LogoBig} alt="Logo" className="w-60" />

                <div className="mt-16 px-6">
                    <p className="text-center text-sm font-semibold text-white">
                        Sizni saytimizda ko‘rganimizdan hursandmiz! <br />
                        Bizga ishonganingiz uchun rahmat.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;