import React, {useEffect, useState} from 'react';
import Header from '../../components/layouts/header.jsx';
import Stars from "../../assets/images/stars.png";
import LefftStars from "../../assets/images/starsleft.png";
import {useNavigate} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import "../../i18.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {img_url, portfolioApi} from "../../connection/BaseUrl.js";

const Portfolio = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [portfolio, setPortfolio] = useState({});

    const getByTypeRandom = async () => {
        try {
            const res = await portfolioApi.getByTypeRandom()
            setPortfolio(res.data)
        } catch (err) {
            console.log("portfolio " + err)
        }
    }

    const handleNavigate = (category) => {
        navigate(`/projects/${category.toUpperCase()}`);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init({duration: 1500});
        getByTypeRandom()
    }, []);

    return (
        <div>
            <Header/>
            <main className='mt-20 relative z-10'>
                <section>
                    <div className="absolute right-0 -z-10 animate-pulse">
                        <img src={Stars} alt="" className="opacity-40"/>
                    </div>

                    <div className="container mx-auto mb-10 px-5 xl:px-14">
                        <h1
                            data-aos="fade-up"
                            className="text-transparent text-white bg-clip-text bg-gradient-to-r md:text-[96px] text-[40px] font-black ml-5 mb-10 text-center md:text-left drop-shadow-[0_5px_20px_rgba(0,112,244,0.8)]"
                        >
                            {t("projects")}
                        </h1>

                        {Object.entries(portfolio).map(([type, items], index) => (
                            items.length > 0 && (
                                <div
                                    key={type}
                                    data-aos="fade-up"
                                    data-aos-delay={`${index * 200}`}
                                    className="flex items-center justify-between mb-10 flex-col md:flex-row overflow-hidden rounded-2xl py-12 md:py-6 bg-gradient-to-r from-[#1f2235] to-[#16182B] shadow-2xl md:px-10 transition-all duration-500"
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
                                        className="grid grid-cols-1 sm:grid-cols-2 md:flex md:gap-0 md:-space-x-20 mt-8 md:mt-0 w-full md:w-auto gap-4 md:overflow-visible relative z-0">
                                        {items.map((item, i) => (
                                            <div
                                                key={item.id}
                                                className="relative h-36 sm:h-40 md:h-[200px] w-full shadow-xl rounded-2xl transition-transform duration-500 cursor-pointer hover:z-20 hover:scale-[1.1] group"
                                                data-aos-delay={`${(index + i) * 100}`}
                                                onClick={()=>navigate(`/project/${item.id}`)}
                                            >
                                                <img
                                                    src={`${img_url}${item.image}`}
                                                    alt={item.title}
                                                    className="h-full w-full object-cover rounded-2xl"
                                                />
                                                <div
                                                    className="absolute inset-0 bg-black bg-opacity-40 transition-all duration-300 rounded-2xl group-hover:bg-opacity-0"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}

                        <div className="absolute left-0 top-[500px] -z-10 animate-fade-in">
                            <img src={LefftStars} alt="" className="opacity-40"/>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Portfolio;
