import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";

import SplashScreen from "../../components/ui/splashscreen.jsx";

import Footer from '../../components/layouts/footer.jsx';
import Header from '../../components/layouts/header.jsx';
import ScrollProgressBar from '../../components/progressLine/progressline.jsx';
import TestimonialSlider from '../../components/ui/scrollcardworkers.jsx';
import Primary from '../dashboard/primary.jsx';
import Scroller from '../dashboard/scroller.jsx';
import Faq from '../faq/Faq.jsx';
import PrimaryService from '../services/PrimaryService.jsx';
import Teams from '../team/teams.jsx';

import CardBg from '../../assets/images/cardbg.png';
import Logocloud from '../../assets/images/iPro11.png';
import IproIMage from "../../assets/images/iproLogoRegister.png";
import StarsLeftImg from "../../assets/images/starsleft.png";
import StarsRightImg from "../../assets/images/starsright.png";
import Video from '../../assets/video/ipro.mp4';

import { ScrollTrigger } from "gsap/ScrollTrigger";

const Home = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    // 🔥 GSAP refresh (MUHIM)
    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 300);
        }
    }, [loading]);

    return (
        <>
            {loading && <SplashScreen />}

            <Header />
            <ScrollProgressBar />
            <Primary t={t} Video={Video} />
            <Scroller t={t} Video={Video} Logocloud={Logocloud} />
            <TestimonialSlider />
            <Teams StarsRightImg={StarsRightImg} CardBg={CardBg} />
            <PrimaryService StarsLeftImg={StarsLeftImg} t={t} />
            <Faq
                t={t}
                StarsRightImg={StarsRightImg}
                IproIMage={IproIMage}
            />
            <Footer />
        </>
    );
};

export default Home;