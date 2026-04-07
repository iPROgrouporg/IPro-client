import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Logomarqee from "../../components/ui/logomarquee.jsx";
import Achievements from "../../components/ui/achivements.jsx";

gsap.registerPlugin(ScrollTrigger);

const Scroller = ({ t, Logocloud }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const boxes = gsap.utils.toArray(".box");

    const ctx = gsap.context(() => {

      boxes.forEach((box, i) => {
        if (i === 0) return;

        // 🔥 card chiqishi
        gsap.fromTo(
          box,
          { y: "120%", scale: 1 },
          {
            y: "0%",
            scale: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: () => `top -${window.innerHeight * i}`,
              end: () => `+=${window.innerHeight}`,
              scrub: true,
            },
          }
        );

        // 🔥 oldingi card depth effect
        gsap.to(boxes[i - 1], {
          scale: 0.88,
          opacity: 0.4,
          filter: "blur(3px)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: () => `top -${window.innerHeight * (i - 0.5)}`,
            end: () => `top -${window.innerHeight * i}`,
            scrub: true,
          },
        });
      });

      // 🔥 PIN
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => "+=" + window.innerHeight * boxes.length,
        pin: true,
        scrub: true,
      });

      // 🔥 PARALLAX BACKGROUND
      gsap.to(".bg-light", {
        y: "-20%",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: true,
        },
      });

      // 🔥 IMAGE FLOAT EFFECT
      gsap.to(".floating-img", {
        y: -40,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <section className="bg-[#0B0F1A] py-16 md:py-24 overflow-hidden">

        <div>
          <Logomarqee />
        </div>

        {/* 🔥 STACK SECTION */}
        <section
          ref={sectionRef}
          className="relative w-full h-screen overflow-hidden"
        >
          {/* 🌌 PARALLAX LIGHT */}
          <div className="bg-light absolute w-[600px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full top-[-100px] left-[20%]"></div>

          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="box absolute top-0 left-0 w-full h-screen flex items-center justify-center px-6 md:px-12"
              style={{ zIndex: idx + 1 }}
            >
              {/* 🌑 OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A]/80 via-[#0B0F1A]/60 to-[#0B0F1A]/90 z-10"></div>

              <div className="relative z-20 w-full max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

                {/* TEXT */}
                <div className="space-y-6">

                  <p className="text-blue-400 text-xs uppercase tracking-[0.25em]">
                    Company
                  </p>

                  <h1 className="text-white font-bold text-4xl sm:text-5xl md:text-6xl leading-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
                    {t("who_are_we")}
                  </h1>

                  <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl">
                    {t("description1")}
                  </p>

                  <button className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-800 to-indigo-600 hover:opacity-90 transition text-white font-medium shadow-xl">
                    Learn more
                  </button>
                </div>

                {/* IMAGE */}
                <div className="flex justify-center relative">

                  {/* glow */}
                  <div className="absolute w-[300px] h-[300px] bg-purple-600/20 blur-[100px] rounded-full"></div>

                  <img
                    src={Logocloud}
                    alt="Logo"
                    className="floating-img relative max-w-[300px] sm:max-w-[380px] md:max-w-[440px] rounded-2xl border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
                  />
                </div>

              </div>
            </div>
          ))}
        </section>

        <div>
          <Achievements />
        </div>

      </section>
    </div>
  );
};

export default Scroller;