import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Footer from '../../components/layouts/footer.jsx';
import Header from '../../components/layouts/header.jsx';
import { Loading } from '../../components/loading/Loading.jsx';
import { portfolioOtzivApi } from "../../connection/BaseUrl.js";

const ProjectInfo = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [portfolioOtziv, setPortfolioOtziv] = useState([]);
    const [loading, setLoading] = useState(true);

    const getOneServices = async () => {
        try {
            const res = await portfolioOtzivApi.getOne(id);
            setPortfolioOtziv(res.data || []);
        } catch (err) {
            console.log("portfolio otziv error", err);
            setPortfolioOtziv([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOneServices();
    }, [id]);

    if (loading) {
        return (
            <div className="text-white flex justify-center items-center h-[60vh]">
               <Loading />
            </div>
        );
    }

    if (!portfolioOtziv || portfolioOtziv.length === 0) {
        return (
            <div className="text-white text-center mt-20">
                <h1 className="text-3xl font-bold">Otzivlar topilmadi</h1>
            </div>
        );
    }

    return (
        <>
        <Header/>
        <div className=" mt-8 w-full px-4 md:px-10 lg:px-20 py-20 bg-gradient-to-b from-[#0F172A] to-[#020617] text-white">
            
            {/* Page Title */}
            <h1 className=" text-3xl md:text-5xl font-extrabold text-center mb-16 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-transparent bg-clip-text">
                Portfolio Otzivlar
            </h1>

            {/* Portfolio Items */}
            <div className="flex flex-col gap-20">
                {portfolioOtziv.map((item, index) => {
                    const isReverse = index % 2 !== 0;

                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className={`flex flex-col md:flex-row items-center gap-10 ${isReverse ? "md:flex-row-reverse" : ""}`}
                        >
                            {/* Image */}
                            <div className="w-full md:w-1/2 relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 blur-xl opacity-20 group-hover:opacity-40 transition rounded-[1.5rem]"></div>
                                <img
                                    src={item.image ? `http://localhost:2025/api/v1/files/image/${item.image}` : "https://via.placeholder.com/600x400"}
                                    alt={item.title || "Portfolio Image"}
                                    className="relative rounded-[1.5rem] w-full h-[250px] md:h-[350px] object-cover shadow-2xl transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>

                            {/* Info */}
                            <div className="w-full md:w-1/2 flex flex-col gap-4 max-h-[350px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-gray-800">
                                <h4 className="text-lg md:text-xl font-semibold text-white leading-snug break-words">
                                    {item.info || "Loyiha nomi"}
                                </h4>
                                {item.description && (
                                    <p className="text-gray-300 text-sm md:text-base leading-relaxed break-words">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Back to Top Button */}
            <div className="flex justify-center mt-20">
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-semibold hover:scale-105 transition"
                >
                    Orqaga qaytish
                </button>
            </div>
        </div>
        <Footer/>
        </>

    );
};

export default ProjectInfo;