import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layouts/header';
import Footer from '../components/layouts/footer';
import { useTranslation } from "react-i18next";
import "../i18";
import AOS from 'aos';
import 'aos/dist/aos.css';

const servicesList = [
  {
    slug: 'web-development',
    title: 'webdevelopment',
    description: 'web_apps',
    image: 'https://picsum.photos/id/1011/400/200'
  },
  {
    slug: 'mobile-apps',
    title: 'mobile',
    description: 'mobile_apps',
    image: 'https://picsum.photos/id/1012/400/200'
  },
  {
    slug: 'ui-ux',
    title: 'UX/UI',
    description: 'seo_boost',
    image: 'https://picsum.photos/id/1013/400/200'
  },
  {
    slug: 'seo-optimization',
    title: 'seo_optimization',
    description: 'seo_boost',
    image: 'https://picsum.photos/id/1014/400/200'
  },
  {
    slug: 'smm',
    title: 'smmtex',
    description: 'seo_optimization',
    image: 'https://picsum.photos/id/1015/400/200'
  },
  {
    slug: 'marketing-strategy',
    title: 'marketing',
    description: 'data_marketing',
    image: 'https://picsum.photos/id/1016/400/200'
  },
  {
    slug: 'telegram-bot',
    title: 'telegram_Bot',
    description: 'telegram_bot_tex',
    image: 'https://picsum.photos/id/1032/400/200'
  },
  {
    slug: 'target-ads',
    title: 'target',
    description: 'ad_campaigns',
    image: 'https://picsum.photos/id/1018/400/200'
  },
  {
    slug: 'video-production',
    title: 'video_Production',
    description: 'video_content',
    image: 'https://picsum.photos/id/1019/400/200'
  },
  {
    slug: 'promo-video',
    title: 'promo_Video',
    description: 'promo_video',
    image: 'https://picsum.photos/id/1020/400/200'
  },
  {
    slug: 'video-montage',
    title: 'video_Montage',
    description: 'montage_solutions',
    image: 'https://picsum.photos/id/1021/400/200'
  },
  {
    slug: 'programming',
    title: 'programming',
    description: 'business_programming',
    image: 'https://picsum.photos/id/1022/400/200'
  }
];

const Services = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = (slug) => {
    navigate(`/service/${slug}`);
  };

  useEffect(() => {
    AOS.init({ duration: 1500 });
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <main className="mt-20 px-5 xl:px-14 container mx-auto">
      <h1
  data-aos="fade-up"
  className="text-center md:text-left text-[42px] md:text-[96px] font-extrabold tracking-tight uppercase mb-16
             text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-500 to-indigo-700 drop-shadow-[0_10px_20px_rgba(0,115,255,0.5)]"
>
  {t("services")}
</h1>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
          {servicesList.map((service, index) => (
            <div
              key={index}
              onClick={() => handleClick(service.slug)}
              data-aos="zoom-in-up"
              data-aos-delay={index * 100}
              className="bg-[#0f111c] backdrop-blur-sm border border-[#1e2638] hover:border-[#3b82f6] hover:shadow-[0_15px_40px_rgba(0,180,255,0.3)] rounded-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-500 cursor-pointer"
            >
              <img src={service.image} alt={t(service.title)} className="w-full h-44 object-cover rounded-t-2xl" />
              <div className="p-5">
                <h2 className="text-blue-400 text-xl font-semibold mb-2 tracking-wide">{t(service.title)}</h2>
                <p className="text-gray-400 text-sm">{t(service.description)}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Services;
