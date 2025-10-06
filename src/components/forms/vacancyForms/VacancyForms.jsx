import React, {useState} from "react";
import {IoMdClose} from "react-icons/io";

export const VacancyForms = ({setShowModal}) => {
    const [workerFullName, setWorkerFullName] = useState('')
    const [workerPhone, setWorkerPhone] = useState('')
    const [level, setLevel] = useState('')
    const [workTime, setWorkTime] = useState('')
    const [price, setPrice] = useState('')
    const [link, setLink] = useState('')
    const [cv, setCv] = useState(null)


    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4">
            <div
                className="relative bg-[#1E2238] rounded-xl shadow-xl w-full max-w-3xl overflow-y-auto max-h-[90vh] pt-3 px-6 pb-6">

                <div className="absolute top-3 right-3">
                    <button
                        onClick={() => setShowModal(false)}
                        className="text-white hover:text-red-500 transition text-3xl"
                    >
                        <IoMdClose/>
                    </button>
                </div>

                <h2 className="text-2xl sm:text-3xl text-center font-bold text-white mb-6">
                    Ariza topshirish
                </h2>

                <form className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-white">
                    <div>
                        <label className="block mb-1 text-sm font-medium">To‘liq ism</label>
                        <input
                            type="text"
                            name="fullName"
                            className="w-full px-4 py-2 rounded-md bg-[#2A2D4A] focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            placeholder="Ismingiz"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Telefon raqam</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            className="w-full px-4 py-2 rounded-md bg-[#2A2D4A] focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            placeholder="+998..."
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Ish vaqti</label>
                        <select
                            name="workTime"
                            className="w-full px-4 py-2 rounded-md bg-[#2A2D4A] focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        >
                            <option value="ONLINE">ONLINE</option>
                            <option value="OFFLINE">OFFLINE</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Darajangiz</label>
                        <select
                            name="level"
                            className="w-full px-4 py-2 rounded-md bg-[#2A2D4A] focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        >
                            <option value="JUNIOR">JUNIOR</option>
                            <option value="STRONG_JUNIOR">STRONG JUNIOR</option>
                            <option value="MIDDLE">MIDDLE</option>
                            <option value="STRONG_MIDDLE">STRONG MIDDLE</option>
                            <option value="SENIOR">SENIOR</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Oylik so‘rovi ($)</label>
                        <input
                            type="number"
                            name="salary"
                            className="w-full px-4 py-2 rounded-md bg-[#2A2D4A] focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            placeholder="1000"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Portfolio havolasi</label>
                        <input
                            type="url"
                            name="portfolioLink"
                            className="w-full px-4 py-2 rounded-md bg-[#2A2D4A] focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            placeholder="https://..."
                            required
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block mb-2 text-sm font-medium">CV/Resume yuklash</label>
                        <input
                            type="file"
                            id="resume"
                            name="resume"
                            className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0 file:text-sm file:font-semibold
                            file:bg-cyan-600 file:text-white hover:file:bg-cyan-700 cursor-pointer"
                            accept=".pdf,.doc,.docx"
                            required
                        />
                    </div>

                    <div className="sm:col-span-2 mt-4">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 rounded-md hover:opacity-90 transition"
                        >
                            Yuborish
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
