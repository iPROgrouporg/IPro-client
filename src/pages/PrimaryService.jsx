import React from "react";
import { motion } from "framer-motion";
import {useNavigate} from "react-router-dom";

const portfolioData = [
  {
    id: 1,
    img: "https://picsum.photos/200/300?random=1",
    title: "China House",
    link:'/service'
  },
  {
    id: 2,
    img: "https://picsum.photos/200/300?random=2",
    title: "Modern Villa",
    link:'/service'

  },
  {
    id: 3,
    img: "https://picsum.photos/200/300?random=3",
    title: "Luxury Office",
    link:'/service'

  },
  {
    id: 4,
    img: "https://picsum.photos/200/300?random=4",
    title: "Tech Center",
    link:'/service'

  },
  {
    id: 5,
    img: "https://picsum.photos/200/300?random=5",
    title: "City Mall",
    link:'/service'

  },
  {
    id: 6,
    img: "https://picsum.photos/200/300?random=6",
    title: "Sky Apartment",
    link:'/service'

  },
  {
    id: 7,
    img: "https://picsum.photos/200/300?random=7",
    title: "Creative Hub",
    link:'/service'
  },
];

const PrimaryService = ({ StarsLeftImg, t }) => {
  const navigate =useNavigate()
  return (
      <section className="pt-10 px-6 md:pt-20 overflow-hidden bg-gradient-to-b from-[#0a0a23] to-[#121232]">
        <div className="relative">
          <img
              className="absolute top-[500px] left-0 w-[200px] opacity-50 animate-pulse"
              src={StarsLeftImg}
              alt=""
          />
        </div>

        <div className="container mx-auto mb-10 max-w-[1300px]">
          <motion.h1
              className="text-white px-4 font-black text-4xl md:text-[80px] text-center md:text-left leading-tight drop-shadow-[0_5px_30px_rgba(0,112,244,0.9)]"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
          >
            {t("services")}
          </motion.h1>

          {/* Wrapper */}
          <div className="mt-12 px-2">
            {/* Only on md+ use flex-row expand cards */}
            <div className="hidden md:flex justify-center items-stretch gap-6">
              {portfolioData.map((item, index) => (
                  <motion.div
                      key={item.id}
                      className="relative flex-[0.25] h-[320px] overflow-hidden rounded-2xl cursor-pointer group hover:flex-[0.9] hover:z-20 transition-all duration-700 ease-in-out shadow-2xl hover:shadow-blue-500/50"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/70 to-transparent p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <p className="text-white text-lg font-bold text-center">{item.title}</p>
                    </div>
                  </motion.div>
              ))}
            </div>

            {/* Mobile/tablet: grid layout */}
            <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
              {portfolioData.map((item, index) => (
                  <motion.div

                      key={item.id}
                      className="relative w-full h-[200px] overflow-hidden rounded-2xl group cursor-pointer shadow-lg"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                  >
                    <img
                        onClick={()=>navigate(item.link)}
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p className="text-white text-base font-semibold text-center">{item.title}</p>
                    </div>
                  </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
};

export default PrimaryService;
