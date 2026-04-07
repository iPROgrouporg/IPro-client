import StarsRightImg from "../../assets/images/starsright.png"
import CardBg from '../../assets/images/cardbg.png';
import Header from '../../components/layouts/header.jsx';
import Footer from '../../components/layouts/footer.jsx';
import Teams from './teams.jsx';
import { Worker } from './Worker.jsx';
import Vacancy from '../vacancy/Vacancy.jsx';
const team = () => {
    return (
        <>
            <Header />
            <main className='mt-20'>
                <Teams CardBg={CardBg} StarsRightImg={StarsRightImg}/>
                {/* <Vacancy/> */}
                <Worker/>
                <Footer/>
            </main>
        </>
    );
};

export default team;