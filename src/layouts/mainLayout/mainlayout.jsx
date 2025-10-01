import { Outlet } from "react-router-dom";
import Marquee from "../../components/ui/marque";
import Footer from "../../components/layouts/footer";
import { Headset } from "lucide-react"; // 🎧 Operator iconi

const MainLayout = () => {
    return (
        <div className="relative min-h-screen flex flex-col">
            <main className="flex-grow">
                <Outlet />
            </main>

            <Marquee />
            <Footer />

            {/* 🚀 Floating Operator Button */}
            <button
                className="fixed bottom-16 right-6 flex items-center justify-center
                           w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white
                           rounded-full shadow-lg transition-all z-[9999]"
            >
                <span className="absolute w-full h-full rounded-full bg-blue-500 opacity-75 animate-ping"></span>
                <span
                    className="absolute w-full h-full rounded-full bg-blue-400 opacity-50 animate-ping [animation-delay:2s]"></span>
                <Headset size={28}/>
            </button>
        </div>
    );
};

export default MainLayout;
