import React, {useState, useEffect} from 'react';
import {FaCalendarAlt, FaClock, FaTelegramPlane, FaInstagram, FaFacebookF, FaYoutube, FaWhatsapp} from "react-icons/fa";
import {IoMdClose} from "react-icons/io";
import {FaFileDownload} from "react-icons/fa";
import Header from '../components/layouts/header';
import Footer from '../components/layouts/footer';
import {useNavigate, useParams} from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

const jobData = {
    'motion-designer': {title: "Motion Designer", schedule: "Monday-Saturday", time: "09:00-18:00"},
    'ui-ux-designer': {title: "UI/UX Designer", schedule: "Monday-Friday", time: "10:00-17:00"},
    'graphic-designer': {title: "Graphic Designer", schedule: "Monday-Saturday", time: "08:00-16:00"},
    'frontend-developer': {title: "Frontend Developer", schedule: "Monday-Friday", time: "09:00-18:00"},
    'backend-developer': {title: "Backend Developer", schedule: "Monday-Friday", time: "10:00-19:00"},
    'project-manager': {title: "Project Manager", schedule: "Monday-Saturday", time: "09:00-17:00"},
    'data-analyst': {title: "Data Analyst", schedule: "Monday-Friday", time: "09:00-17:30"},
    'marketing-specialist': {title: "Marketing Specialist", schedule: "Monday-Saturday", time: "08:30-17:30"},
    'seo-expert': {title: "SEO Expert", schedule: "Monday-Friday", time: "09:00-18:00"},
};

