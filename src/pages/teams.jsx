import React, { useEffect, useState, useRef } from 'react';
import { teamMembers } from '../mocks/mock';
import { useTranslation } from "react-i18next";

const Teams = ({ StarsRightImg, CardBg }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeMember, setActiveMember] = useState(teamMembers[0]);
  const { t } = useTranslation();
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);

  const startAutoRotate = () => {
    if (intervalRef.current) return; // oldin boshlangan bo‘lsa, qayta boshlamaslik
    intervalRef.current = setInterval(() => {
      setActiveIndex(prev => {
        const nextIndex = (prev + 1) % teamMembers.length;
        setActiveMember(teamMembers[nextIndex]);
        return nextIndex;
      });
    }, 3000);
  };

  const stopAutoRotate = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  // Boshlanishida autoplay yoqilsin
  useEffect(() => {
    startAutoRotate();
    return () => stopAutoRotate();
  }, []);

  const handleMemberHover = (member, index) => {
    // Hover paytida autoplay to‘xtasin
    stopAutoRotate();
    setActiveIndex(index % teamMembers.length);
    setActiveMember(member);
  };

  return (
      <section className="bg-[#0f1125] overflow-hidden py-16 relative">
        <div className="container mx-auto px-5 xl:px-0">
          <h1
              className="text-[32px] sm:text-[48px] xl:text-[80px] font-black text-white leading-tight text-center drop-shadow-[0_5px_20px_rgba(0,112,244,0.8)] mt-4 sm:mt-6"
              data-aos="fade-down"
          >
            {t("meetyheteam")}
          </h1>

          <div className="absolute right-0 top-0 hidden xl:block" data-aos="fade-left">
            <img src={StarsRightImg} alt="decor" className="w-[250px] opacity-50" />
          </div>

          <div className="mt-10 flex flex-col md:flex-row gap-10 items-center md:items-start justify-between">
            {/* LEFT CONTENT */}
            <div className="w-full md:w-1/2 space-y-5 px-4 sm:px-10 md:px-0 mt-6">
              <h3 className="text-white text-sm sm:text-lg md:text-xl uppercase text-center md:text-left font-semibold tracking-widest">
                {t(activeMember.role)}
              </h3>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[48px] xl:text-[56px] font-black uppercase text-white text-center md:text-left drop-shadow-[0_5px_30px_rgba(0,112,244,0.8)]">
                {t(activeMember.name)}
              </h2>
              <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl text-center md:text-left font-medium leading-relaxed">
                {t(activeMember.description)}
              </p>
              <div className="flex flex-row justify-center md:justify-start gap-6 mt-8 flex-wrap">
                <div className="flex items-center gap-3">
                <span className="text-white text-sm sm:text-base uppercase font-semibold">
                  {t("projects")}:
                </span>
                  <span className="text-[#00aaff] text-2xl md:text-4xl font-bold drop-shadow-md">
                  {activeMember.projects}
                </span>
                </div>
                <div className="flex items-center gap-3">
                <span className="text-white text-sm sm:text-base uppercase font-semibold">
                  {t("experience")}:
                </span>
                  <span className="text-[#00aaff] text-2xl md:text-4xl font-bold drop-shadow-md">
                  {activeMember.experience}
                </span>
                </div>
              </div>
            </div>

            {/* RIGHT BIG CARD */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end px-4 sm:px-10 md:px-0 mt-10 md:mt-0">
              <div className="relative w-[260px] sm:w-[350px] md:w-[450px] lg:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-tr from-[#101426] via-[#0f0f1a] to-[#1d2236] ring-1 ring-blue-600/20">
                <img
                    src={CardBg}
                    alt="Card Background"
                    className="absolute w-full h-full object-cover opacity-30 blur-sm"
                />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <img
                      src={activeMember.workerImg}
                      alt={activeMember.name}
                      className="w-full h-full object-contain z-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Thumbnails */}
          <div
              className="relative z-10 -mt-14 sm:-mt-16 md:-mt-20 group"
              onMouseEnter={stopAutoRotate}
              onMouseLeave={startAutoRotate}
          >
            <div className="overflow-hidden w-full">
              <div
                  className="flex gap-4 sm:gap-6 animate-scroll whitespace-nowrap backdrop-blur-md bg-white/10 p-3 sm:p-4 rounded-xl w-max min-w-full shadow-lg border border-white/10"
                  ref={scrollRef}
              >
                {[...teamMembers, ...teamMembers, ...teamMembers].map((member, idx) => (
                    <div
                        key={idx}
                        className={`relative w-32 sm:w-40 md:w-48 h-48 sm:h-60 md:h-72 rounded-xl overflow-hidden bg-[#0a0f1f] shadow-lg cursor-pointer shrink-0 ring-1 ring-white/10 
                    ${activeIndex === (idx % teamMembers.length) ? "ring-blue-500 scale-105" : "hover:ring-blue-500 hover:scale-105 transition"}`}
                        onMouseEnter={() => handleMemberHover(member, idx)}
                    >
                      <img
                          src={member.img}
                          alt={member.name}
                          className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 text-white text-xs sm:text-sm md:text-base text-center font-bold z-10">
                        {member.name}
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>

          <style>
            {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
          @media (max-width: 640px) {
            .animate-scroll {
              animation: scroll 45s linear infinite;
            }
          }
          .group:hover .animate-scroll {
            animation-play-state: paused;
          }
        `}
          </style>
        </div>
      </section>
  );
};

export default Teams;
