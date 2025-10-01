import React from 'react';
import IproIcon from "../../assets/images/IproLogoBig.png";

const Marquee = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-[#0D1117] text-white py-2 overflow-hidden">
      <style>
        {`
          @keyframes marqueeScroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marqueeScroll 210s linear infinite;
          }
        `}
      </style>

      <div className="flex animate-marquee whitespace-nowrap w-max">
        {/* Elementlar ikki marta takrorlanadi — seamless scroll uchun */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex">
            {[...Array(20)].map((_, index) => (
              <div
                key={`${i}-${index}`}
                className="flex items-center gap-3 mx-10 px-2"
              >
                <img src={IproIcon} alt="iPro" className="h-4 w-auto" />
                <span className="text-xs whitespace-nowrap">Professional Team</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
