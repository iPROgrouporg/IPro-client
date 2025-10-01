import React from "react";
import Logo from "../../assets/icons/Logo.svg";
import LogoBig from "../../assets/images/iproLogoRegister.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Section */}
      <div className="flex-[7.5] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-10 py-7">
          <img src={Logo} alt="Logo" className="w-24" />
          <div className="flex items-center gap-4">
            <p className="text-xs">Hisobingiz yo'qmi?</p>
            <Link
              to="/register"
              className="rounded-md border-2 border-black px-6 py-1 text-sm font-medium transition hover:shadow-lg text-black">
              Ro'yxatdan o'tish
            </Link>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex flex-1 justify-center py-32">
          <div className="w-full max-w-md">
            <div className="mb-10 text-center">
              <h1 className="mb-3 text-3xl font-bold">IPRO GROUP</h1>
              <p className="text-gray-400">Sizni saytimizda ko'rganimizdan hursandmiz!</p>
            </div>

            <form>
              <input
                type="number"
                placeholder="Telefon raqamingiz"
                className="mb-3 w-full rounded-md border-2 border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              />

              <input
                type="password"
                placeholder="Parol"
                className="mb-3 w-full rounded-md border-2 border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              />

              <div className="mt-2 flex items-center justify-between text-sm">
                <label className="flex cursor-pointer items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 accent-blue-500" />
                  <span className="font-normal text-gray-600">Yodda saqlash</span>
                </label>
                <Link 
                  to="/recoveryPassword" 
                  className="text-sm font-normal text-gray-600 transition hover:text-blue-600"
                >
                  Parolni unutdingizmi?
                </Link>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full rounded-md bg-blue-600 py-2.5 font-medium text-white transition hover:bg-blue-700"
                >
                  Kirish
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mb-10 mt-6 flex items-center justify-center">
          <h5 className="text-center text-sm font-light text-gray-400">
            ©2020. - 2025 All Rights Reserved. Qpay
          </h5>
        </div>
      </div>

      {/* Right Section */}
      <div 
        className="flex-[2.5] flex h-screen flex-col items-center justify-center bg-blue-600"
        style={{
          background: `
            linear-gradient(225deg, 
              #2D2F76 0%, #2E307C 30%,
              #1d4ed8 30%, #1d4ed8 40%,
              #1e40af 40%, #1e40af 70%, 
              #312e81 55%, #312e81 80%
            )
          `
        }}
      >
        <img src={LogoBig} alt="Logo" />
        
        <div className="mt-16">
          <p className="text-center text-sm font-semibold text-white">
            Sizni saytimizda ko'rganimizdan hursandmiz!
            Bizga ishonganig uchun "Rahmat".
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;