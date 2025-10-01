import { useEffect, useRef } from "react";

export default function CursorTrail() {
    const particlesRef = useRef([]);
    const lastSpawnRef = useRef(0);
    const lastPosRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    // sozlamalar
    const particleSize = 12;       // boshlang'ich diametr
    const particleScale = 0.15;    // oxirgi kattalik
    const lifetime = 700;          // ms
    const spawnInterval = 16;      // ms
    const maxParticles = 100;      // ekrandagi maksimal nuqtalar
    const color = "linear-gradient(135deg,#7c3aed,#06b6d4)";
    const blur = 6;

    useEffect(() => {
        function maybeSpawn(ts) {
            if (ts - lastSpawnRef.current < spawnInterval) return;
            lastSpawnRef.current = ts;
            spawnParticle(lastPosRef.current.x, lastPosRef.current.y);
        }

        function spawnParticle(x, y) {
            const particles = particlesRef.current;
            if (particles.length >= maxParticles) {
                const old = particles.shift();
                if (old?.node) old.node.remove();
            }

            const el = document.createElement("div");
            el.className =
                "fixed rounded-full pointer-events-none mix-blend-screen z-[9998]";
            el.style.width = particleSize + "px";
            el.style.height = particleSize + "px";
            el.style.left = x + "px";
            el.style.top = y + "px";
            el.style.transform = "translate(-50%,-50%)";
            el.style.background = color;
            el.style.filter = `blur(${blur}px)`;
            el.style.opacity = "0.9";
            el.style.transition = `transform ${lifetime}ms linear, opacity ${lifetime}ms linear`;

            document.body.appendChild(el);

            requestAnimationFrame(() => {
                el.style.transform = `translate(-50%,-50%) scale(${particleScale}) translateY(-12px)`;
                el.style.opacity = "0";
            });

            particles.push({ node: el, createdAt: performance.now() });
            setTimeout(() => {
                el.remove();
                particlesRef.current = particlesRef.current.filter((p) => p.node !== el);
            }, lifetime + 80);
        }

        function onMove(e) {
            lastPosRef.current = { x: e.clientX, y: e.clientY };
            maybeSpawn(performance.now());
        }
        function onTouch(e) {
            if (e.touches[0]) {
                lastPosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                maybeSpawn(performance.now());
            }
        }

        window.addEventListener("mousemove", onMove);
        window.addEventListener("touchmove", onTouch, { passive: true });

        let raf;
        function loop(ts) {
            maybeSpawn(ts);
            raf = requestAnimationFrame(loop);
        }
        raf = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("touchmove", onTouch);
            particlesRef.current.forEach((p) => p.node?.remove());
            particlesRef.current = [];
        };
    }, []);

    return null;
}
