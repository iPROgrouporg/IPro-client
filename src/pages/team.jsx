import StarsRightImg from "../assets/images/starsright.png"
import CardBg from '../assets/images/cardbg.png';
import Header from '../components/layouts/header';
import Footer from '../components/layouts/footer';
import Teams from './teams';
import { Worker } from './Worker';
import Vacancy from './vacancy/Vacancy.jsx';
/////////////////////////////////////////////////////////////////////////////////////////
const team = () => {
    return (
        <>
            <Header />
            <main className='mt-20'>
                <Teams CardBg={CardBg} StarsRightImg={StarsRightImg}/>
                <Vacancy/>
                <Worker/>
            </main>
        </>
    );
};

export default team;