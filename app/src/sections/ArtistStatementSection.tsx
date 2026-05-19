import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { artistProfile } from '@/data/artist-profile'

gsap.registerPlugin(ScrollTrigger)

export default function ArtistStatementSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const paragraphsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headlineRef.current) {
      gsap.set(headlineRef.current, { opacity: 0, y: 40 })
      gsap.to(headlineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }

    if (paragraphsRef.current) {
      const ps = paragraphsRef.current.children
      if (ps.length > 0) {
        gsap.set(ps, { opacity: 0, y: 24 })
        gsap.to(ps, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: paragraphsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      }
    }
  }, [])

  const { statement } = artistProfile

  return (
    <section
      ref={sectionRef}
      id="artist-statement"
      style={{
        backgroundColor: 'var(--bg-void)',
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
      }}
    >
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Portrait */}
          <div className="relative overflow-hidden rounded w-full" style={{ aspectRatio: '4/5' }}>
            <video
              src="project media/artist work/artist-work-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center">
            <span
              className="text-eyebrow block mb-4"
              style={{ color: 'var(--text-tertiary)' }}
            >
              ABOUT THE ARTIST
            </span>

            <h2
              ref={headlineRef}
              className="font-display text-2xl md:text-4xl font-bold leading-[1.15]"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
            >
              {statement.headline}
            </h2>

            <div ref={paragraphsRef} className="mt-8 space-y-6">
              {statement.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-base md:text-lg font-light leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {p}
                </p>
              ))}
            </div>

            <p
              className="mt-8 text-base md:text-lg font-light leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span className="inline-block mt-2" style={{ color: 'var(--accent-amber)' }}>
                &mdash; {artistProfile.fullName}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
