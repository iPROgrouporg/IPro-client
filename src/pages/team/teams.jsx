import React, {useState, useRef} from 'react';
import {teamMembers} from '../../mocks/mock.jsx';
import {useTranslation} from "react-i18next";


const Teams = ({StarsRightImg, CardBg}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeMember, setActiveMember] = useState(teamMembers[0]);
    const {t} = useTranslation();
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({left: -300, behavior: "smooth"});
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({left: 300, behavior: "smooth"});
    };

    return (
        <section className="bg-[#0f1125] overflow-hidden py-8 relative">
            <div className="container  mx-auto px-5 xl:px-0">
                <h1 className="text-[32px] sm:text-[48px] xl:text-[80px] font-black text-white leading-tight text-center drop-shadow-[0_5px_20px_rgba(0,112,244,0.8)] mt-4 sm:mt-6">
                    {t("meetyheteam")}
                </h1>

                <div className="absolute right-0 top-0 hidden xl:block">
                    <img src={StarsRightImg} alt="decor" className="w-[250px] opacity-50"/>
                </div>

                <div
                    className="mt-20  px-12 flex flex-col md:flex-row gap-10 items-center md:items-start justify-between">
                    {/* LEFT */}
                    <div className="w-full md:w-1/2 space-y-5 px-4 sm:px-10 md:px-0 mt-6">
                        <h3 className="text-white text-sm sm:text-lg md:text-xl uppercase text-center md:text-left font-semibold tracking-widest">
                            {t(activeMember.role)}
                        </h3>
                        <h2 className="text-[28px] sm:text-[36px] lg:text-[48px] xl:text-[56px] font-black uppercase text-white text-center md:text-left">
                            {t(activeMember.name)}
                        </h2>
                        <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl text-center md:text-left">
                            {t(activeMember.description)}
                        </p>
                        <div className="mt-4 space-y-2 text-center md:text-left">
                            <h3 className="text-white/70 text-sm sm:text-base md:text-lg font-medium">
                                <span className="text-white font-semibold uppercase tracking-wider">{t("projects")}:</span>{" "}
                                {activeMember.projects}
                            </h3>
                            <h3 className="text-white/70 text-sm sm:text-base md:text-lg font-medium">
                                <span className="text-white font-semibold uppercase tracking-wider">{t("experience")}:</span>{" "}
                                {activeMember.experience}
                            </h3>
                        </div>

                    </div>

                    {/* RIGHT */}
                    <div
                        className="w-full md:w-1/2 flex justify-center md:justify-end px-4 sm:px-10 md:px-0 mt-10 md:mt-0">
                        <div
                            className="relative w-[260px] sm:w-[350px] md:w-[450px] lg:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-3xl shadow-2xl">
                            <img src={CardBg} alt="bg"
                                 className="absolute w-full h-full object-cover opacity-30 blur-sm"/>
                            <div className="absolute inset-0 flex items-center justify-center p-4">
                                <img src={activeMember.workerImg} alt={activeMember.name}
                                     className="w-full h-full object-contain z-10"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative  z-10 -mt-14 sm:-mt-16 md:-mt-20 px-12">
                    <button
                        onClick={scrollLeft}
                        className="absolute -left-1 top-1/2 -translate-y-1/2 z-20
             w-12 h-12 flex items-center justify-center
             bg-blue-600/80 hover:bg-blue-600
             text-white text-2xl font-bold
             rounded-full shadow-lg"
                    >
                        ‹
                    </button>


                    <button
                        onClick={scrollRight}
                        className="absolute -right-1 top-1/2 -translate-y-1/2 z-20
             w-12 h-12 flex items-center justify-center
             bg-blue-600/80 hover:bg-blue-600
             text-white text-2xl font-bold
             rounded-full shadow-lg"
                    >
                        ›
                    </button>

                    <div className="overflow-hidden w-full">
                        <div
                            ref={scrollRef}
                            className="flex gap-4 sm:gap-6 backdrop-blur-md p-3 sm:p-4 rounded-xl shadow-lg border border-white/10
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
          ${activeIndex === idx ? "ring-2 ring-blue-500 scale-105" : "hover:ring-2 hover:ring-blue-500 transition"}`}
                                >
                                    <img src={member.img} alt={member.name}
                                         className="absolute inset-0 w-full h-full object-cover"/>
                                    <div
                                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-white text-center font-bold">
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
