import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from '../../components/layouts/header.jsx';
import Footer from '../../components/layouts/footer.jsx';
import { img_url, portfolioApi } from "../../connection/BaseUrl.js";
import { Loading } from '../../components/loading/Loading.jsx'; // Loading component

const ProjectsPage = () => {
    const { category } = useParams();
    const [portfolio, setPortfolio] = useState([]);
    const [loading, setLoading] = useState(true); // loading state
    const navigate = useNavigate();

    const getByTypeAll = async () => {
        try {
            const res = await portfolioApi.getByType(category);
            setPortfolio(res.data);
        } catch (err) {
            console.log("error bu type " + err);
            setPortfolio([]);
        } finally {
            setLoading(false); // loading tugadi
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init({ duration: 800, once: true });
        setLoading(true);
        getByTypeAll();
    }, [category]);

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
            <main className="mt-24 px-5 xl:px-16 container mx-auto mb-16">
                <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-12 uppercase tracking-widest bg-gradient-to-r from-blue-400 via-sky-300 to-blue-100 bg-clip-text text-transparent">
                    {category}
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {portfolio.map((item, i) => (
                        <div
                            key={i}
                            onClick={() => navigate(`/project/${item.id}`)}
                            data-aos="fade-up"
                            data-aos-delay={i * 100}
                            className="rounded-2xl overflow-hidden shadow-lg bg-[#10121B] hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.03] cursor-pointer"
                        >
                            <img
                                src={`${img_url}${item.image}`}
                                alt={`Project ${i + 1}`}
                                className="w-full h-52 object-cover transition-transform duration-500 hover:scale-105"
                            />
                            <div className="p-5">
                                <h3 className="text-blue-400 text-xl font-semibold mb-2 tracking-wide">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-snug">
                                    {item.info.length > 42 ? item.info.slice(0, 42) + "..." : item.info}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <Footer/>
        </>
    );
};

export default ProjectsPage;