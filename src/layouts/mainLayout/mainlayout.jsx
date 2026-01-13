import { Outlet } from "react-router-dom";
import Marquee from "../../components/ui/marque";
import Footer from "../../components/layouts/footer";
import { Headset, X, Send, Instagram } from "lucide-react";
import { useState } from "react";

const MainLayout = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative min-h-screen flex flex-col">
            <main className="flex-grow">
                <Outlet />
            </main>

            <Marquee />
            <Footer />

            {/* Social buttons */}
            <div
                className={`fixed bottom-36 right-7 flex flex-col gap-3 items-center z-[9998]
                transition-all duration-300
                ${open ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"}`}
            >
                <a
                    href="https://t.me/iPRO_group"
                    target="_blank"
                    className="w-14 h-14 bg-sky-500 hover:bg-sky-600 text-white rounded-full
                               flex items-center justify-center shadow-lg transition
                               hover:scale-110 animate-bounce"
                >
                    <Send size={20} />
                </a>
                <a
                    href="https://instagram.com/iprogroupuz"
                    target="_blank"
                    className="w-14 h-14 bg-pink-500 hover:bg-pink-600 text-white rounded-full
                               flex items-center justify-center shadow-lg transition
                               hover:scale-110 animate-bounce [animation-delay:0.1s]"
                >
                    <Instagram size={20} />
                </a>
            </div>

            {/* Main button */}
            <button
                onClick={() => setOpen(!open)}
                className={`fixed bottom-16 right-6 flex items-center justify-center
                           w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white
                           rounded-full shadow-lg transition-all z-[9999]
                           ${open ? "rotate-90 scale-110" : "rotate-0 scale-100"}`}
            >
                {!open && (
                    <>
                        <span className="absolute w-full h-full rounded-full bg-blue-500 opacity-75 animate-ping"></span>
                        <span className="absolute w-full h-full rounded-full bg-blue-400 opacity-50 animate-ping [animation-delay:2s]"></span>
                        <Headset size={28} />
                    </>
                )}

                {open && <X size={28} />}
            </button>
        </div>
    );
};

export default MainLayout;
