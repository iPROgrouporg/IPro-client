import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/layouts/header';
import Footer from '../components/layouts/footer';
import BgImgService from "../assets/images/bgimgservice.png"
import { FaDownload } from 'react-icons/fa';

const serviceData = {
    'web-development': {
        title: 'Web Development',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus enim, natus, autem quas nulla, debitis architecto dignissimos assumenda eaque laborum quis. Officiis laborum quod incidunt voluptatibus quo ducimus non at. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus enim, natus, autem quas nulla, debitis architecto dignissimos assumenda eaque laborum quis. Officiis laborum quod incidunt voluptatibus quo ducimus non at.',
        image: 'https://picsum.photos/id/1011/800/400'
    },
    'mobile-apps': {
        title: 'Mobile Apps',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus enim, natus, autem quas nulla, debitis architecto dignissimos assumenda eaque laborum quis. Officiis laborum quod incidunt voluptatibus quo ducimus non at. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus enim, natus, autem quas nulla, debitis architecto dignissimos assumenda eaque laborum quis. Officiis laborum quod incidunt voluptatibus quo ducimus non at.',
        image: 'https://picsum.photos/id/1012/800/400'
    },
    'ui-ux': {
        title: 'UI/UX Design',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus enim, natus, autem quas nulla, debitis architecto dignissimos assumenda eaque laborum quis. Officiis laborum quod incidunt voluptatibus quo ducimus non at. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus enim, natus, autem quas nulla, debitis architecto dignissimos assumenda eaque laborum quis. Officiis laborum quod incidunt voluptatibus quo ducimus non at.',
        image: 'https://picsum.photos/id/1013/800/400'
    },
    'seo-optimization': {
        title: 'SEO Optimization',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus enim, natus, autem quas nulla, debitis architecto dignissimos assumenda eaque laborum quis. Officiis laborum quod incidunt voluptatibus quo ducimus non at. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus enim, natus, autem quas nulla, debitis architecto dignissimos assumenda eaque laborum quis. Officiis laborum quod incidunt voluptatibus quo ducimus non at.',
        image: 'https://picsum.photos/id/1014/800/400'
    },
    'smm': {
        title: 'SMM',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus enim, natus, autem quas nulla, debitis architecto dignissimos assumenda eaque laborum quis. Officiis laborum quod incidunt voluptatibus quo ducimus non at. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus enim, natus, autem quas nulla, debitis architecto dignissimos assumenda eaque laborum quis. Officiis laborum quod incidunt voluptatibus quo ducimus non at.',
        image: 'https://picsum.photos/id/1015/800/400'
    },
    'marketing-strategy': {
        title: 'Marketing Strategy',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus enim, natus, autem quas nulla, debitis architecto dignissimos assumenda eaque laborum quis. Officiis laborum quod incidunt voluptatibus quo ducimus non at. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus enim, natus, autem quas nulla, debitis architecto dignissimos assumenda eaque laborum quis. Officiis laborum quod incidunt voluptatibus quo ducimus non at.',
        image: 'https://picsum.photos/id/1016/800/400'
    },
    'telegram-bot': {
        title: 'telegram-bot',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus enim, natus, autem quas nulla, debitis architecto dignissimos assumenda eaque laborum quis. Officiis laborum quod incidunt voluptatibus quo ducimus non at. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus enim, natus, autem quas nulla, debitis architecto dignissimos assumenda eaque laborum quis. Officiis laborum quod incidunt voluptatibus quo ducimus non at.',
        image: 'https://picsum.photos/id/1032/800/400'
    },
    'target-ads': {
        title: 'Target Ads',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus enim, natus, autem quas nulla, debitis architecto dignissimos assumenda eaque laborum quis. Officiis laborum quod incidunt voluptatibus quo ducimus non at. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus enim, natus, autem quas nulla, debitis architecto dignissimos assumenda eaque laborum quis. Officiis laborum quod incidunt voluptatibus quo ducimus non at.',
        image: 'https://picsum.photos/id/1018/800/400'
    },
    'video-production': {
        title: 'Video Production',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus enim, natus, autem quas nulla, debitis architecto dignissimos assumenda eaque laborum quis. Officiis laborum quod incidunt voluptatibus quo ducimus non at. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus enim, natus, autem quas nulla, debitis architecto dignissimos assumenda eaque laborum quis. Officiis laborum quod incidunt voluptatibus quo ducimus non at.',
        image: 'https://picsum.photos/id/1019/800/400'
    },
    'promo-video': {
        title: 'promo-video',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus enim, natus, autem quas nulla, debitis architecto dignissimos assumenda eaque laborum quis. Officiis laborum quod incidunt voluptatibus quo ducimus non at. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus enim, natus, autem quas nulla, debitis architecto dignissimos assumenda eaque laborum quis. Officiis laborum quod incidunt voluptatibus quo ducimus non at.',
        image: 'https://picsum.photos/id/1020/800/400'
    },
    'video-montage': {
        title: 'video-montage',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus enim, natus, autem quas nulla, debitis architecto dignissimos assumenda eaque laborum quis. Officiis laborum quod incidunt voluptatibus quo ducimus non at. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus enim, natus, autem quas nulla, debitis architecto dignissimos assumenda eaque laborum quis. Officiis laborum quod incidunt voluptatibus quo ducimus non at.',
        image: 'https://picsum.photos/id/1021/800/400'
    },
    'programming': {
        title: 'programming',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus enim, natus, autem quas nulla, debitis architecto dignissimos assumenda eaque laborum quis. Officiis laborum quod incidunt voluptatibus quo ducimus non at. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus enim, natus, autem quas nulla, debitis architecto dignissimos assumenda eaque laborum quis. Officiis laborum quod incidunt voluptatibus quo ducimus non at.',
        image: 'https://picsum.photos/id/1022/800/400'
    }
};

