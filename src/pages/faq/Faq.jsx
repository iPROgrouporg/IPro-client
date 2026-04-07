import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { FaPlus, FaMinus } from 'react-icons/fa';
import ContactWithMap from '../../components/ui/contactwithmap.jsx';
import { supportApi } from "../../connection/BaseUrl.js";

const faqs = [ { question: 'technical_issue_details', answer: 'technical_issue_details', }, { question: 'project_duration', answer: 'project_duration_details', }, { question: "refund_policy", answer: 'refund_policy_details', }, { question: "refund_policy", answer: 'refund_policy_details', }, { question: 'project_duration', answer: 'project_duration_details', }, { question: "refund_policy", answer: 'refund_policy_details', }, { question: "refund_policy", answer: 'refund_policy_details', }, ];

const Faq = ({ t, StarsRightImg, IproIMage }) => {
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("+998");
    const [description, setDescription] = useState("");

    const [errors, setErrors] = useState({});
    const [openIndex, setOpenIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState("");

    // Accordion
    const toggleAccordion = (index) => setOpenIndex(prev => (prev === index ? null : index));

    // Modal
    const openModal = (issue) => { setSelectedIssue(issue); setIsModalOpen(true); };
    const closeModal = () => { setIsModalOpen(false); setSelectedIssue(""); setErrors({}); };

    // Validation
    const validate = () => {
        const newErrors = {};
        if (!fullName.trim()) newErrors.fullName = t("required_name");
        if (!phoneNumber || phoneNumber.length < 13) newErrors.phoneNumber = t("required_phone");
        if (!description.trim()) newErrors.description = t("required_description");
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Send data
    const send = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const data = { fullName, phoneNumber, description, issue: selectedIssue };
            const res = await supportApi.send(data);
            console.log("Yuborildi:", res.data);

            setFullName("");
            setPhoneNumber("+998");
            setDescription("");
            closeModal();
        } catch (err) {
            console.log("Xatolik:", err);
        }
    };

    return (
        <section className="relative w-full pt-[90px] mb-10 overflow-hidden">
            {/* Decorative stars */}
            <div className="relative -z-10 top-[800px]">
                <img className="absolute hidden md:flex bottom-0 -right-10" src={StarsRightImg} alt="" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 md:px-10">
                <h1 className="text-3xl text-white sm:text-5xl md:text-[80px] text-center md:text-left font-black leading-[0.95] mb-10 bg-gradient-to-r text-transparent bg-clip-text drop-shadow-[0_5px_20px_rgba(0,112,244,0.8)]" data-aos="fade-up">
                    {t("have_a_question")}
                </h1>

                <div id="question" className="flex flex-col lg:flex-row items-start justify-between gap-10 p-4 md:p-5" data-aos="fade-up" data-aos-delay="100">
                    {/* FAQ list */}
                    <div className="flex flex-col mt-10 w-full lg:w-1/2" data-aos="fade-right" data-aos-delay="200">
                        {faqs.map((faq, index) => (
                            <div key={index} className="mb-3" data-aos="fade-up" data-aos-delay={index * 100}>
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full flex justify-between items-center p-5 bg-[#0f172a] text-white font-medium text-base md:text-lg rounded-xl border border-white/10 hover:shadow-md transition-all"
                                >
                                    {t(faq.question)}
                                    {openIndex === index ? <FaMinus className="text-blue-400" /> : <FaPlus className="text-blue-400" />}
                                </button>

                                <div className={`overflow-hidden transition-all duration-500 ease-in-out rounded-b-xl ${openIndex === index ? "max-h-60 p-5 bg-[#1e293b]/80 text-white backdrop-blur" : "max-h-0"}`}>
                                    <p className="text-sm md:text-base leading-relaxed">{t(faq.answer)}</p>

                                    {index === 0 && openIndex === 0 && (
                                        <div className="mt-4 flex gap-4 flex-wrap items-center min-h-[48px]">
                                            <button
                                                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold drop-shadow transition duration-300 hover:scale-105 min-w-[160px] text-center"
                                                onClick={() => openModal("Texnik muammo")}
                                            >
                                                {t("technical_issue")}
                                            </button>
                                            <button className='bg-blue-600 hover:bg-blue-800 border-[1px] border-blue-800 text-white px-2 py-2 rounded-lg transition duration-300 min-w-[160px] text-center'>
                                                <a href="tel:+998999999999">
                                                    <p className='text-[16px]'>+998 93 553 3352</p>
                                                </a>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Map */}
                    <div className="relative md:top-10 flex justify-center w-full xl:w-1/2" data-aos="fade-left" data-aos-delay="300">
                        <ContactWithMap />
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[1000] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4 py-8">
                    <div className="bg-[#0f172a]/90 backdrop-blur-lg w-full max-w-5xl max-h-[95vh] overflow-y-auto p-5 sm:p-8 rounded-3xl shadow-2xl relative z-[1001] border border-white/10" data-aos="zoom-in">
                        <div className="absolute top-4 right-4">
                            <button onClick={closeModal} className="text-white hover:text-gray-300 text-3xl focus:outline-none">
                                <IoMdClose />
                            </button>
                        </div>

                        <h2 className="text-xl text-center sm:text-2xl font-bold text-white mb-8">
                            <span className="text-red-50">{t("issue")}</span>
                        </h2>

                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-1/2 hidden md:block">
                                <img src={IproIMage} alt="" className="rounded-2xl w-full h-[300px] md:h-[400px] lg:h-[420px] object-cover" />
                            </div>

                            <div className="w-full md:w-1/2">
                                <form className="flex flex-col gap-4 sm:gap-5" onSubmit={send}>
                                    <div className="flex flex-col gap-1">
                                        <input
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder={t("your_name")}
                                            className={`px-4 sm:px-5 py-3 rounded-xl bg-[#1e293b] text-white placeholder-gray-400 shadow-inner border ${errors.fullName ? "border-red-500" : "border-white/10"} focus:outline-none`}
                                        />
                                        {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName}</span>}
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <input
                                            type="tel"
                                            value={phoneNumber}
                                            onChange={(e) => {
                                                let value = e.target.value.replace(/\D/g, '');
                                                if (!value.startsWith('998')) value = '998' + value;
                                                setPhoneNumber('+' + value);
                                            }}
                                            placeholder={t("phone_number")}
                                            className={`px-4 sm:px-5 py-3 rounded-xl bg-[#1e293b] text-white placeholder-gray-400 shadow-inner border ${errors.phoneNumber ? "border-red-500" : "border-white/10"} focus:outline-none`}
                                        />
                                        {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber}</span>}
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <textarea
                                            placeholder={t("problem_details")}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            rows={5}
                                            className={`px-4 sm:px-5 py-3 rounded-xl bg-[#1e293b] text-white placeholder-gray-400 resize-none shadow-inner border ${errors.description ? "border-red-500" : "border-white/10"} focus:outline-none`}
                                        ></textarea>
                                        {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
                                    </div>

                                    <button type="submit" className="bg-white text-[#0072FF] w-full px-6 py-3 rounded-xl font-bold shadow-md hover:bg-gray-200 transition">
                                        {t("submit")}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Faq;