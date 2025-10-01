
import AkiltoysLogo from "../../assets/icons/Akil toys.png"
import AsrorsLogo from "../../assets/icons/asrorov's academy.png"
import AvtodriveLogo from "../../assets/icons/Avto Drive.png"
import BarakaLogo from "../../assets/icons/barakalogo.png"
import ConsultLogo from "../../assets/icons/Consult Visa.png"
import DfaLogo from "../../assets/icons/DFA.png"
import FarkoLogo from "../../assets/icons/Farko mebel.png"
import HafiztourLogo from "../../assets/icons/Hafiz Tour.png"
import intelegentLogo from "../../assets/icons/Inteligent edu.png"
import ItBilimLogo from "../../assets/icons/IT bilim.png"
import KvantLogo from "../../assets/icons/KVANT.png"
import LifelineLogo from "../../assets/icons/LifeLine.png"
import MetinLogo from "../../assets/icons/metin.png"
import OptikaLogo from "../../assets/icons/Optika brand.png"
import QshostelLogo from "../../assets/icons/QS hostel.png"
import RopicLogo from "../../assets/icons/ropico.png"
import ShifokorLogo from "../../assets/icons/shifokor 1.png"
import ShoxinternationalLogo from "../../assets/icons/shoxinternatiol.png"
import SmartassistLogo from "../../assets/icons/smartassistment.png"
import SpectexLogo from "../../assets/icons/spectex.png"
import ToshkentLogo from "../../assets/icons/toshkentpp.png"
import ViuLogo from "../../assets/icons/VIU.png"


const logos = [AkiltoysLogo, AsrorsLogo, AvtodriveLogo,BarakaLogo, ConsultLogo, DfaLogo,HafiztourLogo, FarkoLogo, intelegentLogo,ItBilimLogo, KvantLogo, LifelineLogo,MetinLogo, OptikaLogo, QshostelLogo,RopicLogo, ShifokorLogo, ShoxinternationalLogo,SmartassistLogo, SpectexLogo, ToshkentLogo,ViuLogo,AkiltoysLogo, AsrorsLogo, AvtodriveLogo,BarakaLogo, ConsultLogo, DfaLogo,HafiztourLogo, FarkoLogo, intelegentLogo,ItBilimLogo, KvantLogo, LifelineLogo,MetinLogo, OptikaLogo, QshostelLogo,RopicLogo, ShifokorLogo, ShoxinternationalLogo,SmartassistLogo, SpectexLogo, ToshkentLogo,ViuLogo, ];

const Logomarqee = () => {
  return (
    <section className="  relative overflow-hidden ">
      <div className="relative w-full flex items-center">
        <div className="marquee flex whitespace-nowrap gap-20">
          {/* Logotiplar ketma-ket 2 marta yoziladi, cheksiz effekt uchun */}
          {logos.concat(logos).map((logo, index) => (
            <img key={index} src={logo} alt="logo" className="h-12" />
          ))}
        </div>
      </div>

      {/* CSS Animatsiya */}
      <style jsx>{`
        .marquee {
          display: flex;
          animation: marquee-scroll 95s linear infinite;
        }
        @keyframes marquee-scroll {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default Logomarqee;
