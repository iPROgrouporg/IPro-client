import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layouts/header.jsx';
import { useTranslation } from "react-i18next";
import "../../i18.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { img_url, servicesApi } from "../../connection/BaseUrl.js";
import { motion } from "framer-motion";
import { Loading } from '../../components/loading/Loading.jsx'; // Loading component
import Footer from '../../components/layouts/footer.jsx';

const Services = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true); // loading state

    const getAll = async () => {
        try {
            const res = await servicesApi.getAll();
            setServices(res.data || []);
        } catch (err) {
            console.log("services error", err);
            setServices([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        AOS.init({ duration: 1500 });
        window.scrollTo(0, 0);
        setLoading(true);
        getAll();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <Loading />
            </div>
        );
    }

    return (
        <>
            <Header/>
            <main className="mt-20 px-5 xl:px-14 container mx-auto">
                <motion.h1
                  data-aos="fade-up"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="text-white text-center md:text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500 text-[42px] md:text-[80px] font-extrabold leading-[1.1] drop-shadow-[0_5px_30px_rgba(0,112,244,0.9)] mb-16"
                >
                  {t("services").toUpperCase()}
                </motion.h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            data-aos="zoom-in-up"
                            data-aos-delay={index * 100}
                            onClick={() => service.active && navigate(`/services-info/${service.id}`)}
                            whileHover={service.active ? { scale: 1.03 } : {}}
                            className={`relative bg-[#0f111c] backdrop-blur-sm border border-[#1e2638] 
                                rounded-2xl overflow-hidden transform transition-all duration-500 
                                ${service.active ? 'cursor-pointer hover:border-[#3b82f6] hover:shadow-[0_15px_40px_rgba(0,180,255,0.3)] hover:-translate-y-2' : 'cursor-not-allowed'}
                            `}
                        >
                            <img
                                src={`${img_url}${service.image}`}
                                alt={t(service.title)}
                                className="w-full h-44 object-cover rounded-t-2xl"
                            />

                            {!service.active && (
                                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.8}
                                        stroke="white"
                                        className="w-12 h-12 mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16 10V7a4 4 0 00-8 0v3m-2 0h12a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2z"
                                        />
                                    </svg>
                                    <p className="text-gray-300 text-sm">Ushbu xizmat hozirda faol emas</p>
                                </div>
                            )}

                            <div className="p-5 relative z-10">
                                <h2 className="text-blue-400 text-xl font-semibold mb-2 tracking-wide">
                                    {t(service.title.toUpperCase())}
                                </h2>
                                <p className="text-gray-400 text-sm">
                                    {t(
                                        service.description.length > 32
                                            ? service.description.slice(0, 32) + "..."
                                            : service.description
                                    )}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
            <Footer/>
        </>
    );
};

export default Services;