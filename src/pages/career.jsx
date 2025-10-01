import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import Header from '../components/layouts/header';
import Footer from '../components/layouts/footer';
import { useTranslation } from "react-i18next";
import "../i18";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from "framer-motion";

const jobListings = [
  { slug: 'motion-designer', title: "Motion Designer", schedule: "monday_saturday", time: "09:00-18:00" },
  { slug: 'ui-ux-designer', title: "UI/UX Designer", schedule: "monday_friday", time: "10:00-17:00" },
  { slug: 'graphic-designer', title: "Graphic Designer", schedule: "monday_saturday", time: "08:00-16:00" },
  { slug: 'frontend-developer', title: "Frontend Developer", schedule: "monday_friday", time: "09:00-18:00" },
  { slug: 'backend-developer', title: "Backend Developer", schedule: "monday_friday", time: "10:00-19:00" },
  { slug: 'project-manager', title: "Project Manager", schedule: "monday_saturday", time: "09:00-17:00" },
  { slug: 'marketing-specialist', title: "Marketing Specialist", schedule: "monday_saturday", time: "08:30-17:30" },
  { slug: 'seo-expert', title: "SEO Expert", schedule: "monday_friday", time: "09:00-18:00" },
  { slug: 'data-analyst', title: "Data Analyst", schedule: "monday_friday", time: "09:00-17:30" },
];

const Career = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [visibleJobs, setVisibleJobs] = useState(6);

  const showMoreJobs = () => setVisibleJobs((prev) => prev + 6);
  const handleClick = (slug) => navigate(`/vacansy/${slug}`);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <>
      <Header />
      <main className="bg-gradient-to-br from-[#0A0F1F] via-[#0E1628] to-[#111B30] text-white min-h-screen pt-28 sm:pt-36">

        <section className="relative z-10 py-10 px-4 sm:px-8 md:px-10">
          <div className="container mx-auto px-5 xl:px-0">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className=" text-white text-center md:text-left text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500 text-[42px] md:text-[80px] font-extrabold leading-[1.1] drop-shadow-[0_5px_30px_rgba(0,112,244,0.9)] mb-16"
            >
              {t("vacansy")}
            </motion.h1>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
                {jobListings.slice(0, visibleJobs).map((job, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }} // <-- BU YERDA HOVER EFFEKTI
                        transition={{ duration: 0.1, delay: index * 0.15 }}
                        viewport={{ once: true }}
                        onClick={() => handleClick(job.slug)}
                        className="bg-blue-400/10 backdrop-blur-lg border border-blue-500/20 text-white p-6 rounded-2xl shadow-md transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:bg-blue-500/20 hover:ring-2 hover:ring-blue-400/60"
                    >

                    <h2 className="text-xl font-semibold group-hover:text-blue-300 transition mb-2">
                      {t(job.title)}
                    </h2>
                    <hr className="my-2 border-gray-600/30" />
                    <div className="flex flex-wrap gap-6 mt-3">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <FaCalendarAlt className="text-blue-400" />
                        <span>{t(job.schedule)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <FaClock className="text-blue-400" />
                        <span>{job.time}</span>
                      </div>
                    </div>
                    <div className="flex justify-center mt-6">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-md shadow-[0_0_20px_rgba(0,122,255,0.6)] hover:shadow-[0_0_30px_rgba(0,122,255,0.9)] transition-all duration-300"
                      >
                        {t("applynow")}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {visibleJobs < jobListings.length && (
                <motion.button
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  onClick={showMoreJobs}
                  className="mt-16 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-md shadow-[0_0_25px_rgba(0,122,255,0.6)] hover:scale-105 transition-all duration-300"
                >
                  {t("show_more")}
                </motion.button>
              )}
            </motion.div>
          </div>
        </section>

      </main>
    </>
  );
};

export default Career;
