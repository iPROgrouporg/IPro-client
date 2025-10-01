"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { portfolioData } from "../mocks/mock";

gsap.registerPlugin(ScrollTrigger);

const PortfolioSection = ({ t }) => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const infoRef = useRef(null);
  const blurWrapperRef = useRef(null);

  useEffect(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (vw < 768) return; // Mobil qurilmalarda animatsiya ishlamaydi

    const scaleX = Math.min(vw * 0.25, 300);
    const scaleY = Math.min(vh * 0.25, 300);

    const positions = [
      [0, 0],
      [scaleX, -scaleY],
      [-scaleX, scaleY],
      [scaleX * 0.7, scaleY * 1.2],
      [-scaleX * 0.9, -scaleY * 1.1],
      [0, scaleY * 1.3],
      [scaleX * 1.2, 0],
      [-scaleX * 1.2, 0],
      [scaleX * 0.5, -scaleY * 1.4],
      [-scaleX * 0.5, scaleY * 1.4],
      [scaleX * 1.1, -scaleY * 1.1],
      [-scaleX * 1.1, scaleY * 1.1],
      [0, -scaleY * 1.5],
    ];

    const tl = gsap.timeline({
      scrollTrigger: {
        id: "portfolio-scroll",
        trigger: containerRef.current,
        start: "top top",
        end: `+=${portfolioData.length * 700 + 1000}`,
        scrub: true,
        pin: true,
      },
    });

    cardsRef.current.forEach((card, i) => {
      if (!card || !card.parentNode) return;
      const [x, y] = positions[i % positions.length];
      tl.to(
        card,
        {
          opacity: 1,
          scale: 1,
          x,
          y,
          duration: 1,
          ease: "power2.out",
        },
        i * 1
      );
    });

    if (blurWrapperRef.current) {
      tl.to(
        blurWrapperRef.current,
        {
          filter: "blur(6px)",
          duration: 1,
          ease: "power1.out",
        },
        `+=0.5`
      );
    }

    if (infoRef.current) {
      tl.to(
        infoRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=1"
      );
    }

    return () => {
      tl.kill();
      ScrollTrigger.getById("portfolio-scroll")?.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen text-white bg-black overflow-hidden"
    >
      <div className="relative w-full flex flex-col md:flex-row md:items-center md:justify-center">
        {/* Sarlavha */}
        <h1 className="mt-10 text-center w-full text-[28px] sm:text-[36px] md:text-[64px] xl:text-[80px] uppercase font-black drop-shadow-[0_5px_20px_rgba(0,112,244,0.8)] z-30">
          {t("portfolio")}
        </h1>

        {/* Desktop view: kartalar animatsiyalangan */}
        <div
          ref={blurWrapperRef}
          className="absolute inset-0 hidden md:block pointer-events-none"
        >
          {portfolioData.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="card fixed w-[160px] h-[240px] sm:w-[180px] sm:h-[280px] md:w-[200px] md:h-[300px] xl:w-[220px] xl:h-[320px] bg-blue-500 rounded-xl overflow-hidden shadow-2xl"
              style={{
                opacity: 0,
                transform: "translate(-50%, -50%)",
                left: "50%",
                top: "50%",
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 bg-black bg-opacity-50 w-full text-center text-white font-bold p-2 text-xs sm:text-sm md:text-base">
                {item.title}
              </div>
            </div>
          ))}
        </div>

        {/* Mobil view: scrollable kartalar */}
        <div className="md:hidden w-full px-4 pt-20 pb-28 space-y-6 overflow-y-auto h-auto">
          {portfolioData.map((item) => (
            <div
              key={item.id}
              className="w-full bg-blue-500 rounded-xl overflow-hidden shadow-xl"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-60 object-cover"
              />
              <div className="bg-black bg-opacity-50 w-full text-center text-white font-bold p-3">
                {item.title}
              </div>
            </div>
          ))}
        </div>

        {/* Ma'lumot bloki */}
        <div
          ref={infoRef}
          className="absolute bottom-16 md:bottom-32 left-1/2 -translate-x-1/2 z-50 opacity-0 translate-y-16 transition-all duration-500"
        >
          <div className="bg-[#0b0f19cc] backdrop-blur-md px-6 py-5 rounded-2xl shadow-2xl max-w-[90vw] text-center">
            <p className="text-white text-base sm:text-lg md:text-xl font-medium mb-4 leading-snug">
              {t("portfolioInfo") ||
                "Barcha loyihalar muvaffaqiyatli tarzda namoyish etildi!"}
            </p>
            <button className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold text-sm sm:text-base px-5 py-2 rounded-full shadow-lg transition-all">
              {t("seeMore") || "Barchasini ko‘rish"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
