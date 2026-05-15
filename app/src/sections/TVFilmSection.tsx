import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Film, Award } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const credits = [
  {
    id: 'sinners',
    title: 'Sinners',
    studio: 'Warner Bros.',
    year: 2025,
    role: 'Featured Vocalist — Original Motion Picture Soundtrack',
    recognition: 'GRAMMY® Award Winner',
    description:
      'Featured vocalist on the original motion picture soundtrack for Ryan Coogler\'s Sinners. Contributed vocal performances that anchored key emotional moments in the film. The soundtrack received a GRAMMY® Award, marking my first win as a credited artist.',
    image: 'images/film-sinners.jpg',
  },
  {
    id: 'kpops',
    title: 'K-Pops!',
    studio: 'Anderson .Paak',
    year: 2024,
    role: 'Featured Actor & Onscreen Performer',
    recognition: 'Featured Film Performance',
    description:
      'Acted and performed onscreen in K-Pops!, a film by Anderson .Paak. Brought both musical performance and screen presence to the project, bridging the worlds of film and music in a unique creative collaboration.',
    image: 'images/film-kpops.jpg',
  },
]

export default function TVFilmSection() {
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!itemsRef.current) return
    const items = itemsRef.current.children
    if (items.length === 0) return

    gsap.set(items, { opacity: 0, y: 50 })
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: itemsRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  }, [])

  return (
    <section
      id="tv-film"
      style={{
        backgroundColor: 'var(--bg-void)',
        paddingTop: '60px',
        paddingBottom: '60px',
      }}
    >
      <div className="content-container">
        {/* Header */}
        <div className="mb-10">
          <span className="text-eyebrow block mb-3" style={{ color: 'var(--text-tertiary)' }}>
            SCREEN & SOUNDTRACK
          </span>
          <h2
            className="font-display text-3xl md:text-5xl font-bold leading-tight"
            style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
          >
            Film & Television
          </h2>
          <p
            className="mt-3 text-base md:text-lg font-light max-w-2xl"
            style={{ color: 'var(--text-secondary)' }}
          >
            Bridging music and visual storytelling — from GRAMMY-winning soundtracks
            to onscreen performances alongside industry icons.
          </p>
        </div>

        {/* Credits */}
        <div ref={itemsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {credits.map((credit) => (
            <div
              key={credit.id}
              className="group rounded-md overflow-hidden"
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
                <img
                  src={credit.image}
                  alt={credit.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(20,18,16,0.9) 0%, rgba(20,18,16,0.1) 60%)',
                  }}
                />
                {/* Recognition badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded flex items-center gap-1"
                    style={{
                      backgroundColor: 'rgba(196, 149, 106, 0.9)',
                      color: 'var(--bg-void)',
                    }}
                  >
                    <Award size={10} />
                    {credit.recognition}
                  </span>
                </div>
                {/* Title overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3
                    className="font-display text-2xl md:text-3xl font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {credit.title}
                  </h3>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="flex items-center gap-1 text-[11px] font-medium" style={{ color: 'var(--accent-amber)' }}>
                    <Film size={12} /> {credit.studio}
                  </span>
                  <span className="text-eyebrow" style={{ color: 'var(--text-tertiary)' }}>
                    {credit.year}
                  </span>
                </div>
                <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  {credit.role}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {credit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
