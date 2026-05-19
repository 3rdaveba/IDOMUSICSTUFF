import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { number: 15, suffix: '+', label: 'Years in Music' },
  { number: 4, suffix: '', label: 'Certifications' },
  { number: 50, suffix: '+', label: 'Projects Completed' },
]

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const statRefs = useRef<(HTMLDivElement | null)[]>([])
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const elements = statRefs.current.filter(Boolean)
    if (elements.length === 0) return

    // Container reveal
    gsap.set(elements, { opacity: 0, y: 40 })
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power3.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    // Count up numbers
    numberRefs.current.forEach((numEl, i) => {
      if (!numEl) return
      const target = stats[i].number

      gsap.fromTo(
        numEl,
        { textContent: '0' },
        {
          textContent: target,
          duration: 1.5,
          ease: 'power2.out',
          snap: { textContent: 1 },
          delay: i * 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: 'var(--bg-surface)', padding: '80px 0' }}
    >
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => { statRefs.current[i] = el }}
              className="text-center"
            >
              <span
                ref={(el) => { numberRefs.current[i] = el }}
                className="font-display text-5xl md:text-6xl font-bold"
                style={{ color: 'var(--accent-amber)' }}
              >
                0
              </span>
              <span
                className="font-display text-5xl md:text-6xl font-bold"
                style={{ color: 'var(--accent-amber)' }}
              >
                {stat.suffix}
              </span>
              <p
                className="mt-4 text-sm font-medium uppercase tracking-widest"
                style={{ color: 'var(--text-secondary)' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
