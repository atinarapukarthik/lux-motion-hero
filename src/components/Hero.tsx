"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── DATA ─── */
const HEADLINE = "WELCOME";
const STATS = [
    { value: 99, suffix: "%", label: "Efficiency" },
    { value: 0.2, suffix: "s", label: "Response", decimals: 1 },
    { value: 24, suffix: "/7", label: "Control" },
];

const CAR_IMAGE =
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=90";

/* ─── COMPONENT ─── */
export default function Hero() {
    /* Refs */
    const sectionRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const statsBarRef = useRef<HTMLDivElement>(null);
    const statValuesRef = useRef<(HTMLSpanElement | null)[]>([]);
    const carWrapRef = useRef<HTMLDivElement>(null);
    const carImgRef = useRef<HTMLImageElement>(null);
    const scrollCueRef = useRef<HTMLDivElement>(null);
    const vignetteRef = useRef<HTMLDivElement>(null);
    const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

    /* Letter ref setter */
    const setLetterRef = useCallback(
        (el: HTMLSpanElement | null, i: number) => {
            lettersRef.current[i] = el;
        },
        []
    );

    /* Stat value ref setter */
    const setStatRef = useCallback(
        (el: HTMLSpanElement | null, i: number) => {
            statValuesRef.current[i] = el;
        },
        []
    );

    /* Line ref setter */
    const setLineRef = useCallback(
        (el: HTMLDivElement | null, i: number) => {
            lineRefs.current[i] = el;
        },
        []
    );

    useEffect(() => {
        const ctx = gsap.context(() => {
            /* ════════════════════════════════════════════
               PHASE 1 — INTRO TIMELINE (on mount)
               ════════════════════════════════════════════ */
            const intro = gsap.timeline({ defaults: { ease: "power4.out" } });

            // 1a. Letters staggered 3D flip
            intro.fromTo(
                lettersRef.current.filter(Boolean),
                {
                    opacity: 0,
                    rotateX: -90,
                    y: 60,
                    scale: 0.8,
                    transformOrigin: "50% 100% -40px",
                },
                {
                    opacity: 1,
                    rotateX: 0,
                    y: 0,
                    scale: 1,
                    stagger: 0.07,
                    duration: 1.4,
                    delay: 0.3,
                }
            );

            // 1b. Subtitle slides in with letter-spacing expansion
            intro.fromTo(
                subtitleRef.current,
                { opacity: 0, y: 30, letterSpacing: "0px" },
                { opacity: 1, y: 0, letterSpacing: "6px", duration: 1.0 },
                "-=0.9"
            );

            // 1c. Stat bar slides up + fades in
            intro.fromTo(
                statsBarRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1.0 },
                "-=0.6"
            );

            // 1d. Decorative vertical lines draw in
            intro.fromTo(
                lineRefs.current.filter(Boolean),
                { scaleY: 0, opacity: 0 },
                { scaleY: 1, opacity: 1, stagger: 0.15, duration: 1.0, transformOrigin: "top center" },
                "-=0.8"
            );

            // 1e. Counter count-up
            statValuesRef.current.forEach((el, i) => {
                if (!el) return;
                const target = STATS[i].value;
                const decimals = STATS[i].decimals ?? 0;
                gsap.fromTo(
                    el,
                    { innerText: "0" },
                    {
                        innerText: target,
                        duration: 2.0,
                        ease: "power3.out",
                        snap: { innerText: decimals === 0 ? 1 : 0.1 },
                        delay: 1.2,
                        onUpdate() {
                            const val = parseFloat(this.targets()[0].innerText).toFixed(decimals);
                            el.textContent = val + STATS[i].suffix;
                        },
                    }
                );
            });

            // 1f. Car initial breathe-in (tiny visible seed)
            gsap.fromTo(
                carImgRef.current,
                { scale: 0.08, filter: "blur(40px) brightness(0.4)", opacity: 0 },
                {
                    scale: 0.15,
                    filter: "blur(18px) brightness(0.6)",
                    opacity: 1,
                    duration: 2.5,
                    ease: "power2.out",
                    delay: 0.6,
                }
            );

            // 1g. Scroll cue pulse
            intro.fromTo(
                scrollCueRef.current,
                { opacity: 0, y: -10 },
                { opacity: 1, y: 0, duration: 0.8 },
                "-=0.3"
            );

            /* ════════════════════════════════════════════
               PHASE 2 — SCROLL-DRIVEN TIMELINE
               ════════════════════════════════════════════ */
            const drive = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=200%",       // 200vh scroll distance for cinematic pacing
                    pin: true,
                    scrub: 1.5,          // heavy momentum
                    anticipatePin: 1,
                },
            });

            /* — Headline: zoom out + blur + fade — */
            drive.to(
                headlineRef.current,
                { scale: 1.8, opacity: 0, y: -200, filter: "blur(16px)", ease: "power2.in" },
                0
            );

            /* — Subtitle: quick fade — */
            drive.to(subtitleRef.current, { opacity: 0, y: -80, duration: 0.3 }, 0);

            /* — Stats bar: parallax drop — */
            drive.to(statsBarRef.current, { opacity: 0, y: 180, filter: "blur(10px)" }, 0);

            /* — Scroll cue: disappear instantly — */
            drive.to(scrollCueRef.current, { opacity: 0, duration: 0.15 }, 0);

            /* — Decorative lines fade  — */
            drive.to(lineRefs.current.filter(Boolean), { opacity: 0, scaleY: 0, stagger: 0.05 }, 0);

            /* — THE CAR: the hero moment — */
            drive.to(
                carImgRef.current,
                {
                    scale: 1.6,
                    filter: "blur(0px) brightness(1)",
                    xPercent: 45,
                    yPercent: 25,
                    rotation: 8,
                    ease: "power1.inOut",
                },
                0
            );

            /* — Vignette intensifies as car approaches — */
            drive.to(vignetteRef.current, { opacity: 0.9 }, 0);
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="relative h-screen w-full overflow-hidden bg-[#050505] flex flex-col items-center justify-center"
        >
            {/* ── Ambient Vignette ── */}
            <div
                ref={vignetteRef}
                className="pointer-events-none absolute inset-0 z-[5] opacity-50"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, #050505 100%)",
                }}
            />

            {/* ── Perspective Grid Floor ── */}
            <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" style={{ perspective: "800px" }}>
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage:
                            "linear-gradient(to bottom, transparent 49.5%, rgba(255,255,255,0.15) 50%, transparent 50.5%), linear-gradient(to right, transparent 49.5%, rgba(255,255,255,0.08) 50%, transparent 50.5%)",
                        backgroundSize: "80px 80px",
                        transform: "rotateX(55deg) translateY(-60%) scale(3)",
                        transformOrigin: "center top",
                    }}
                />
            </div>

            {/* ── Decorative vertical accent lines ── */}
            <div
                ref={(el) => setLineRef(el, 0)}
                className="absolute left-[8%] top-[15%] w-[1px] h-[120px] bg-gradient-to-b from-orange-500/60 to-transparent z-[6] will-change-transform origin-top"
            />
            <div
                ref={(el) => setLineRef(el, 1)}
                className="absolute right-[8%] bottom-[15%] w-[1px] h-[100px] bg-gradient-to-t from-orange-500/40 to-transparent z-[6] will-change-transform origin-top"
            />
            <div
                ref={(el) => setLineRef(el, 2)}
                className="absolute left-[50%] top-0 w-[1px] h-[60px] bg-gradient-to-b from-white/10 to-transparent z-[6] will-change-transform origin-top"
            />

            {/* ── Headline Group ── */}
            <div className="relative z-[15] flex flex-col items-center" style={{ perspective: "1200px" }}>
                {/* Tag line */}
                <p
                    ref={subtitleRef}
                    className="mb-5 text-[10px] md:text-xs font-medium uppercase text-orange-500 will-change-transform"
                    style={{
                        textShadow: "0 0 20px rgba(232,93,4,0.7)",
                    }}
                >
                    Precision Engineered Motion
                </p>

                {/* WELCOME */}
                <h1
                    ref={headlineRef}
                    className="flex text-[15vw] md:text-[12vw] lg:text-[11vw] font-black uppercase leading-none tracking-[0.25em] will-change-transform"
                    style={{
                        textShadow: "0 30px 80px rgba(0,0,0,0.9)",
                        transformStyle: "preserve-3d",
                    }}
                >
                    {HEADLINE.split("").map((char, i) => (
                        <span
                            key={i}
                            ref={(el) => setLetterRef(el, i)}
                            className="inline-block will-change-transform"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {char}
                        </span>
                    ))}
                </h1>
            </div>

            {/* ── Car Layer ── */}
            <div
                ref={carWrapRef}
                className="absolute inset-0 z-[10] flex items-center justify-center pointer-events-none"
            >
                <div className="relative w-full max-w-[1100px] aspect-video flex items-center justify-center">
                    <img
                        ref={carImgRef}
                        src={CAR_IMAGE}
                        alt="Premium sports car — cinematic hero"
                        className="w-full h-auto object-cover rounded-2xl will-change-transform"
                        style={{
                            filter: "blur(40px) brightness(0.4)",
                            transform: "scale(0.08)",
                        }}
                        crossOrigin="anonymous"
                        loading="eager"
                        fetchPriority="high"
                    />
                    {/* Underglow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] rounded-full bg-orange-500/10 blur-[120px] mix-blend-screen" />
                </div>
            </div>

            {/* ── Impact Stats Bar ── */}
            <div
                ref={statsBarRef}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[20] w-[92%] max-w-5xl will-change-transform"
            >
                <div className="grid grid-cols-3 gap-6 text-center rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl py-6 px-4 shadow-[0_8px_60px_rgba(0,0,0,0.6)]">
                    {STATS.map((s, i) => (
                        <div key={i} className="flex flex-col items-center gap-1.5">
                            <span className="flex items-center gap-2 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                                <span className="glow-dot inline-block h-1.5 w-1.5 rounded-full bg-orange-500" />
                                {s.label}
                            </span>
                            <span
                                ref={(el) => setStatRef(el, i)}
                                className="text-4xl md:text-6xl font-extralight tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-neutral-600"
                            >
                                0{s.suffix}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Scroll Cue ── */}
            <div
                ref={scrollCueRef}
                className="absolute bottom-[140px] md:bottom-[160px] left-1/2 -translate-x-1/2 z-[20] flex flex-col items-center gap-2 opacity-0"
            >
                <span className="text-[9px] uppercase tracking-[0.4em] text-neutral-600 font-light">
                    Scroll to drive
                </span>
                <div className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center pt-1.5">
                    <div className="w-[3px] h-[8px] rounded-full bg-orange-500/80 animate-bounce" />
                </div>
            </div>
        </section>
    );
}
