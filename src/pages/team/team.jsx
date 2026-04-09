import CardBg from '../../assets/images/cardbg.png';
import StarsRightImg from "../../assets/images/starsright.png";
import Footer from '../../components/layouts/footer.jsx';
import Header from '../../components/layouts/header.jsx';
import Teams from './teams.jsx';
import { Worker } from './Worker.jsx';
const team = () => {
    return (
        <>
            <Header />
            <main className='mt-20'>
                <Teams CardBg={CardBg} StarsRightImg={StarsRightImg} />
                {/* <Vacancy/> */}
                <Worker />
                <Footer />
            </main>
        </>
    );
};

export default team;