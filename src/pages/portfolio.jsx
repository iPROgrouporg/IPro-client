import React, { useEffect } from 'react';
import KranPortfolio from "../assets/images/kranPortfolio.png";
import Header from '../components/layouts/header';
import Stars from "../assets/images/stars.png";
import LefftStars from "../assets/images/starsleft.png";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import "../i18";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Portfolio = () => {
    const { t } = useTranslation();

    const projectsData = [
        { title: 'websites', description: 'mobileApps' },
        { title: 'mobile', description: 'mobileApps' },
        { title: 'smm', description: 'socialMedia' },
        { title: 'marketing', description: 'dataDriven' },
        { title: 'target', description: 'laserTargeting' },
        { title: 'graphicDesign', description: 'creativeDesigns' },
    ];

    const navigate = useNavigate();

    const handleNavigate = (category) => {
        navigate(`/projects/${category.toLowerCase()}`);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        AOS.init({ duration: 1500 });
    }, []);

    return (
        <>
            <Header />
            <main className='mt-20 relative z-10'>
                <section>
                    <div className="absolute right-0 -z-10 animate-pulse">
                        <img src={Stars} alt="" className="opacity-40" />
                    </div>

                    <div className="container mx-auto mb-10 px-5 xl:px-14">
                        <h1
                            data-aos="fade-up"
                            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 md:text-[96px] text-[40px] font-black ml-5 mb-10 text-center md:text-left drop-shadow-[0_5px_20px_rgba(0,112,244,0.8)]"
                        >
                            {t("projects")}
                        </h1>

                        {projectsData.map((project, index) => (
                            <div
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={`${index * 250}`}
                                className="flex items-center justify-between mb-10 flex-col md:flex-row overflow-hidden rounded-2xl py-12 md:py-6 bg-gradient-to-r from-[#1f2235] to-[#16182B] shadow-2xl md:px-10 transition-all duration-500"
                            >
                                {/* Matn qismi */}
                                <div className="relative z-10">
                                    <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-4 text-center md:text-left">
                                        {t(project.title)}
                                    </h1>
                                    <p className="text-sm md:text-base text-gray-300 mb-6 text-center md:text-left max-w-lg">
                                        {t(project.description)}<br />{t("buttonText")}
                                    </p>
                                    <button
                                        onClick={() => handleNavigate(t(project.title))}
                                        className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-700 text-white py-3 px-6 uppercase text-xs font-bold shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300"
                                    >
                                        {t("viewProjects")}
                                    </button>
                                </div>

                                {/* Rasmlar qismi */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:gap-0 md:-space-x-20 mt-8 md:mt-0 w-full md:w-auto gap-4 md:overflow-visible relative z-0">
                                    {[1, 2, 3, 4, 5].map((_, i) => (
                                        <div
                                            key={i}
                                            className="relative h-36 sm:h-40 md:h-[200px] w-full shadow-xl rounded-2xl
                                                       transition-transform duration-500 cursor-pointer
                                                       hover:z-20 hover:scale-[1.1] group"
                                            data-aos-delay={`${(index + i) * 150}`}
                                        >
                                            {/* Rasm */}
                                            <img
                                                src={KranPortfolio}
                                                className="h-full w-full object-cover rounded-2xl"
                                                alt={`${t(project.title)} ${i}`}
                                            />
                                            {/* Overlay */}
                                            <div
                                                className="absolute inset-0 bg-black bg-opacity-40
                                                           transition-all duration-300 rounded-2xl
                                                           group-hover:bg-opacity-0"
                                            ></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className="absolute left-0 top-[500px] -z-10 animate-fade-in">
                            <img src={LefftStars} alt="" className="opacity-40" />
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Portfolio;
