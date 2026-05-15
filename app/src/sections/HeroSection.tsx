import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const name1Ref = useRef<HTMLHeadingElement>(null)
  const name2Ref = useRef<HTMLHeadingElement>(null)
  const scrollCueRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.to(eyebrowRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.4,
    })
    tl.to(name1Ref.current, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out',
    }, 0.6)
    tl.to(name2Ref.current, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out',
    }, 0.8)
    tl.to(scrollCueRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    }, 2.0)

    // Scroll cue pulse animation
    gsap.to(dotRef.current, {
      y: 16,
      opacity: 0.8,
      duration: 2,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    })

    return () => {
      tl.kill()
    }
  }, [])

  // Fade out canvas as user scrolls past hero
  useEffect(() => {
    const canvas = document.querySelector('.fixed.top-0.left-0.w-full.h-full') as HTMLElement
    if (!canvas) return

    const tween = gsap.to(canvas, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
        end: 'top 20%',
        scrub: true,
      },
    })

    return () => {
      tween.kill()
    }
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center"
      style={{ height: '100vh', zIndex: 1 }}
    >
      <div className="text-center px-6">
        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          className="text-eyebrow mb-8 opacity-0"
          style={{
            color: 'var(--text-tertiary)',
            letterSpacing: '0.2em',
            transform: 'translateY(-20px)',
          }}
        >
          GRAMMY&reg; AWARD-WINNING VOCAL PRODUCER &middot; MUSIC TECHNOLOGIST &middot; CREATIVE SYSTEMS ARCHITECT &middot; LOS ANGELES
        </p>

        {/* Name */}
        <h1
          className="font-display font-bold leading-[1.05]"
          style={{
            fontSize: 'clamp(40px, 8vw, 72px)',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}
        >
          <span
            ref={name1Ref}
            className="block opacity-0"
            style={{ transform: 'translateY(40px)' }}
          >
            WILLIAM
          </span>
          <span
            ref={name2Ref}
            className="block opacity-0"
            style={{ transform: 'translateY(40px)' }}
          >
            &quot;B.A.&quot; WASHINGTON
          </span>
        </h1>


      </div>

      {/* Scroll Cue */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-0"
      >
        <div
          className="relative"
          style={{ width: 1, height: 48, backgroundColor: 'var(--text-tertiary)' }}
        >
          <div
            ref={dotRef}
            className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: 4,
              height: 4,
              backgroundColor: 'var(--accent-amber)',
              opacity: 0.4,
            }}
          />
        </div>
        <span
          className="text-eyebrow mt-2"
          style={{ color: 'var(--text-tertiary)' }}
        >
          SCROLL
        </span>
      </div>
    </section>
  )
}
