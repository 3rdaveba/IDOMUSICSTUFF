import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Film, Award, ArrowRight } from 'lucide-react'
import { films } from '@/data/films'

gsap.registerPlugin(ScrollTrigger)

export default function TVFilmSection() {
  const { t } = useTranslation()
  const itemsRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

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
            {t('tvFilm.eyebrow')}
          </span>
          <h2
            className="font-display text-3xl md:text-5xl font-bold leading-tight"
            style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
          >
            {t('tvFilm.heading')}
          </h2>
          <p
            className="mt-3 text-base md:text-lg font-light max-w-2xl"
            style={{ color: 'var(--text-secondary)' }}
          >
            {t('tvFilm.intro')}
          </p>
        </div>

        {/* Credits */}
        <div ref={itemsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {films.map((credit) => (
            <div
              key={credit.id}
              className="group rounded-md overflow-hidden cursor-pointer"
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
              }}
              onClick={() => navigate(`/film/${credit.id}`)}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '9/16' }}>
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
                <span className="inline-flex items-center gap-1 mt-4 text-xs font-medium transition-colors duration-300 group-hover:text-[var(--accent-amber)]" style={{ color: 'var(--text-tertiary)' }}>
                  View details <ArrowRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
