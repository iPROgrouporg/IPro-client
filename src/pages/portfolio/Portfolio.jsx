import React, { useEffect, useState } from 'react';
import Header from '../../components/layouts/header.jsx';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import AOS from 'aos';
import { motion } from "framer-motion";

import 'aos/dist/aos.css';
import { img_url, portfolioApi } from "../../connection/BaseUrl.js";
import { Loading } from '../../components/loading/Loading.jsx'; // Loading component import qilindi
import Footer from '../../components/layouts/footer.jsx';

const Portfolio = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [portfolio, setPortfolio] = useState({});
    const [loading, setLoading] = useState(true); // loading state qo‘shildi

    const getByTypeRandom = async () => {
        try {
            const res = await portfolioApi.getByTypeRandom();
            setPortfolio(res.data);
        } catch (err) {
            console.log("portfolio " + err);
            setPortfolio({});
        } finally {
            setLoading(false); // loading tugadi
        }
    }

    const handleNavigate = (category) => {
        navigate(`/projects/${category.toUpperCase()}`);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init({ duration: 1500 });
        getByTypeRandom();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <Loading />
            </div>
        );
    }

    return (
        <div>
            <Header />
            <main className='mt-20 relative z-10'>
                <section>
                    <div className="container mx-auto mb-10 px-5 xl:px-14">
                       <motion.h1
  data-aos="fade-up"
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="text-white text-center md:text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500 text-[42px] md:text-[80px] font-extrabold leading-[1.1] drop-shadow-[0_5px_30px_rgba(0,112,244,0.9)] mb-16"
>
  {t("projects").toUpperCase()}
</motion.h1>

                        {Object.entries(portfolio).map(([type, items], index) => (
                            items.length > 0 && (
                                <div
                                    key={type}
                                    data-aos="fade-up"
                                    data-aos-delay={`${index * 200}`}
                                    className="flex items-center justify-between mb-10 flex-col md:flex-row overflow-hidden rounded-2xl py-12 md:py-6 border border-blue-400/20 shadow-2xl md:px-10 transition-all duration-500"
                                >
                                    <div className="relative z-10">
                                        <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-4 text-center md:text-left">
                                            {t(type.toUpperCase())}
                                        </h1>
                                        <p className="text-sm md:text-base text-gray-300 mb-6 text-center md:text-left max-w-lg">
                                            {t("buttonText")}
                                        </p>
                                        <button
                                            onClick={() => handleNavigate(type)}
                                            className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-700 text-white py-3 px-6 uppercase text-xs font-bold shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-300"
                                        >
                                            {t("viewProjects")}
                                        </button>
                                    </div>

                                    <div
                                        className="grid grid-cols-1 sm:grid-cols-2 md:flex md:gap-0 md:-space-x-20 mt-8 md:mt-0 w-full md:w-auto gap-4 md:overflow-visible relative z-0"
                                    >
                                        {items.map((item, i) => (
                                            <div
                                                key={item.id}
                                                className="relative h-36 sm:h-40 md:h-[200px] w-full shadow-xl rounded-2xl transition-transform duration-500 cursor-pointer hover:z-20 hover:scale-[1.1] group"
                                                data-aos-delay={`${(index + i) * 100}`}
                                                onClick={() => navigate(`/project/${item.id}`)}
                                            >
                                                <img
                                                    src={`${img_url}${item.image}`}
                                                    alt={item.title}
                                                    className="h-full w-full object-cover rounded-2xl filter grayscale transition-all duration-500 group-hover:grayscale-0"
                                                />
                                                <div
                                                    className="absolute inset-0 bg-black bg-opacity-20 transition-all duration-300 rounded-2xl group-hover:bg-opacity-0"
                                                ></div>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            )
                        ))}
                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    );
};

export default Portfolio;