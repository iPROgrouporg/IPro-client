import {useEffect, useState} from "react";
import CardImg from "../../assets/images/cardimg.png";
import {FaQuoteLeft} from "react-icons/fa";
import StarsLeft from "../../assets/images/starsleft.png";
import StarsRight from "../../assets/images/starsright.png";
import {useTranslation} from "react-i18next";
import "../../i18";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialSlider() {
    const {t} = useTranslation();

    const testimonials = [
        {name: "John Doe", text: t("description2"), img: CardImg},
        {name: "Jane Smith", text: t("description3"), img: CardImg},
        {name: "Michael Johnson", text: t("description4"), img: CardImg},
        {name: "Emily Davis", text: t("description5"), img: CardImg},
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const cards = document.querySelectorAll(".testimonial-card");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".testimonial-cards-wrapper",
                start: "top 90%", // 80% emas, 90% — ertaroq chiqadi
                toggleActions: "restart none none none", // ❗ Har safar qayta ishlaydi
                once: false,
            },
        });

        cards.forEach((card, i) => {
            const fromDir = i % 2 === 0 ? {x: -80, y: 0, rotate: 0} : {x: 80, y: 0, rotate: 0};

            tl.fromTo(
                card,
                {
                    ...fromDir,
                    opacity: 0,
                    scale: 0.98,
                    filter: "blur(4px)",
                    clipPath: "inset(10% 10% 10% 10%)",
                },
                {
                    x: 0,
                    y: 0,
                    rotate: 0,
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 0.6, // Tezroq
                    ease: "power2.out", // Eng silliq ease
                },
                i * 0.15 // Sekinroq ketma-ket chiqadi
            );
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = parseInt(entry.target.dataset.index);
                        setActiveIndex((prev) => (idx > prev ? idx : prev));
                    }
                });
            },
            {threshold: 0.4} // Kamroq ko‘rinish yetarli
        );

        cards.forEach((el) => observer.observe(el));

        return () => {
            observer.disconnect();
            ScrollTrigger.getAll().forEach((t) => t.kill());
            tl.kill();
        };
    }, []);


    return (
        <section className=" overflow-hidden ">
            <div
                className=" container mx-auto md:max-w-none 2xl:max-w-none"
                data-aos="flip-up"
                data-aos-duration="1200"
            >
                <div
                    className="relative bg-gradient-to-b from-[#0A0F1F] via-[#101935] to-[#0A0F1F] py-24 px-4 md:px-28">
                    {/* Dekorativ yulduzlar */}
                    <img className="absolute top-0 right-0 w-32 opacity-20 animate-pulse" src={StarsRight} alt="stars"/>
                    <img className="absolute bottom-0 left-0 w-32 opacity-20 animate-spin-slow" src={StarsLeft}
                         alt="stars"/>

                    <div className="testimonial-cards-wrapper space-y-28 max-w-6xl mx-auto">
                        {testimonials.map((item, index) => (
                            <div
                                key={index}
                                data-index={index}
                                className={`testimonial-card p  w-full md:w-[80%] flex flex-col md:flex-row items-center gap-6
    ${index % 2 === 0 ? "md:ml-0 md:mr-auto pb-5" : "md:mr-0 pb-5 md:ml-auto"}
    transition-all duration-700 group bg-transparent`}
                            >
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full border-4 border-blue-400/30 shadow-xl"
                                />

                                <div
                                    className={`w-full md:w-[75%]  p-6 rounded-3xl backdrop-blur-md border border-blue-500/10 relative z-10
      ${
                                        activeIndex >= index
                                            ? "bg-[#11172A] text-white shadow-2xl "
                                            : "bg-[#11172A]/70 text-gray-400 shadow-md"
                                    }`}
                                    style={{
                                        backgroundImage: "none",
                                        boxShadow: "0px 10px 10px rgba(0, 112, 244, 0.2)", // har bir card uchun bir xil shadow
                                    }}

                                >
                                    <FaQuoteLeft className="text-blue-400 text-2xl absolute top-4 right-4"/>
                                    <h3 className="text-lg font-semibold mb-2 text-blue-300">{item.name}</h3>
                                    <p className="text-sm leading-relaxed">{item.text}</p>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
