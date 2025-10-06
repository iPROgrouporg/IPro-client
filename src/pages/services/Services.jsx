import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from '../../components/layouts/header.jsx';
import {useTranslation} from "react-i18next";
import "../../i18.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {img_url, servicesApi} from "../../connection/BaseUrl.js";


const Services = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [services, setServices] = useState([])


    const getAll = async () => {
        try {
            const res = await servicesApi.getAll()
            setServices(res.data)
            console.log(res.data)
        } catch (err) {
            console.log("vacancy error" + err)
        }
    }

    useEffect(() => {
        AOS.init({duration: 1500});
        window.scrollTo(0, 0);
        getAll()
    }, []);

    return (
        <>
            <Header/>
            <main className="mt-20 px-5 xl:px-14 container mx-auto">
                <h1
                    data-aos="fade-up"
                    className="text-center md:text-left text-[42px] md:text-[96px] font-extrabold tracking-tight uppercase mb-16
             text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-500 to-indigo-700 drop-shadow-[0_10px_20px_rgba(0,115,255,0.5)]"
                >
                    {t("services")}
                </h1>


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            data-aos="zoom-in-up"
                            data-aos-delay={index * 100}
                            className="bg-[#0f111c] backdrop-blur-sm border border-[#1e2638] hover:border-[#3b82f6] hover:shadow-[0_15px_40px_rgba(0,180,255,0.3)] rounded-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                            onClick={() => service.active && navigate(`/services-info/${service.id}`)}

                        >
                            <img src={`${img_url}${service.image}`}
                                 alt={t(service.title)}
                                 className="w-full h-44 object-cover rounded-t-2xl"/>
                            <div className="p-5">
                                <h2 className="text-blue-400 text-xl font-semibold mb-2 tracking-wide">{t(service.title.toUpperCase())}</h2>
                                <p className="text-gray-400 text-sm">
                                    {t(
                                        service.description.length > 32
                                            ? service.description.slice(0, 32) + "..."
                                            : service.description
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
};

export default Services;
