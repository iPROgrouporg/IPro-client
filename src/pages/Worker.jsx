import React, {useEffect} from "react";
import {motion} from "framer-motion";
import Aos from "aos";
import "aos/dist/aos.css";
import {useTranslation} from "react-i18next";

export const Worker = () => {
    const {t} = useTranslation();
    useEffect(() => {
        Aos.init({once: true});
    }, []);

    return (
        <section className="relative z-10 bg-gradient-to-br from-[#0A0F1F] via-[#0E1628] to-[#111B30] py-32 px-4">
            <div className="container mx-auto max-w-4xl">
                <motion.h2
                    initial={{opacity: 0, y: -40}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1}}
                    className="text-center text-white text-[42px] md:text-[64px] font-extrabold leading-[1.2] drop-shadow-[0_5px_30px_rgba(0,112,244,0.8)] mb-12"
                >
                    {t('jointeam')}
                </motion.h2>


                <motion.p
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.3, duration: 1}}
                    className="text-center text-gray-300 text-lg mb-10 max-w-2xl mx-auto"
                >
                    {t('searchworker')}
                </motion.p>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        {
                            label: `${t("fio")}`,
                            type: "text",
                            placeholder: `${t("fioples")}`,
                            delay: 0.4,
                        },
                        {
                            label: `${t("tel")}`,
                            type: "tel",
                            placeholder: "991234567",
                            maxLength: 9,
                            pattern: "[0-9]{9}",
                            onInput: (e) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 9);
                            },
                            delay: 0.5,
                        },
                        {
                            label: `${t("yunalish")}`,
                            type: "text",
                            placeholder: "Frontend, Backend, Design...",
                            delay: 0.2,
                        },
                        {
                            label: `${t("daraja")}`,
                            type: "select",
                            options: ["Junior", "Middle", "Senior"],
                            delay: 0.3,
                        },
                        {
                            label: `${t("url")}`,
                            type: "url",
                            placeholder: "https://portfolio.com",
                            delay: 0.4,
                        },
                        {
                            label: `${t("narx")}`,
                            type: "number",
                            placeholder: "1000000",
                            delay: 0.5,
                        },
                    ].map((field, i) => (
                        <motion.div
                            key={i}
                            initial={{opacity: 0, y: 30}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, delay: field.delay}}
                            viewport={{once: true}}
                        >
                            <label className="block mb-2 text-sm font-medium text-gray-300">
                                {field.label}
                            </label>
                            {field.type === "select" ? (
                                <select
                                    className="w-full appearance-none bg-[#11152A] border border-blue-700 rounded-lg px-4 py-[14px] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="" disabled selected>{t('select_department')}</option>
                                    {field.options.map((opt) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    onInput={field.onInput}
                                    className="w-full bg-[#11152A] border border-blue-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            )}
                        </motion.div>
                    ))}
                </form>

                <motion.div
                    initial={{opacity: 0, scale: 0.9}}
                    whileInView={{opacity: 1, scale: 1}}
                    transition={{delay: 0.8, duration: 0.6}}
                    viewport={{once: true}}
                    className="mt-12 flex justify-center"
                >
                    <button
                        className="px-10 py-3 text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg shadow-[0_0_25px_5px_rgba(0,122,255,0.5)] hover:shadow-[0_0_35px_10px_rgba(0,122,255,0.7)] hover:scale-105 transition-all duration-300">
                        {t('yuborish')}
                    </button>
                </motion.div>
            </div>
        </section>
    );
};
