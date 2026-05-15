# Tech Spec — idomusicstuff Portfolio

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.0 | UI framework |
| react-dom | ^19.0 | DOM renderer |
| typescript | ~5.7 | Type safety |
| vite | ^6.0 | Build tool |
| tailwindcss | ^4.0 | Utility CSS |
| @tailwindcss/vite | ^4.0 | Tailwind Vite integration |
| gsap | ^3.12 | Core animation engine, timelines, scroll-driven animations |
| lenis | ^1.1 | Smooth scroll with inertia |
| three | ^0.170 | WebGL particle system (hero background) |
| @types/three | ^0.170 | Three.js type definitions |

No shadcn/ui components needed — the design is fully bespoke with no standard UI patterns (no dialogs, dropdowns, tables, etc.). All components are custom-built.

---

## Component Inventory

### Layout

| Component | Source | Notes |
|-----------|--------|-------|
| Navigation | Custom | Fixed top bar with scroll-aware border. Active section detection via ScrollTrigger. |
| Footer | Custom | Simple two-row layout, no interactivity beyond email link hover. |

### Sections

| Component | Key Animation | Notes |
|-----------|--------------|-------|
| HeroSection | Choreographed entrance timeline + particle canvas fade-out | Orchestrates eyebrow/headline/subtitle stagger via GSAP timeline on mount. |
| WorkSection | Horizontal parallax text + card stagger reveals | "SELECTED"/"WORK" scrub-driven counter-motion. 2×2 project grid. |
| AboutSection | Image curtain reveal + text reveals | Clip-path + scale + blur overlay scrub animation on portrait. Two-column editorial. |
| StatsSection | Count-up numbers + container reveals | `gsap.to` with `snap: { textContent: 1 }` on scroll trigger. |
| ContactSection | Text/form reveals + form state machine | Form with idle/sending/success states. No external backend — Netlify/Formspree attribute. |
| CTABanner | Horizontal parallax text + email reveal | Same parallax technique as WorkSection. |

### Reusable Components

| Component | Source | Used By | Notes |
|-----------|--------|---------|-------|
| ParticleCanvas | Custom (Three.js) | HeroSection | Standalone WebGL canvas. Fixed position, z-index 0. Manages its own renderer/scene/camera lifecycle. |
| ProjectCard | Custom | WorkSection | Image + meta. Hover scale. Optional displacement distortion (see Deviations). |
| ParallaxHeader | Custom | WorkSection, CTABanner | Two-line massive text with scrub-driven counter-motion. Reused pattern extracted into component. |
| ImageReveal | Custom | AboutSection | Clip-path curtain + scale + blur overlay scrub animation. Wrapper around `<img>`. |
| ScrollReveal | Custom (hook) | All sections below hero | Shared scroll-triggered entrance patterns (heading, body, element variants). |
| CustomCursor | Custom | Global | Optional enhancement. Disabled on touch devices. |

### Hooks

| Hook | Purpose |
|------|---------|
| useLenis | Initializes Lenis, syncs with GSAP ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`. Single instance at app root. |
| useScrollReveal | Registers GSAP ScrollTrigger animations for a target ref. Accepts variant config (heading/body/element/stat). Cleans up on unmount. |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Particle system (hero background) | Three.js (raw) | Custom ShaderMaterial with AdditiveBlending. BufferGeometry with position + vertexIndex attributes. Vertex shader: 4-layer transforms (Perlin drift + global flow + mouse displacement + Y-rotation). Fragment shader: radial glow with base/accent color mixing. Mouse via raycaster → PlaneGeometry intersection, lerped uniform. | **High** 🔒 |
| Hero entrance sequence | GSAP timeline | Single `gsap.timeline()` with position-parameter offsets (0.4s, 0.6s, 0.8s, 1.2s, 2.0s). Plays once on mount. | Low |
| Particle canvas fade-out | GSAP ScrollTrigger | Scrubbed opacity tween on canvas element. Trigger: `#about` section. | Low |
| Parallax header (Work + CTA) | GSAP ScrollTrigger | Two scrubbed `gsap.to` tweens per instance — opposite `x` directions. `start: "top bottom"`, `end: "bottom top"`. | Low |
| Project card reveals | GSAP ScrollTrigger | Batch stagger reveal — `opacity`, `y`, `scale`. 0.12s stagger. | Low |
| Image curtain reveal | GSAP ScrollTrigger | Scrubbed `clipPath` + `scale` tween on image. Simultaneous blur overlay opacity fade. `end: "+=35%"`. | Medium |
| Heading/body text reveals | GSAP ScrollTrigger | Reusable ScrollReveal hook. Standard `opacity` + `translateY` with easing variants. | Low |
| Stat count-up | GSAP ScrollTrigger | `gsap.to` on `textContent` with `snap: { textContent: 1 }`. 1.5s duration, 0.2s stagger. | Low |
| Scroll cue pulse | GSAP | Infinite `yoyo` repeat — opacity + translateY on dot, 2s cycle. Plays continuously in hero. | Low |
| Displacement distortion (optional) | Three.js (raw) | Perlin-noise UV displacement on hover. See Deviations. | **High** 🔒 |
| Custom cursor | requestAnimationFrame | Lerp-based position tracking. Scale transition on hoverable elements via CSS class detection. | Low |

---

## State & Logic

### Form State Machine

Contact form uses a 3-state machine: `idle` → `sending` → `success`. Managed with `useState`. No external library needed — the form submits via native POST to Netlify/Formspree. The "sending" state is visual only (button text + pulse animation). On success, the form container fades out and is replaced by a success message.

### Particle System Lifecycle

The Three.js canvas is **not** React-managed. It uses an imperative ref pattern:

- `ParticleCanvas` creates its own `WebGLRenderer`, `Scene`, `Camera`, and animation loop via `useEffect`.
- The render loop runs via `requestAnimationFrame`, not React state.
- An `IntersectionObserver` (threshold 0.1) pauses/resumes the RAF loop when the hero exits/enters viewport.
- Mouse coordinates are tracked via a `useRef` (not state) and passed directly to the shader uniform each frame.
- On unmount, the effect disposes geometry, material, renderer, and cancels RAF.

### Lenis ↔ ScrollTrigger Sync

Lenis must be initialized once at the app root. The `lenis.on('scroll', ScrollTrigger.update)` bridge is the only coupling point. Lenis instance should be accessible to components that need scroll-to (nav links) via a ref or context — but not React state.

---

## Other Key Decisions

### Raw Three.js over R3F

The design has a single, self-contained WebGL effect (hero particles) with custom shaders and no 3D scene graph complexity. Raw Three.js is more appropriate than React Three Fiber — the particle system is imperative by nature (RAF loop, direct uniform updates, manual disposal) and wrapping it in R3F's declarative model adds abstraction without benefit. The displacement distortion (if implemented) is a second isolated Three.js canvas, not a unified 3D scene.

### No shadcn/ui

The design contains no standard UI patterns (no dialogs, dropdowns, sheets, tables, command palettes). Every element is bespoke. Adding shadcn would introduce unused infrastructure. The contact form is a simple 4-field form with custom-styled inputs — trivial to build directly.

### Image Strategy

All project images and the portrait are photographic assets (not procedural/CSS). Use standard `<img>` with `loading="lazy"` (except the portrait which is above the fold). The portrait uses the `ImageReveal` wrapper for the clip-path animation. No Next.js Image component — this is a Vite static build, use optimized assets in `public/`.
