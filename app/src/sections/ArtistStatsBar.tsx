import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { artistProfile } from '@/data/artist-profile'

gsap.registerPlugin(ScrollTrigger)

export default function ArtistStatsBar() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  useEffect(() => {
    if (!itemsRef.current) return
    const items = itemsRef.current.children
    if (items.length === 0) return

    gsap.set(items, { opacity: 0, y: 20 })
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: itemsRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div className="content-container py-12 md:py-16">
        <div
          ref={itemsRef}
          className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4"
        >
          {artistProfile.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-display text-2xl md:text-3xl font-bold"
                style={{ color: 'var(--accent-amber)' }}
              >
                {t(`data.artistProfile.stats.${stat.label.split(' ').map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1)).join('')}`, { defaultValue: stat.value })}
              </div>
              <div
                className="mt-1 text-[11px] font-medium uppercase tracking-wider"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {t(`artistWork.${stat.label.split(' ').map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1)).join('')}`, { defaultValue: stat.label })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
