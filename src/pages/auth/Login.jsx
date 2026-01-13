import React, {useState} from "react";
import {Link} from "react-router-dom";
import Logo from "../../assets/icons/Logo.svg";
import LogoBig from "../../assets/images/iproLogoRegister.png";
import {authApi} from "../../connection/BaseUrl.js";

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});


    const handlePhoneChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (!value.startsWith("998") && value.length > 0) value = "998" + value;
        if (value.length > 12) value = value.slice(0, 12);
        setPhoneNumber(value);
        if (errors.phoneNumber) setErrors({...errors, phoneNumber: ""});
    };


    const handleLogin = async () => {
        const newErrors = {};

        if (!phoneNumber.trim()) newErrors.phoneNumber = "Telefon raqam kiriting!";
        else if (phoneNumber.length !== 12) newErrors.phoneNumber = "Telefon to‘liq emas!";

        if (!password.trim()) newErrors.password = "Parol kiriting!";
        else if (password.length < 8) newErrors.password = "Parol kamida 8 ta belgi bo‘lsin!";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const res = await authApi.login({
                login: "+" + phoneNumber,
                password: password
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
        }
    };


    return (
        <></>
        // <div className="flex min-h-screen bg-white">
        //     {/* Chap qism */}
        //     <div className="flex-[7.5] flex flex-col">
        //         {/* Header */}
        //         <div className="flex items-center justify-between px-10 py-7">
        //             <img src={Logo} alt="Logo" className="w-24"/>
        //             <div className="flex items-center gap-4">
        //                 <p className="text-xs">Hisobingiz yo‘qmi?</p>
        //                 <Link
        //                     to="/register"
        //                     className="rounded-md border-2 border-black px-6 py-1 text-sm font-medium text-black transition hover:shadow-lg"
        //                 >
        //                     Ro‘yhatdan o‘tish
        //                 </Link>
        //             </div>
        //         </div>
        //
        //         {/* Form qismi */}
        //         <div className="flex flex-1 justify-center py-24">
        //             <div className="w-full max-w-md">
        //                 <div className="mb-10 text-center">
        //                     <h1 className="mb-3 text-3xl font-bold">IPRO GROUP</h1>
        //                     <p className="text-gray-400">Sizni saytimizda ko‘rganimizdan xursandmiz!</p>
        //                 </div>
        //                 {/* Telefon raqam */}
        //                 <div className="mb-3">
        //                     <input
        //                         type="tel"
        //                         value={phoneNumber}
        //                         onChange={handlePhoneChange}  // ❌ shuni ishlatish shart
        //                         onFocus={() => {
        //                             if (!phoneNumber) setPhoneNumber("998");
        //                         }}
        //                         placeholder="Telefon raqamingizni kiriting"
        //                         className={`w-full rounded-md border-2 px-4 py-2 focus:outline-none ${
        //                             errors.phoneNumber ? "border-red-500" : "border-gray-300 focus:border-blue-500"
        //                         }`}
        //                     />
        //
        //                     {errors.phoneNumber && (
        //                         <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
        //                     )}
        //                 </div>
        //
        //                 <div className="mb-3">
        //                     <input
        //                         type="password"
        //                         value={password}
        //                         onChange={e => setPassword(e.target.value)}
        //                         placeholder="Parolingizni kiriting"
        //                         className={`w-full rounded-md border-2 px-4 py-2 focus:outline-none ${
        //                             errors.password ? "border-red-500" : "border-gray-300 focus:border-blue-500"
        //                         }`}
        //                     />
        //                     {errors.password && (
        //                         <p className="mt-1 text-sm text-red-500">{errors.password}</p>
        //                     )}
        //                 </div>
        //
        //                 <div className="mt-2 flex items-center justify-between text-sm">
        //                     <label className="flex cursor-pointer items-center gap-2">
        //                         <input type="checkbox" className="h-4 w-4 accent-blue-500"/>
        //                         <span className="text-gray-600">Yodda saqlash</span>
        //                     </label>
        //                     <Link
        //                         to="/recoveryPassword"
        //                         className="text-gray-600 text-base transition hover:text-blue-600"
        //                     >
        //                         Parolni unutdingizmi?
        //                     </Link>
        //                 </div>
        //
        //                 <div className="mt-4">
        //                     <button
        //                         onClick={handleLogin}
        //                         className="w-full rounded-md bg-blue-600 py-2.5 font-medium text-white transition hover:bg-blue-700"
        //                     >
        //                         Kirish
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>
        //
        //         {/* Footer */}
        //         <div className="mb-10 mt-6 flex items-center justify-center">
        //             <h5 className="text-center text-sm font-light text-gray-400">
        //                 ©2020 - 2025 All Rights Reserved. Qpay
        //             </h5>
        //         </div>
        //     </div>
        //
        //     <div
        //         className="flex-[2.5] flex h-screen flex-col items-center justify-center"
        //         style={{
        //             background: `
        //     linear-gradient(225deg,
        //       #2D2F76 0%, #2E307C 30%,
        //       #1d4ed8 30%, #1d4ed8 40%,
        //       #1e40af 40%, #1e40af 70%,
        //       #312e81 55%, #312e81 80%
        //     )
        //   `,
        //         }}
        //     >
        //         <img src={LogoBig} alt="Logo"/>
        //         <div className="mt-16">
        //             <p className="text-center text-sm font-semibold text-white">
        //                 Sizni saytimizda ko‘rganimizdan hursandmiz! <br/>
        //                 Bizga ishonganingiz uchun rahmat.
        //             </p>
        //         </div>
        //     </div>
        // </div>
    );
};

export default Login;
