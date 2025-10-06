import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../../components/layouts/header.jsx";
import {vacancyApi} from "../../connection/BaseUrl.js";
import AOS from "aos";
import Footer from "../../components/layouts/footer.jsx";
import {
    FaCalendarAlt,
    FaClock,
    FaFacebookF,
    FaInstagram,
    FaTelegramPlane,
    FaWhatsapp,
    FaYoutube
} from "react-icons/fa";
import {VacancyForms} from "../../components/forms/vacancyForms/VacancyForms.jsx";

export const VacancyItem = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const {id} = useParams();
    const [vacancy, setVacancy] = useState(null);
    const [loading, setLoading] = useState(true)

    const getOneVacancy = async () => {
        try {
            const res = await vacancyApi.getOne(id);
            setVacancy(res.data);
        } catch (err) {
            console.error("getOne vacancy error:", err);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        AOS.init({duration: 1000, once: true});
        window.scrollTo(0, 0);
        getOneVacancy();
    }, [id]);

    if (!vacancy) {
        return (
            <>
                <Header/>
                <div className="text-white text-center mt-40 text-xl font-semibold">Job not found</div>
                <Footer/>
            </>
        );
    }
    if (loading) {
        return (
            <div className="text-white text-center mt-20">
                <h1 className="text-2xl">Loading...</h1>
            </div>
        );
    }

    return (
        <>
            <Header/>
            <main className='overflow-hidden bg-gradient-to-brfrom-[#0D1128] to-[#1C1F3A] text-white font-sans'>
                <section className='mt-20 sm:mt-28 md:mt-40  container mx-auto px-4 sm:px-8 md:px-12'>
                    <div
                        className="bg-blue-400/10 backdrop-blur-lg border border-blue-500/20 rounded-2xl shadow-2xl p-6 md:p-10 transition-all duration-500"
                        data-aos="zoom-in"
                    >
                        <div className='flex flex-col md:flex-row justify-between items-center mb-6'>
                            <h1 className='text-3xl sm:text-4xl font-extrabold text-white tracking-wide'>{vacancy.title.toUpperCase()}</h1>
                            <button
                                onClick={() => setShowModal(true)}
                                className='mt-4 md:mt-0 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-2 px-6 rounded-lg hover:opacity-90 transition w-full sm:w-auto'
                            >
                                Jamoaga Qushilish
                            </button>
                        </div>

                        <div className='flex flex-col md:flex-row justify-between gap-6'>
                            <div className='flex flex-col sm:flex-row gap-6 items-start'>
                                <div className='flex items-center gap-3'>
                                    <FaCalendarAlt className='text-cyan-400 text-xl'/>
                                    <span
                                        className='text-sm font-medium text-gray-200'>{vacancy.startWeekday} - {vacancy.endWeekday}</span>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <FaClock className='text-cyan-400 text-xl'/>
                                    <span
                                        className='text-sm font-medium text-gray-200'>{vacancy.startTime.substring(0, 5)} - {vacancy.endTime.substring(0, 5)}</span>
                                </div>
                            </div>

                            <div className='flex gap-4 text-xl'>
                                <FaTelegramPlane className="hover:text-blue-400 cursor-pointer transition"/>
                                <FaInstagram className="hover:text-pink-500 cursor-pointer transition"/>
                                <FaFacebookF className="hover:text-blue-600 cursor-pointer transition"/>
                                <FaYoutube className="hover:text-red-500 cursor-pointer transition"/>
                                <FaWhatsapp className="hover:text-green-500 cursor-pointer transition"/>
                            </div>
                        </div>
                    </div>
                </section>


                <section className='mt-5  container mx-auto px-6 sm:px-6 md:px-10 py-10 sm:py-16 md:py-20'
                         data-aos="fade-up">
                    <div className='mx-3'>
                        <h2 className='text-2xl font-bold mb-6 text-cyan-300'>Requirements</h2>
                        <ul className='list-disc list-inside space-y-2 text-gray-300'>
                            {vacancy.requirements &&
                                vacancy.requirements
                                    .split('\n')
                                    .map(req => req.trim())
                                    .filter(req => req.length > 0) // bo‘sh satrlarni olib tashlaydi
                                    .map((req, index) => <li key={index}>{req}</li>)}
                        </ul>
                    </div>

                    <div className='mt-10 mx-3'>
                        <h2 className='text-2xl font-bold mb-6 text-cyan-300'>Tasks</h2>
                        <ul className='list-disc list-inside space-y-2 text-gray-300'>
                            {vacancy.tasks &&
                                vacancy.tasks
                                    .split('\n')
                                    .map(task => task.trim())
                                    .filter(task => task.length > 0)
                                    .map((task, index) => <li key={index}>{task}</li>)}
                        </ul>
                    </div>


                    <div className="text-center mt-10 ">
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition"
                        >
                            Ortga qaytish
                        </button>
                    </div>
                </section>
                {showModal && <VacancyForms setShowModal={setShowModal}/>}
            </main>
        </>

    );
};
