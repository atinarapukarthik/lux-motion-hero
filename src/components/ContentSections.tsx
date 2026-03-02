"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── DATA ─── */
const FEATURES = [
    {
        number: "01",
        title: "Aerodynamic Precision",
        description:
            "Every curve is sculpted in the wind tunnel. The result is a drag coefficient of just 0.22 — slicing through air with surgical precision.",
        stat: "0.22 Cd",
    },
    {
        number: "02",
        title: "Electric Torque",
        description:
            "Instant power delivery from zero RPM. Dual-motor AWD provides 850 HP of neck-snapping acceleration with zero emissions.",
        stat: "850 HP",
    },
    {
        number: "03",
        title: "Autonomous Drive",
        description:
            "Level 4 self-driving with LiDAR fusion and neural path planning. The road ahead is mapped 300 meters in advance.",
        stat: "L4 Ready",
    },
];

const GALLERY = [
    {
        src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
        alt: "Interior cockpit",
        label: "Cockpit",
    },
    {
        src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80",
        alt: "Exterior detail",
        label: "Exterior",
    },
    {
        src: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
        alt: "Night drive",
        label: "Night Mode",
    },
];

export default function ContentSections() {
    const featuresRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            /* ── Feature cards stagger ── */
            gsap.utils.toArray<HTMLElement>(".feature-card").forEach((card) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 80, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1.0,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            end: "top 50%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });

            /* ── Gallery parallax ── */
            gsap.utils.toArray<HTMLElement>(".gallery-item").forEach((item, i) => {
                gsap.fromTo(
                    item,
                    { opacity: 0, y: 60, rotation: i % 2 === 0 ? -3 : 3 },
                    {
                        opacity: 1,
                        y: 0,
                        rotation: 0,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 90%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });

            /* ── CTA reveal ── */
            if (ctaRef.current) {
                gsap.fromTo(
                    ctaRef.current,
                    { opacity: 0, y: 50, scale: 0.9 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: ctaRef.current,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* ═══════════ DIVIDER ═══════════ */}
            <div className="relative z-10 flex flex-col items-center py-20 bg-[#050505]">
                <div className="w-[1px] h-20 bg-gradient-to-b from-orange-500/60 to-transparent rounded-full shadow-[0_0_15px_rgba(232,93,4,0.4)]" />
                <p className="mt-6 text-[10px] uppercase tracking-[0.5em] text-neutral-600 font-light">
                    Beyond the horizon
                </p>
            </div>

            {/* ═══════════ FEATURES ═══════════ */}
            <section
                ref={featuresRef}
                className="relative z-10 bg-[#050505] px-6 md:px-12 lg:px-20 pb-32"
            >
                <div className="mx-auto max-w-6xl">
                    {/* Section heading */}
                    <div className="mb-20 text-center">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-orange-500 font-medium mb-3">
                            Engineering
                        </p>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                            Built for the future
                        </h2>
                    </div>

                    {/* Feature cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {FEATURES.map((f, i) => (
                            <div
                                key={i}
                                className="feature-card group relative rounded-2xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-sm p-8 transition-all duration-500 hover:border-orange-500/20 hover:bg-white/[0.04] hover:shadow-[0_0_60px_rgba(232,93,4,0.08)]"
                            >
                                {/* Number badge */}
                                <span className="mb-6 inline-block text-[11px] font-bold tracking-widest text-orange-500/70 uppercase">
                                    {f.number}
                                </span>

                                {/* Title */}
                                <h3 className="mb-3 text-xl font-semibold tracking-tight text-white group-hover:text-orange-50 transition-colors">
                                    {f.title}
                                </h3>

                                {/* Description */}
                                <p className="mb-6 text-sm leading-relaxed text-neutral-500 group-hover:text-neutral-400 transition-colors">
                                    {f.description}
                                </p>

                                {/* Stat */}
                                <div className="mt-auto pt-6 border-t border-white/[0.05]">
                                    <span className="text-3xl font-extralight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-500">
                                        {f.stat}
                                    </span>
                                </div>

                                {/* Hover glow */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-orange-500/[0.03] to-transparent" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ GALLERY ═══════════ */}
            <section
                ref={galleryRef}
                className="relative z-10 bg-[#050505] px-6 md:px-12 lg:px-20 pb-32"
            >
                <div className="mx-auto max-w-6xl">
                    <div className="mb-16 text-center">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-orange-500 font-medium mb-3">
                            Gallery
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                            Every angle, perfected
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {GALLERY.map((img, i) => (
                            <div
                                key={i}
                                className="gallery-item group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.05] cursor-pointer"
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    crossOrigin="anonymous"
                                    loading="lazy"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                    <span className="text-sm font-medium uppercase tracking-widest text-white">
                                        {img.label}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ CTA ═══════════ */}
            <section className="relative z-10 bg-[#050505] px-6 md:px-12 lg:px-20 pb-24">
                <div
                    ref={ctaRef}
                    className="mx-auto max-w-4xl text-center rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-xl py-20 px-8 shadow-[0_8px_80px_rgba(0,0,0,0.5)]"
                >
                    <p className="text-[10px] uppercase tracking-[0.5em] text-orange-500 font-medium mb-4">
                        Reserve yours
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
                        The future is in motion
                    </h2>
                    <p className="mx-auto max-w-lg text-sm md:text-base text-neutral-500 mb-10 leading-relaxed">
                        Join the waitlist for early access. Experience what happens when precision engineering meets cinematic design.
                    </p>
                    <button className="group relative inline-flex items-center gap-3 rounded-full border border-orange-500/30 bg-orange-500/10 px-8 py-4 text-sm font-medium uppercase tracking-widest text-orange-400 transition-all duration-500 hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:shadow-[0_0_40px_rgba(232,93,4,0.4)]">
                        <span>Get early access</span>
                        <svg
                            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </section>

            {/* ═══════════ FOOTER ═══════════ */}
            <footer className="relative z-10 bg-[#050505] border-t border-white/[0.04] py-12 px-6">
                <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-orange-500 glow-dot" />
                        <span className="text-sm font-semibold tracking-widest uppercase text-white">
                            Lux Motion
                        </span>
                    </div>
                    <p className="text-[11px] text-neutral-600 tracking-wide">
                        © 2026 LUX Motion. Crafted with Next.js, GSAP & Tailwind CSS.
                    </p>
                    <div className="flex gap-6">
                        {["GitHub", "LinkedIn", "Twitter"].map((s) => (
                            <a
                                key={s}
                                href="#"
                                className="text-[11px] uppercase tracking-widest text-neutral-600 hover:text-orange-500 transition-colors duration-300"
                            >
                                {s}
                            </a>
                        ))}
                    </div>
                </div>
            </footer>
        </>
    );
}
