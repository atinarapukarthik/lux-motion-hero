# LUX Motion — Cinematic Automotive Experience

A high-performance, scroll-driven automotive landing page built to demonstrate advanced frontend animation logic and premium UI interactions. Inspired by cinematic automotive reveals and modern web aesthetics.

## 🚀 Live Demo & Repository

- **Live Demo:** [https://YOUR_GITHUB_USERNAME.github.io/lux-motion-hero](https://YOUR_GITHUB_USERNAME.github.io/lux-motion-hero) *(Replace with your GitHub Pages URL once deployed)*
- **GitHub Repository:** [https://github.com/YOUR_GITHUB_USERNAME/lux-motion-hero](https://github.com/YOUR_GITHUB_USERNAME/lux-motion-hero) *(Replace with your Repository URL)*

## ✨ Features

### 1. Cinematic Initial Load Animation
*   **3D Staggered Reveal:** The `W E L C O M E` headline performs a professional 3D `rotateX` flip on load, character by character.
*   **Dynamic Typography:** The subtitle smoothly expands its `letter-spacing` from `0px` to `6px` along with a subtle text shadow glow.
*   **Counting Metrics:** Impact statistics natively count up (e.g., `0%` to `99%`) over 1.5 seconds with snapping easing curves.
*   **Breathe-In Object:** The main automotive subject subtly scales up and reduces blur, anticipating the scroll interaction.

### 2. High-Performance Scroll-Driven Core (GSAP ScrollTrigger)
*   **Heavy Momentum:** Implemented with `scrub: 1.5` for a weighty, premium scroll feel, pinning the hero section for a massive `3500px` scroll distance.
*   **Multi-Layered Depth:** 
    *   **The Object:** The sports car scales significantly (from `0.08` to `1.6`), loses all blur, rotates 8 degrees simulating a curve, and maneuvers to the foreground.
    *   **The Typography:** Concurrently, the headline scales up beyond the viewport boundaries, fades out, and blurs—pushing *away* from the lens.
    *   **The Statistics:** Parallax downward and blur away smoothly.
*   **Atmospheric Lighting:** Vignette intensity dynamically increases as the car approaches the camera.

### 3. Extended Experience (No Blank Screen)
*   **Feature Grid:** Smooth, scroll-triggered reveals for complex aerodynamic, torque, and autonomous capability cards.
*   **Parallax Gallery:** Image showcases featuring independent parallax tilting and hover-zoom overlays.
*   **Premium Footer & CTA:** Glassmorphic call-to-action cards and a branded trailing footer.

## 🛠️ Tech Stack

*   **Framework:** [Next.js (App Router)](https://nextjs.org/) with TypeScript
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (using inline variables and the new CSS theme layer)
*   **Animation Engine:** [GSAP (GreenSock)](https://gsap.com/)
*   **Scroll Intercept:** GSAP `ScrollTrigger` Plugin
*   **Fonts:** `Inter` & `Outfit` (via Google Fonts)

## 🏎️ Running Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_GITHUB_USERNAME/lux-motion-hero.git
    cd lux-motion-hero
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or yarn install / pnpm install / bun install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or yarn dev / pnpm dev / bun dev
    ```

4.  **Open in your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000)

## 📐 Architecture & Performance Notes

*   **Virtual DOM Safety:** Used React `useRef` arrays and `gsap.context()` for robust memory management and automatic cleanup on unmount, preventing ghost triggers.
*   **Hardware Acceleration:** Applied `will-change: transform` and structural `transformStyle: "preserve-3d"` extensively to ensure smooth 60 FPS transitions without main-thread jank.
*   **Optical Enhancements:** Implemented an SVG grain/noise overlay (`noise-overlay`) globally for film-like texture and depth.

---
*Created as part of the 21st.dev Scroll-Driven Hero Section Animation assignment.*
