"use client";

import {useState, useEffect} from "react";
import {motion} from "framer-motion";

const slides = [
    {
        title: "Biz bilan kelajak sari!",
        description: "Innovatsion texnologiyalar orqali biznesingizni yangi bosqichga olib chiqing.",
        button: "Bog'lanish",
    },
    {
        title: "Brending va Marketing",
        description: "Brending, dizayn va raqamli marketingda professional yechimlar.",
        button: "Xizmatlar",
    },
    {
        title: "Mobil ilovalar yaratamiz",
        description: "iOS va Android uchun funksional, zamonaviy ilovalar.",
        button: "Portfolio",
    },
    {
        title: "Websaytlar yaratishda yetakchimiz",
        description: "Foydalanuvchiga qulay, tezkor va SEO ga mos websaytlar.",
        button: "Biz haqimizda",
    },
];

const Primary = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#0A0F1F] via-[#0E1628] to-[#111B30]">
            {slides.map((slide, index) => (
                <motion.div
                    key={index}
                    initial={{opacity: 0, scale: 1.05}}
                    animate={{opacity: current === index ? 1 : 0, scale: current === index ? 1 : 1.03}}
                    transition={{duration: 1.2}}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                        current === index ? "z-10" : "z-0"
                    }`}
                >
                    <div
                        className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 bg-black/30 backdrop-blur-sm">
                        <motion.h2
                            initial={{y: 40, opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            transition={{delay: 0.3}}
                            className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-4 text-white drop-shadow-[0_5px_30px_rgba(0,112,244,0.8)]"
                        >
                            {slide.title}
                        </motion.h2>
                        <motion.p
                            initial={{y: 30, opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            transition={{delay: 0.5}}
                            className="text-base sm:text-lg md:text-xl max-w-2xl text-gray-300 mb-6"
                        >
                            {slide.description}
                        </motion.p>
                        <motion.button
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.8}}
                            className="px-8 py-3 text-sm sm:text-base font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full shadow-[0_0_25px_5px_rgba(0,122,255,0.5)] hover:shadow-[0_0_35px_10px_rgba(0,122,255,0.7)] hover:scale-105 transition-all duration-300"
                        >
                            {slide.button}
                        </motion.button>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Primary;