const vacansy = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        workTime: '',
        level: '',
        salary: '',
        portfolioLink: '',
        resume: null,
    });

    const handleChange = (e) => {
        const {name, value, type, files} = e.target;
        if (type === 'file') {
            setFormData({...formData, [name]: files[0]});
        } else {
            setFormData({...formData, [name]: value});
        }
    };

    const handleFileChange = (e) => {
        setFormData({...formData, resume: e.target.files[0]});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.resume) {
            alert('Resume fayli tanlanmadi!');
            return;
        }

        const resumeFormData = new FormData();
        resumeFormData.append('file', formData.resume);

        try {
            const uploadRes = await axios.post(
                'https://ipro.javohir-dev.uz/api/attachments/upload',
                resumeFormData,
                {headers: {'Content-Type': 'multipart/form-data'}}
            );

            const resumeId = uploadRes.data;
            const careerData = {
                fullName: formData.fullName,
                phoneNumber: formData.phoneNumber,
                workTime: formData.workTime,
                level: formData.level,
                salary: parseFloat(formData.salary) || 0,
                portfolioLink: formData.portfolioLink,
                resume: resumeId
            };

            await axios.post('https://ipro.javohir-dev.uz/api/career', careerData);
            alert('Arizangiz muvaffaqiyatli yuborildi!');
        } catch (error) {
            console.error('Xatolik yuz berdi:', error);
            alert('Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.');
        }
    };
    const navigate =useNavigate();
    const {slug} = useParams();
    const vacansy = jobData[slug];
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        AOS.init({duration: 1000, once: true});
    }, []);

    if (!vacansy) {
        return (
            <>
                <Header/>
                <div className="text-white text-center mt-40 text-xl font-semibold">Job not found</div>
                <Footer/>
            </>
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
                            <h1 className='text-3xl sm:text-4xl font-extrabold text-white tracking-wide'>{vacansy.title}</h1>
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
                                    <span className='text-sm font-medium text-gray-200'>{vacansy.schedule}</span>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <FaClock className='text-cyan-400 text-xl'/>
                                    <span className='text-sm font-medium text-gray-200'>{vacansy.time}</span>
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

                {/* Qolgan form va modal kodlari shu yerga qo‘shiladi */}

                <section className='mt-20  container mx-auto px-6 sm:px-6 md:px-10 py-10 sm:py-16 md:py-20'
                         data-aos="fade-up">
                    <div className={'mx-3'}>
                        <h2 className='text-2xl font-bold mb-6 text-cyan-300'>Requirements</h2>
                        <ul className='list-disc list-inside space-y-2 text-gray-300'>
                            <li>Support and improvement of existing projects, as well as the introduction of new
                                functionality;
                            </li>
                            <li>Teamwork with other developers, QA testers, backend programmers and UI/UX designers.
                            </li>
                        </ul>
                    </div>

                    <div className='mt-10 mx-3'>
                        <h2 className='text-2xl font-bold mb-6 text-cyan-300'>Tasks</h2>
                        <ul className='list-disc list-inside space-y-2 text-gray-300'>
                            <li>Knowledge of the application structure of PWA(Progressive Web App), SPA(Single Page
                                Application), SSR(Server-Side Rendering), MF(Mutual Funds);
                            </li>
                            <li>Understanding the principles of SOLID, KISS, DRY.</li>
                            <li>More than 2 years of work experience.(active development for more than 1 year);</li>
                            <li>Knowledge of JavaScript and its basic concepts (prototypical inheritance, event loop,
                                closures, this keyword, etc.);
                            </li>
                            <li>Knowledge of modern methods of writing code in JavaScript and TypeScript;</li>
                            <li>Work experience with Vue.js 2.3, Pinia, Vue Router;</li>
                            <li>Ability to work with Axios and API;</li>
                            <li>Knowledge of Tailwind CSS and good layout skills;</li>
                            <li>Experience working with NPM/ Yarn for package management;</li>
                            <li>Experience working with project builders in Vue, Vue CLI, Webpack, Rollup;</li>
                            <li>Knowledge of Git, Shell Commands, Git Flow;</li>
                            <li>Experience working with Nuxt.js;</li>
                            <li>Willingness to constantly learn and explore new technologies.</li>
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

                {showModal && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4">
                        {/* Modal konteyner */}
                        <div className="relative bg-[#1E2238] rounded-xl shadow-xl w-full max-w-3xl overflow-y-auto max-h-[90vh] pt-3 px-6 pb-6">

                            {/* Yopish tugmasi – har doim modal ichidagi yuqori chap burchakda */}
                            <button
                                onClick={() => setShowModal(false)}
                                className="top-2 right-2 z-50 text-white hover:text-red-500 transition text-3xl"
                                aria-label="Yopish"
                            >
                                <IoMdClose />
                            </button>


                            <h2 className="text-2xl sm:text-3xl text-center font-bold text-white mb-6">Ariza
                                topshirish</h2>

                            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-white">
                                {/* Form fieldlar – to‘liq responsiv */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">To‘liq ism</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-md bg-[#2A2D4A] focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                        placeholder="Ismingiz"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-sm font-medium">Telefon raqam</label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-md bg-[#2A2D4A] focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                        placeholder="+998..."
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-sm font-medium">Ish vaqti</label>
                                    <select
                                        name="workTime"
                                        value={formData.workTime}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-md bg-[#2A2D4A] focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                        required
                                    >
                                        <option value="ONLINE">ONLINE</option>
                                        <option value="OFFLINE">OFFLINE</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-1 text-sm font-medium">Darajangiz</label>
                                    <select
                                        name="level"
                                        value={formData.level}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-md bg-[#2A2D4A] focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                        required
                                    >
                                        <option value="JUNIOR">JUNIOR</option>
                                        <option value="STRONG_JUNIOR">STRONG JUNIOR</option>
                                        <option value="MIDDLE">MIDDLE</option>
                                        <option value="STRONG_MIDDLE">STRONG MIDDLE</option>
                                        <option value="SENIOR">SENIOR</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-1 text-sm font-medium">Oylik so‘rovi ($)</label>
                                    <input
                                        type="number"
                                        name="salary"
                                        value={formData.salary}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-md bg-[#2A2D4A] focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                        placeholder="1000"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 text-sm font-medium">Portfolio havolasi</label>
                                    <input
                                        type="url"
                                        name="portfolioLink"
                                        value={formData.portfolioLink}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-md bg-[#2A2D4A] focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                        placeholder="https://..."
                                        required
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium">CV/Resume yuklash</label>
                                    <div className="flex items-center justify-center w-full">
                                        <label htmlFor="resume"
                                               className="flex gap-3 items-center cursor-pointer px-5 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md font-semibold transition">
                                            <FaFileDownload/>
                                            CV ni yuklang
                                        </label>
                                        <input
                                            type="file"
                                            id="resume"
                                            name="resume"
                                            className="hidden"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2 mt-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 rounded-md hover:opacity-90 transition"
                                    >
                                        Yuborish
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
};

export default vacansy;
