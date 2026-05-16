import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ExternalLink } from 'lucide-react'
import type { ArtistWorkEntry } from '@/data/artist-work'

interface ArtistHeroSectionProps {
  featured: ArtistWorkEntry
}

const platformOrder = ['spotify', 'apple', 'tidal', 'youtube'] as const

const platformLabels: Record<string, string> = {
  spotify: 'Spotify',
  apple: 'Apple Music',
  tidal: 'Tidal',
  youtube: 'YouTube',
}

export default function ArtistHeroSection({ featured }: ArtistHeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    if (contentRef.current) {
      const children = contentRef.current.children
      gsap.set(children, { opacity: 0, y: 30 })
      tl.to(children, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        delay: 0.3,
      })
    }

    return () => {
      tl.kill()
    }
  }, [])

  const primaryLink =
    featured.links.spotify ||
    featured.links.apple ||
    featured.links.youtube ||
    featured.links.tidal

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        minHeight: 'clamp(500px, 75vh, 800px)',
        backgroundColor: 'var(--bg-surface)',
      }}
    >
      {/* Background artwork blur */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${featured.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(60px) saturate(1.2)',
          transform: 'scale(1.2)',
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10,9,8,0.4) 0%, rgba(10,9,8,0.92) 70%, rgba(10,9,8,1) 100%)',
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 content-container flex flex-col items-center justify-center text-center"
        style={{ minHeight: 'clamp(500px, 75vh, 800px)', paddingTop: 120, paddingBottom: 80 }}
      >
        {/* Eyebrow */}
        <span
          className="text-eyebrow mb-4"
          style={{ color: 'var(--accent-amber)', letterSpacing: '0.15em' }}
        >
          FEATURED RELEASE
        </span>

        {/* Artwork */}
        <div
          className="relative rounded-lg overflow-hidden shadow-2xl mb-8"
          style={{ width: 'clamp(240px, 35vw, 380px)', aspectRatio: '1/1' }}
        >
          <img
            src={featured.image}
            alt={featured.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <h1
          className="font-display font-bold leading-tight"
          style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}
        >
          {featured.title}
        </h1>

        {/* Subtitle */}
        {featured.subtitle && (
          <p
            className="mt-2 text-base md:text-lg font-light"
            style={{ color: 'var(--text-secondary)' }}
          >
            {featured.subtitle}
          </p>
        )}

        {/* Year */}
        <span className="mt-1 text-sm" style={{ color: 'var(--text-tertiary)' }}>
          {featured.year}
        </span>

        {/* CTA Links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {platformOrder.map((key) => {
            const url = featured.links[key]
            if (!url) return null
            const isPrimary = url === primaryLink
            return (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium px-5 py-2.5 rounded-md transition-all duration-200"
                style={{
                  backgroundColor: isPrimary ? 'var(--accent-amber)' : 'var(--bg-surface)',
                  color: isPrimary ? 'var(--bg-void)' : 'var(--text-secondary)',
                  border: isPrimary ? 'none' : '1px solid var(--border-color)',
                }}
              >
                {platformLabels[key]}
                <ExternalLink size={12} />
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
