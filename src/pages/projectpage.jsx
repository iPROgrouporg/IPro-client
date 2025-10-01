import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from '../components/layouts/header';
import Footer from '../components/layouts/footer';
import KranPortfolio from "../assets/images/kranPortfolio.png";

const ProjectsPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  // AOS ni ishga tushirish
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleProjectClick = (id) => {
    navigate(`/project/${id}`);
  };

  return (
    <>
      <Header />
      <main className="mt-24 px-5 xl:px-16 container mx-auto mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-12 uppercase tracking-widest bg-gradient-to-r from-blue-400 via-sky-300 to-blue-100 bg-clip-text text-transparent">
          {category}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              onClick={() => handleProjectClick(i + 1)}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="rounded-2xl overflow-hidden shadow-lg bg-[#10121B] hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.03] cursor-pointer"
            >
              <img
                src={KranPortfolio}
                alt={`Project ${i + 1}`}
                className="w-full h-52 object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="p-5">
                <h3 className="text-blue-400 text-xl font-semibold mb-2 tracking-wide">
                  Project {i + 1}
                </h3>
                <p className="text-gray-400 text-sm leading-snug">
                  Short description about this project.
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default ProjectsPage;
