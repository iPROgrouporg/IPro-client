import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Header from '../../components/layouts/header.jsx';
import Footer from '../../components/layouts/footer.jsx';
import BgImgService from "../../assets/images/bgimgservice.png"
import {FaDownload} from 'react-icons/fa';
import {img_url, servicesApi} from "../../connection/BaseUrl.js";

const ServicesItem = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [services, setServices] = useState(null)
    const [randomServices, setRandomServices] = useState([])
    const [loading, setLoading] = useState(true)


    const getOneServices = async () => {
        try {
            const res = await servicesApi.getOne(id)
            setServices(res.data)
            console.log("sasasa" + res.data)
        } catch (err) {
            console.log("services error" + err)
        } finally {
            setLoading(false)
        }
    }
    const getRandomServices = async () => {
        try {
            const res = await servicesApi.getAll();
            const all = res.data;
            const randomSix = all
                .filter(s => s.id !== Number(id))
                .sort(() => 0.5 - Math.random())
                .slice(0, 6);
            setRandomServices(randomSix);
        } catch (err) {
            console.error("random services error", err);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        getOneServices();
        getRandomServices();

    }, [id]);

    if (loading) {
        return (
            <div className="text-white text-center mt-20">
                <h1 className="text-2xl">Loading...</h1>
            </div>
        );
    }

    if (!services) {
        return (
            <div className="text-white text-center mt-20">
                <h1 className="text-3xl font-bold">Service Not Found</h1>
            </div>
        );
    }
    return (
        <>
            <Header/>
            <main className='mt-32 mb-20 px-4 sm:px-6 lg:px-20 container mx-auto'>
                <div className='flex justify-between  flex-col-reverse lg:flex-row items-center gap-8 lg:gap-14 relative'>
                    {/* Text */}
                    <div className="text-center  lg:text-left" data-aos="fade-up" data-aos-duration="800">
                        <h1 className='text-white text-4xl sm:text-5xl lg:text-[72px] font-black mb-6 drop-shadow-[0_5px_20px_rgba(0,112,244,0.8)] bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-transparent bg-clip-text'>
                            {services.title.toUpperCase()}
                        </h1>
                        <p className="text-gray-300 text-base sm:text-lg max-w-3xl leading-relaxed">
                            {services.description}
                        </p>

                        <div className="mt-8  flex gap-5 justify-center lg:justify-start">
                            <button
                                className="group  relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-blue-600 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-300 ease-in-out">
                                  <span className="flex items-center gap-2">
                                     <FaDownload
                                         className="group-hover:translate-y-1 transition-transform duration-300"/> Yuklab olish
                                  </span>
                            </button>
                            <button
                                className="group  relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-blue-600 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-300 ease-in-out">
                                  <span className="flex items-center gap-2">
                                     <FaDownload
                                         className="group-hover:translate-y-1 transition-transform duration-300"/> Buyurtma berish
                                  </span>
                            </button>
                        </div>
                    </div>

                    {/* Image  */}
                    <div className='w-full lg:w-1/2 relative' data-aos="zoom-in">
                        <img
                            src={BgImgService}
                            alt=""
                            className='absolute -top-10 md:-right-10 sm:right-0 h-full w-full -z-10 opacity-10'
                        />
                        <img
                            src={`${img_url}${services.image}`}
                            alt={services.title}
                            className="md:w-full md:h-full object-cover shadow-xl rounded-xl"
                        />
                    </div>
                </div>

                <h2 className='text-white text-2xl sm:text-3xl font-bold mt-20 mb-6 text-center lg:text-left'
                    data-aos="fade-up">
                    Example Projects
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {
                        randomServices.map((ser, i) => (
                            <div
                                key={ser.id}
                                className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-xl shadow-lg overflow-hidden hover:scale-[1.03] transition-transform duration-300 cursor-pointer"
                                data-aos="flip-up"
                                data-aos-delay={i * 100}
                            >
                                <img
                                    src={`${img_url}${ser.image}`}
                                    onClick={() => navigate(`/services-info/${ser.id}`)}
                                    alt={`Project ${i + 1}`}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-white font-semibold text-base">{ser.title.toUpperCase()}</h3>
                                    <p className="text-gray-400 text-sm mt-1">{
                                        ser.description.length > 28
                                            ? ser.description.slice(0, 28) + "..."
                                            : ser.description
                                    }</p>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </main>
        </>
    );
};

export default ServicesItem;