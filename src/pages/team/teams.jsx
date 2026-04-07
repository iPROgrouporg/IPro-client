import React, { useState, useRef } from "react";
import { teamMembers } from "../../mocks/mock.jsx";
import { useTranslation } from "react-i18next";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io"; 

const Teams = ({ StarsRightImg, CardBg }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeMember, setActiveMember] = useState(teamMembers[0]);
  const { t } = useTranslation();
  const scrollRef = useRef(null);

  const scrollLeft = () => scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () => scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });

  return (
    <section className="bg-gradient-to-b from-[#0f1125] via-[#0d1328] to-[#0f1125] overflow-hidden py-12 relative">
      <div className="container mx-auto px-5 xl:px-0">

        {/* TITLE */}
        <h1 className="text-[32px] sm:text-[48px] xl:text-[80px] font-black text-white leading-tight text-center 
        drop-shadow-[0_4px_15px_rgba(0,112,244,0.5)] mt-4 sm:mt-6">
          {t("meetyheteam")}
        </h1>

        {/* DECOR */}
        <div className="absolute right-0 top-0 hidden xl:block">
          <img src={StarsRightImg} alt="decor" className="w-[250px] opacity-40" />
        </div>

        <div className="mt-20 px-12 flex flex-col md:flex-row gap-10 items-center md:items-start justify-between">
          
          {/* LEFT */}
          <div className="w-full md:w-1/2 space-y-5 px-4 sm:px-10 md:px-0 mt-6">
            <h3 className="text-white/90 text-sm sm:text-lg md:text-xl uppercase text-center md:text-left font-semibold tracking-widest">
              {t(activeMember.role)}
            </h3>

            <h2 className="text-[28px] sm:text-[36px] lg:text-[48px] xl:text-[56px] font-black uppercase text-white text-center md:text-left">
              {t(activeMember.name)}
            </h2>

            <p className="text-white/70 text-sm sm:text-base md:text-lg lg:text-xl text-center md:text-left leading-relaxed">
              {t(activeMember.description)}
            </p>

            <div className="mt-4 space-y-2 text-center md:text-left">
              <h3 className="text-white/60 text-sm sm:text-base md:text-lg font-medium">
                <span className="text-white font-semibold uppercase tracking-wider">{t("projects")}:</span>{" "}
                {activeMember.projects}
              </h3>
              <h3 className="text-white/60 text-sm sm:text-base md:text-lg font-medium">
                <span className="text-white font-semibold uppercase tracking-wider">{t("experience")}:</span>{" "}
                {activeMember.experience}
              </h3>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end px-4 sm:px-10 md:px-0 mt-10 md:mt-0">
            <div className="relative w-[260px] sm:w-[350px] md:w-[450px] lg:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
              
              <img src={CardBg} alt="bg" className="absolute w-full h-full object-cover opacity-20 blur-sm" />

              <div className="absolute inset-0 flex items-center justify-center p-4">
                <img src={activeMember.workerImg} alt={activeMember.name} className="w-full h-full object-contain z-10" />
              </div>
            </div>
          </div>
        </div>

        {/* SCROLLABLE CARDS */}
        <div className="relative z-10 -mt-14 sm:-mt-16 md:-mt-20 px-12">

          {/* LEFT BTN */}
          <button
            onClick={scrollLeft}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-20
              w-12 h-12 flex items-center justify-center
              text-white text-2xl font-bold
              rounded-full
              bg-white/5 border border-white/10
              backdrop-blur-md
              transition-all duration-300
              hover:bg-blue-600 hover:border-blue-500
              hover:shadow-[0_0_15px_rgba(0,112,244,0.6)]"
          >
            <IoMdArrowBack className="w-6 h-6" />
          </button>

          {/* RIGHT BTN */}
          <button
            onClick={scrollRight}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-20
              w-12 h-12 flex items-center justify-center
              text-white text-2xl font-bold
              rounded-full
              bg-white/5 border border-white/10
              backdrop-blur-md
              transition-all duration-300
              hover:bg-blue-600 hover:border-blue-500
              hover:shadow-[0_0_15px_rgba(0,112,244,0.6)]"
          >
            <IoMdArrowForward className="w-6 h-6" />
          </button>

          <div className="overflow-hidden w-full">
            <div
              ref={scrollRef}
              className="flex gap-4 sm:gap-6 backdrop-blur-md p-3 sm:p-4 rounded-xl 
              bg-white/[0.02] border border-white/10
              shadow-[0_5px_20px_rgba(0,0,0,0.4)]
              overflow-x-auto scroll-smooth scrollbar-hide"
            >
              {teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveIndex(idx);
                    setActiveMember(member);
                  }}
                  className={`relative w-32 sm:w-40 md:w-48 h-48 sm:h-60 md:h-72 rounded-xl overflow-hidden cursor-pointer shrink-0
                    transition-all duration-300
                    ${
                      activeIndex === idx
                        ? "ring-2 ring-blue-500 scale-105 shadow-[0_0_25px_rgba(0,112,244,0.5)]"
                        : "hover:ring-2 hover:ring-blue-500 hover:scale-105 hover:shadow-lg"
                    }`}
                >
                  <img src={member.img} alt={member.name} className="absolute inset-0 w-full h-full object-cover" />

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-white text-center font-bold">
                    {member.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Teams;