import React, {useEffect, useRef} from 'react';
import Header from '../components/layouts/header';
import Achievements from '../components/ui/achivements';
import AOS from 'aos';
import 'aos/dist/aos.css';
import aboutus1 from "../assets/images/2021.png"
import aboutus2 from "../assets/images/2022.png"
import aboutus3 from "../assets/images/2023.png"
import aboutus4 from "../assets/images/2024.png"
import aboutus5 from "../assets/images/2025.png"

import OfficeIMG from "../assets/images/officeimg.png"
import OfficeIMgBig from "../assets/images/officeimgBig.png"
import officeimgY from "../assets/images/officeimgY.png"
import officeimgX from "../assets/images/officeImgX.png"
import {useTranslation} from "react-i18next";
import "../i18";

import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {YearNumber} from "../components/ui/YearNumber.jsx";

gsap.registerPlugin(ScrollTrigger);

const aboutus = () => {
    const imagesRef = useRef([]);

    useEffect(() => {
        imagesRef.current.forEach((img, index) => {
            if (img) {
                gsap.fromTo(
                    img,
                    {x: index % 2 === 0 ? -100 : 100, opacity: 0},
                    {
                        x: 0,
                        opacity: 1,
                        duration: .2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: img,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }
        });
    }, []);
    const sectionRef = useRef(null);

    useEffect(() => {
        const images = sectionRef.current.querySelectorAll("img");

        images.forEach((img, index) => {
            gsap.fromTo(
                img,
                {
                    opacity: 0,
                    y: index % 2 === 0 ? 80 : -80,
                    scale: 0.95,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: .5,
                    delay: index * 0.1,
                    scrollTrigger: {
                        trigger: img,
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                    },
                    ease: "power3.out",
                }
            );
        });
    }, []);


    const {t} = useTranslation();

    useEffect(() => {
        AOS.init({
            duration: 2000,
            once: false // qayta qayta animatsiya
        });

        // DOM o‘zgarganda yangilash
        window.addEventListener("scroll", () => {
            AOS.refresh();
        });
    }, []);


    useEffect(() => {
        window.scrollTo(0, 0); // sahifa tepasiga o'tadi
    }, []);


    return (
        <>
            <Header/>
            <main className='mt-20'>

                <section className="container mx-auto px-4 sm:px-6 lg:px-10 py-10">

                    <div className="flex flex-col lg:flex-row justify-between gap-10 mb-40">
                        {/* Text Section - tepada (mobile), chapda (desktop) */}
                        <div className="w-full lg:w-1/2 mt-5 lg:mt-10">
                            <h1 className="text-white text-center md:text-left font-black text-3xl sm:text-5xl md:text-[65px] xl:text-[96px] leading-tight mb-6 drop-shadow-[0_5px_20px_rgba(0,112,244,0.8)]">
                                {t("about")}
                            </h1>
                            <p className="text-white text-center md:text-left font-normal text-base sm:text-lg md:text-xl leading-relaxed">
                                {t("descriptionabout")}
                            </p>
                        </div>

                        {/* Image Section - pastda (mobile), o‘ngda (desktop) */}
                        <YearNumber/>
                    </div>


                    {/* Achievements Section */}
                    <div>
                        <Achievements/>
                    </div>
                </section>

                <section className="container mx-auto px-10 sm:px-6 lg:px-10">
                    <div
                        className="flex px-8 flex-col lg:flex-row justify-between items-center text-white mt-20 mb-10 gap-6 text-center lg:text-left">
                        <img
                            src={aboutus1}
                            alt=""
                            className="w-full  max-w-[200px] sm:max-w-[250px] lg:w-full mx-auto lg:mx-0"
                        />
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                            {t("new_office")}
                        </h1>
                    </div>

                    <div className="flex px-7 p-3 flex-col lg:flex-row justify-between gap-10 overflow-hidden">
                        <div className="flex flex-col items-center gap-14 w-full lg:w-1/2">
                            <a href="#">
                                <img
                                    ref={(el) => (imagesRef.current[0] = el)}
                                    src={OfficeIMG}
                                    alt=""
                                    className="w-full rounded-md h-full shadow-md hover:shadow-[0_0_10px_5px_rgba(0,122,255,0.6)] transition-all duration-300 cursor-pointer"
                                />
                            </a>
                            <a href="#">
                                <img
                                    ref={(el) => (imagesRef.current[1] = el)}
                                    src={OfficeIMgBig}
                                    alt=""
                                    className="w-full rounded-md h-full shadow-md hover:shadow-[0_0_10px_5px_rgba(0,122,255,0.6)] transition-all duration-300 cursor-pointer"
                                />
                            </a>
                        </div>

                        <div className="flex flex-col items-center xl:items-end gap-14 w-full lg:w-1/2">
                            <a href="#">
                                <img
                                    ref={(el) => (imagesRef.current[2] = el)}
                                    src={officeimgY}
                                    alt=""
                                    className="w-full rounded-md shadow-md hover:shadow-[0_0_10px_5px_rgba(0,122,255,0.6)] transition-all duration-300 cursor-pointer"
                                />
                            </a>
                            <a href="#">
                                <img
                                    ref={(el) => (imagesRef.current[3] = el)}
                                    src={officeimgX}
                                    alt=""
                                    className="w-full rounded-md shadow-md hover:shadow-[0_0_10px_5px_rgba(0,122,255,0.6)] transition-all duration-300 cursor-pointer"
                                />
                            </a>
                        </div>
                    </div>
                </section>

                <section
                    ref={sectionRef}
                    className="container mx-auto px-10 sm:px-6 lg:px-10"
                >
                    {/* Title Section */}
                    <div
                        className="flex px-8 flex-col lg:flex-row justify-between items-center text-white mt-40 mb-10 gap-6 text-center lg:text-left">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                            {t("expanding_team")}
                        </h1>
                        <img
                            src={aboutus2}
                            alt=""
                            className="w-full max-w-[200px] sm:max-w-[250px] lg:max-w-[300px] mx-auto lg:mx-0"
                        />
                    </div>

                    {/* Images Grid */}
                    <div className="flex px-7 p-3 flex-col lg:flex-row justify-between gap-10 overflow-hidden">
                        {/* Left Column */}
                        <div className="flex flex-col items-center gap-14 w-full lg:w-1/2">
                            <a href="#">
                                <img
                                    src={OfficeIMG}
                                    alt=""
                                    className="w-full rounded-md shadow-md hover:shadow-[0_0_10px_5px_rgba(0,122,255,0.6)] transition-all duration-300 cursor-pointer"
                                />
                            </a>
                            <a href="#">
                                <img
                                    src={OfficeIMgBig}
                                    alt=""
                                    className="w-full rounded-md mt-10 shadow-md hover:shadow-[0_0_10px_5px_rgba(0,122,255,0.6)] transition-all duration-300 cursor-pointer"
                                />
                            </a>
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col items-center xl:items-end gap-14 w-full lg:w-1/2">
                            <a href="#">
                                <img
                                    src={officeimgY}
                                    alt=""
                                    className="w-full rounded-md shadow-md hover:shadow-[0_0_10px_5px_rgba(0,122,255,0.6)] transition-all duration-300 cursor-pointer"
                                />
                            </a>
                            <a href="#">
                                <img
                                    src={officeimgX}
                                    alt=""
                                    className="w-full rounded-md mt-5 shadow-md hover:shadow-[0_0_10px_5px_rgba(0,122,255,0.6)] transition-all duration-300 cursor-pointer"
                                />
                            </a>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-10 sm:px-6 lg:px-10">
                    {/* Title Section */}
                    <div
                        className="flex px-8 flex-col lg:flex-row justify-between items-center text-white mt-20 mb-10 gap-6 text-center lg:text-left">
                        <img
                            src={aboutus3}
                            alt=""
                            data-aos="fade-up"
                            data-aos-duration="3000"
                            className="w-full max-w-[200px] sm:max-w-[250px] lg:max-w-[300px] mx-auto lg:mx-0"
                        />
                        <h1
                            className="text-3xl sm:text-4xl md:text-5xl font-bold"
                            data-aos="fade-down"
                            data-aos-easing="linear"
                            data-aos-duration="1500"
                        >
                            {t("new_office")}
                        </h1>
                    </div>

                    {/* Images Grid */}
                    <div className="flex  px-7 p-3 flex-col lg:flex-row justify-between gap-10  overflow-hidden">
                        {/* Left Column */}
                        <div className="flex flex-col items-center gap-14 w-full lg:w-1/2">
                            <a href="#">
                                <img
                                    src={OfficeIMG}
                                    data-aos="fade-right"
                                    data-aos-duration="1700"
                                    alt=""
                                    className="w-full rounded-md  shadow-md hover:shadow-[0_0_10px_5px_rgba(0,122,255,0.6)] transition-all duration-300 cursor-pointer"
                                />
                            </a>
                            <a href="#">
                                <img
                                    src={OfficeIMgBig}
                                    data-aos="fade-right"
                                    data-aos-duration="1800"
                                    alt=""
                                    className="w-full rounded-md  mt-10 shadow-md hover:shadow-[0_0_10px_5px_rgba(0,122,255,0.6)] transition-all duration-300 cursor-pointer"
                                />
                            </a>
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col  items-center xl:items-end gap-14 w-full lg:w-1/2">
                            <a href="#">
                                <img
                                    src={officeimgY}
                                    data-aos="fade-left"
                                    data-aos-delay="500"
                                    data-aos-duration="1700"
                                    alt=""
                                    className="w-full rounded-md shadow-md hover:shadow-[0_0_10px_5px_rgba(0,122,255,0.6)] transition-all duration-300 cursor-pointer"
                                />
                            </a>
                            <a href="#">
                                <img
                                    src={officeimgX}
                                    data-aos="fade-left"
                                    data-aos-delay="500"
                                    data-aos-duration="1800"
                                    alt=""
                                    className="w-full rounded-md mt-5 shadow-md hover:shadow-[0_0_10px_5px_rgba(0,122,255,0.6)] transition-all duration-300 cursor-pointer"
                                />
                            </a>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-10 sm:px-6 lg:px-10">
                    {/* Title Section */}
                    <div
                        className="flex px-8 flex-col lg:flex-row justify-between items-center text-white mt-20 mb-10 gap-6 text-center lg:text-left">
                        <h1
                            className="text-3xl sm:text-4xl md:text-5xl font-bold"
                            data-aos="fade-down"
                            data-aos-easing="linear"
                            data-aos-duration="1500"
                        >
                            {t("expanding_team")}
                        </h1>
                        <img
                            src={aboutus4}
                            alt=""
                            data-aos="fade-up"
                            data-aos-duration="3000"
                            className="w-full max-w-[200px] sm:max-w-[250px] lg:max-w-[300px] mx-auto lg:mx-0"
                        />
                    </div>

                    {/* Images Section */}
                    <div className="flex  px-7 p-3 flex-col lg:flex-row justify-between gap-10  overflow-hidden">
                        {/* Left Column */}
                        <div className="flex flex-col items-center gap-14 w-full lg:w-1/2">
                            <a href="#">
                                <img
                                    src={OfficeIMG}
                                    data-aos="fade-right"
                                    data-aos-duration="1700"
                                    alt=""
                                    className="w-full rounded-md shadow-md hover:shadow-[0_0_10px_5px_rgba(0,122,255,0.6)] transition-all duration-300 cursor-pointer"
                                />
                            </a>
                            <a href="#">
                                <img
                                    src={OfficeIMgBig}
                                    data-aos="fade-right"
                                    data-aos-duration="1800"
                                    alt=""
                                    className="w-full rounded-md mt-10 shadow-md hover:shadow-[0_0_10px_5px_rgba(0,122,255,0.6)] transition-all duration-300 cursor-pointer"
                                />
                            </a>
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col  items-center xl:items-end gap-14 w-full lg:w-1/2">
                            <a href="#">
                                <img
                                    src={officeimgY}
                                    data-aos="fade-left"
                                    data-aos-delay="500"
                                    data-aos-duration="1700"
                                    alt=""
                                    className="w-full rounded-md shadow-md hover:shadow-[0_0_10px_5px_rgba(0,122,255,0.6)] transition-all duration-300 cursor-pointer"
                                />
                            </a>
                            <a href="#">
                                <img
                                    src={officeimgX}
                                    data-aos="fade-left"
                                    data-aos-delay="500"
                                    data-aos-duration="1800"
                                    alt=""
                                    className="w-full rounded-md mt-10 shadow-md hover:shadow-[0_0_10px_5px_rgba(0,122,255,0.6)] transition-all duration-300 cursor-pointer"
                                />
                            </a>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-10 sm:px-6 lg:px-10">
                    {/* Title Section */}
                    <div
                        className="flex px-8 flex-col lg:flex-row justify-between items-center text-white mt-20 mb-10 gap-6 text-center lg:text-left">
                        <img
                            src={aboutus5}
                            alt=""
                            data-aos="fade-up"
                            data-aos-duration="3000"
                            className="w-full max-w-[200px] sm:max-w-[250px] lg:max-w-[300px] mx-auto lg:mx-0"
                        />
                        <h1
                            className="text-3xl sm:text-4xl md:text-5xl font-bold"
                            data-aos="fade-down"
                            data-aos-easing="linear"
                            data-aos-duration="1500"
                        >
                            {t("new_office")}
                        </h1>
                    </div>

                    {/* Images Section */}
                    <div className="flex mb-10  px-7 p-3 flex-col lg:flex-row justify-between gap-10  overflow-hidden">
                        {/* Left Column */}
                        <div className="flex flex-col items-center gap-14 w-full lg:w-1/2">
                            <a href="#">
                                <img
                                    src={OfficeIMG}
                                    data-aos="fade-right"
                                    data-aos-duration="1700"
                                    alt=""
                                    className="w-full rounded-md shadow-md hover:shadow-[0_0_10px_5px_rgba(0,122,255,0.6)] transition-all duration-300 cursor-pointer"
                                />
                            </a>
                            <a href="#">
                                <img
                                    src={OfficeIMgBig}
                                    data-aos="fade-right"
                                    data-aos-duration="1800"
                                    alt=""
                                    className="w-full rounded-md mt-10 shadow-md hover:shadow-[0_0_10px_5px_rgba(0,122,255,0.6)] transition-all duration-300 cursor-pointer"
                                />
                            </a>
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col  items-center xl:items-end gap-14 w-full lg:w-1/2">
                            <a href="#">
                                <img
                                    src={officeimgY}
                                    data-aos="fade-left"
                                    data-aos-delay="500"
                                    data-aos-duration="1700"
                                    alt=""
                                    className="w-full rounded-md shadow-md hover:shadow-[0_0_10px_5px_rgba(0,122,255,0.6)] transition-all duration-300 cursor-pointer"
                                />
                            </a>
                            <a href="#">
                                <img
                                    src={officeimgX}
                                    data-aos="fade-left"
                                    data-aos-delay="500"
                                    data-aos-duration="1800"
                                    alt=""
                                    className="w-full rounded-md mt-10 shadow-md hover:shadow-[0_0_10px_5px_rgba(0,122,255,0.6)] transition-all duration-300 cursor-pointer"
                                />
                            </a>
                        </div>
                    </div>
                </section>

            </main>
        </>
    );
};

export default aboutus;