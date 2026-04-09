import { animate, cubicBezier, scroll } from "motion";
import { useEffect, useRef } from "react";
import "./style.css";

export const Test = () => {
  const imageRef = useRef(null);
  const firstSectionRef = useRef(null);
  const layersRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const image = imageRef.current;
    const firstSection = firstSectionRef.current;
    const layers = layersRef.current;

    const naturalWidth = image.offsetWidth;
    const naturalHeight = image.offsetHeight;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Center image animation
    scroll(
      animate(
        image,
        { width: [viewportWidth, naturalWidth], height: [viewportHeight, naturalHeight] },
        {
          width: { easing: cubicBezier(0.65, 0, 0.35, 1) },
          height: { easing: cubicBezier(0.42, 0, 0.58, 1) },
        }
      ),
      { target: firstSection, offset: ["start start", "80% end end"] }
    );

    const scaleEasings = [
      cubicBezier(0.42, 0, 0.58, 1),
      cubicBezier(0.76, 0, 0.24, 1),
      cubicBezier(0.87, 0, 0.13, 1),
    ];

    layers.forEach((layer, index) => {
      const endOffset = `${1 - index * 0.05} end`;

      scroll(
        animate(layer, { opacity: [0, 0, 1] }, { offset: [0, 0.55, 1], easing: cubicBezier(0.61, 1, 0.88, 1) }),
        { target: firstSection, offset: ["start start", endOffset] }
      );

      scroll(
        animate(layer, { scale: [0, 0, 1] }, { offset: [0, 0.3, 1], easing: scaleEasings[index] }),
        { target: firstSection, offset: ["start start", endOffset] }
      );
    });
  }, []);

  return (
    <div className="content-wrap">
      <header>
        <h1 className="fluid">
          let's <br />scroll.
        </h1>
        <h2 className="fluid">
          Origionally from{" "}
          <a href="https://codepen.io/jh3y/pen/VYZwOwd" target="_blank">
            Jhey →
          </a>
          , converted to Motion
        </h2>
      </header>

      <main>
        <section ref={firstSectionRef}>
          <div className="content">
            <div className="grid">
              {/* Layer 1: Outer edges */}
              <div className="layer" ref={(el) => (layersRef.current[0] = el)}>
                <div>
                  <img src="https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=800&auto=format&fit=crop&q=60" alt="" />
                </div>
                <div>
                  <img src="https://images.unsplash.com/photo-1556304044-0699e31c6a34?w=800&auto=format&fit=crop&q=60" alt="" />
                </div>
                <div>
                  <img src="https://images.unsplash.com/photo-1590330297626-d7aff25a0431?w=800&auto=format&fit=crop&q=60" alt="" />
                </div>
                <div>
                  <img src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&auto=format&fit=crop&q=60" alt="" />
                </div>
                <div>
                  <img src="https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800&auto=format&fit=crop&q=60" alt="" />
                </div>
                <div>
                  <img src="https://images.unsplash.com/photo-1565321590372-09331b9dd1eb?w=800&auto=format&fit=crop&q=60" alt="" />
                </div>
              </div>

              {/* Layer 2: Inner columns */}
              <div className="layer" ref={(el) => (layersRef.current[1] = el)}>
                <div>
                  <img src="https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=800&auto=format&fit=crop&q=60" alt="" />
                </div>
                <div>
                  <img src="https://images.unsplash.com/photo-1637414165749-9b3cd88b8271?w=800&auto=format&fit=crop&q=60" alt="" />
                </div>
                <div>
                  <img src="https://images.unsplash.com/photo-1699911251220-8e0de3b5ce88?w=800&auto=format&fit=crop&q=60" alt="" />
                </div>
                <div>
                  <img src="https://images.unsplash.com/photo-1667483629944-6414ad0648c5?w=800&auto=format&fit=crop&q=60" alt="" />
                </div>
                <div>
                  <img src="https://plus.unsplash.com/premium_photo-1706078438060-d76ced26d8d5?w=800&auto=format&fit=crop&q=60" alt="" />
                </div>
                <div>
                  <img src="https://images.unsplash.com/photo-1525385444278-b7968e7e28dc?w=800&auto=format&fit=crop&q=60" alt="" />
                </div>
              </div>

              {/* Layer 3: Center top/bottom */}
              <div className="layer" ref={(el) => (layersRef.current[2] = el)}>
                <div>
                  <img src="https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?w=800&auto=format&fit=crop&q=60" alt="" />
                </div>
                <div>
                  <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60" alt="" />
                </div>
              </div>

              {/* Center scaler */}
              <div className="scaler">
                <img
                  ref={imageRef}
                  src="https://assets.codepen.io/605876/model-shades.jpg?format=auto&quality=100"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="fluid">fin.</h2>
        </section>
      </main>
    </div>
  );
}