import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {FaCalendarAlt, FaClock} from "react-icons/fa";
import Header from '../../components/layouts/header.jsx';
import {useTranslation} from "react-i18next";
import "../../i18.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {motion} from "framer-motion";
import {vacancyApi} from "../../connection/BaseUrl.js";

const Vacancy = () => {
    const [visibleJobs, setVisibleJobs] = useState(6);
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [vacancy, setVacancy] = useState([])

    const getAll = async () => {
        try {
            const res = await vacancyApi.getAll()
            setVacancy(res.data)
            console.log(res.data)
        } catch (err) {
            console.log("vacancy error" + err)
        }
    }

    const showMoreJobs = () => setVisibleJobs((prev) => prev + 6);
    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init({duration: 1500});
        getAll()
    }, []);

    return (
        <>
            <Header/>
            <main
                className="bg-gradient-to-br from-[#0A0F1F] via-[#0E1628] to-[#111B30] text-white min-h-screen pt-28 sm:pt-36">

                <section className="relative z-10 py-10 px-4 sm:px-8 md:px-10">
                    <div className="container mx-auto px-5 xl:px-0">
                        <motion.h1
                            initial={{opacity: 0, y: -50}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 1}}
                            className=" text-white text-center md:text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500 text-[42px] md:text-[80px] font-extrabold leading-[1.1] drop-shadow-[0_5px_30px_rgba(0,112,244,0.9)] mb-16"
                        >
                            {t("vacansy")}
                        </motion.h1>

                        <motion.div
                            initial={{scale: 0.95, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            transition={{duration: 1, delay: 0.3}}

                            className="flex flex-col items-center"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
                                {vacancy.slice(0, visibleJobs).map((job, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{opacity: 0, y: 40}}
                                        whileInView={{opacity: 1, y: 0}}
                                        whileHover={job.active ? {scale: 1.05} : {}}
                                        transition={{duration: 0.1, delay: index * 0.15}}
                                        viewport={{once: true}}
                                        onClick={() => job.active && navigate(`/vacancy-info/${job.id}`)}
                                        className={`relative overflow-hidden bg-blue-400/10 backdrop-blur-lg border border-blue-500/20 text-white p-6 rounded-2xl shadow-md transition-all duration-300 group ${
                                            job.active
                                                ? "cursor-pointer hover:-translate-y-1 hover:bg-blue-500/20 hover:ring-2 hover:ring-blue-400/60"
                                                : "cursor-not-allowed"
                                        }`}
                                    >
                                        {!job.active && (
                                            <div
                                                className="absolute inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center rounded-2xl z-20">
                                                <motion.div
                                                    initial={{scale: 0, opacity: 0}}
                                                    animate={{scale: 1, opacity: 1}}
                                                    transition={{duration: 0.4}}
                                                    className="flex flex-col items-center gap-3"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.8}
                                                        stroke="white"
                                                        className="w-14 h-14 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M16 10V7a4 4 0 00-8 0v3m-2 0h12a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2z"
                                                        />
                                                    </svg>
                                                    <p className="text-sm text-gray-300">Hozirda ushbu vakansiya yopilgan</p>
                                                </motion.div>
                                            </div>
                                        )}

                                        <h2 className="text-xl font-semibold group-hover:text-blue-300 transition mb-2 z-10 relative">
                                            {job.title.toUpperCase()}
                                        </h2>
                                        <hr className="my-2 border-gray-600/30 z-10 relative"/>

                                        <div className="flex flex-wrap gap-6 mt-3 z-10 relative">
                                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                                <FaCalendarAlt className="text-blue-400"/>
                                                <span>{job.startWeekday} - {job.endWeekday}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                                <FaClock className="text-blue-400"/>
                                                <span>{job.startTime.substring(0,5)} - {job.endTime.substring(0,5)}</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-center mt-6 z-10 relative">
                                            <motion.button
                                                whileHover={job.active ? {scale: 1.05} : {}}
                                                disabled={!job.active}
                                                className={`px-6 py-2 font-bold rounded-md transition-all duration-300 ${
                                                    job.active
                                                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(0,122,255,0.6)] hover:shadow-[0_0_30px_rgba(0,122,255,0.9)]"
                                                        : "bg-gray-600/40 text-gray-300 cursor-not-allowed"
                                                }`}
                                            >
                                                {job.active ? t("applynow") : t("closed")}
                                            </motion.button>
                                        </div>
                                    </motion.div>

                                ))}
                            </div>

                            {visibleJobs < vacancy.length && (
                                <motion.button
                                    initial={{opacity: 0, y: 30}}
                                    whileInView={{opacity: 1, y: 0}}
                                    transition={{duration: 0.8, delay: 1}}
                                    onClick={showMoreJobs}
                                    className="mt-16 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-md shadow-[0_0_25px_rgba(0,122,255,0.6)] hover:scale-105 transition-all duration-300"
                                >
                                    {t("show_more")}
                                </motion.button>
                            )}
                        </motion.div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Vacancy;