const SingleService = () => {
    const { slug } = useParams();
    const service = serviceData[slug];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!service) {
        return (
            <div className="text-white text-center mt-20">
                <h1 className="text-3xl font-bold">Service Not Found</h1>
            </div>
        );  
    }

    return (
        <>
            <Header />
            <main className='mt-32 mb-20 px-4 sm:px-6 lg:px-20 container mx-auto'>
                <div className='flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-14 relative'>
                    {/* Text */}
                   <div className="text-center lg:text-left" data-aos="fade-up" data-aos-duration="800">
  <h1 className='text-white text-4xl sm:text-5xl lg:text-[72px] font-black mb-6 drop-shadow-[0_5px_20px_rgba(0,112,244,0.8)] bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-transparent bg-clip-text'>
    {service.title}
  </h1>
  <p className="text-gray-300 text-base sm:text-lg max-w-3xl leading-relaxed">
    {service.description}
  </p>

  {/* Tugma */}
  <div className="mt-8 flex justify-center lg:justify-start">
    <button className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-blue-600 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition duration-300 ease-in-out">
      <span className="flex items-center gap-2">
        <FaDownload className="group-hover:translate-y-1 transition-transform duration-300" /> Yuklab olish
      </span>
    </button>
  </div>
</div>

                    {/* Image  */}
                    <div className='w-full lg:w-1/2 relative' data-aos="zoom-in">
                        <img
                            src={BgImgService}
                            alt=""
                            className='absolute -top-10 md:-right-10 sm:right-0 h-full w-full -z-10 opacity-10'
                        />
                        <img
                            src={service.image}
                            alt={service.title}
                            className="md:w-full md:h-full object-cover shadow-xl rounded-xl"
                        />
                    </div>
                </div>

                <h2 className='text-white text-2xl sm:text-3xl font-bold mt-20 mb-6 text-center lg:text-left' data-aos="fade-up">
                    Example Projects
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-xl shadow-lg overflow-hidden hover:scale-[1.03] transition-transform duration-300 cursor-pointer"
                            data-aos="flip-up"
                            data-aos-delay={i * 100}
                        >
                            <img
                                src={service.image}
                                alt={`Project ${i + 1}`}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-white font-semibold text-base">Project {i + 1}</h3>
                                <p className="text-gray-400 text-sm mt-1">Short description...</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
};

export default SingleService;