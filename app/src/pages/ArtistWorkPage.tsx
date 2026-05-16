import { useState, useEffect, useRef } from 'react'
import { ExternalLink, ArrowLeft, Music, PenTool, Users } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { artistWork, artistWorkCategories } from '@/data/artist-work'
import { lenisInstance } from '@/hooks/useLenis'

gsap.registerPlugin(ScrollTrigger)

const categoryIcons: Record<string, React.ReactNode> = {
  feature: <Music size={14} />,
  songwriting: <PenTool size={14} />,
  social: <Users size={14} />,
}

const categoryLabels: Record<string, string> = {
  feature: 'Featured On',
  songwriting: 'Written By',
  social: 'Social',
}

export default function ArtistWorkPage() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const heroRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const filtered =
    activeCategory === 'all'
      ? artistWork
      : artistWork.filter((entry) => entry.category === activeCategory)

  useEffect(() => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [])

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
    }
  }, [])

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.children
    if (cards.length === 0) return

    gsap.set(cards, { opacity: 0, y: 40 })
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  }, [activeCategory])

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-void)' }}>
      <Navigation />

      {/* Hero */}
      <div
        ref={heroRef}
        className="relative w-full flex items-end"
        style={{
          height: 'clamp(300px, 50vh, 500px)',
          background:
            'linear-gradient(to bottom, rgba(10,9,8,0.3) 0%, rgba(10,9,8,1) 100%)',
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: 'var(--bg-surface)' }} />
        <div className="absolute inset-0 opacity-30" style={{ backgroundColor: 'var(--accent-amber)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,9,8,0.1) 0%, rgba(10,9,8,0.95) 100%)' }} />

        <nav className="absolute top-20 left-6 md:left-12 z-10 flex items-center gap-2 text-xs font-medium uppercase tracking-wider">
          <button
            onClick={() => navigate('/')}
            className="transition-colors duration-300 hover:text-[var(--accent-amber)]"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Home
          </button>
          <span style={{ color: 'var(--text-tertiary)' }}>/</span>
          <span style={{ color: 'var(--text-primary)' }}>Artist Work</span>
        </nav>

        <div className="content-container pb-12 relative z-10">
          <span className="text-eyebrow block mb-3" style={{ color: 'var(--text-tertiary)' }}>
            THE PEN & THE VOICE
          </span>
          <h1
            className="font-display text-3xl md:text-5xl font-bold leading-tight max-w-3xl"
            style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
          >
            Artist Work
          </h1>
          <p className="mt-4 text-base md:text-lg font-light max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            A collection of features, songwriting credits, and social collaborations
            that showcase lyricism, creative partnerships, and community-driven artistry.
          </p>
        </div>
      </div>

      {/* Filter + Grid */}
      <div className="content-container py-16">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {artistWorkCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className="text-xs font-medium px-4 py-2 rounded-md transition-all duration-200"
              style={{
                backgroundColor:
                  activeCategory === cat.key
                    ? 'var(--accent-amber)'
                    : 'var(--bg-surface)',
                color:
                  activeCategory === cat.key
                    ? 'var(--bg-void)'
                    : 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Entry Grid */}
        {filtered.length > 0 ? (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {filtered.map((entry) => (
              <div
                key={entry.id}
                className="group flex gap-5 p-5 rounded-md transition-colors duration-200 hover:bg-[var(--bg-surface)]"
                style={{ border: '1px solid var(--border-color)' }}
              >
                {/* Artwork */}
                <div
                  className="flex-shrink-0 overflow-hidden rounded-sm"
                  style={{ width: 120, height: 120 }}
                >
                  <img
                    src={entry.image}
                    alt={`${entry.artist} — ${entry.title}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: 'rgba(196, 149, 106, 0.15)',
                        color: 'var(--accent-amber)',
                      }}
                    >
                      {categoryIcons[entry.category]}
                      {categoryLabels[entry.category]}
                    </span>
                    <span className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
                      {entry.year}
                    </span>
                  </div>

                  <h3
                    className="font-display text-base md:text-lg font-bold truncate"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {entry.title}
                  </h3>
                  <p className="text-sm truncate" style={{ color: 'var(--text-secondary)' }}>
                    {entry.artist}
                  </p>

                  {entry.description && (
                    <p className="mt-2 text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--text-tertiary)' }}>
                      {entry.description}
                    </p>
                  )}

                  {/* Platform Links */}
                  <div className="mt-auto pt-3 flex flex-wrap gap-2">
                    {Object.entries(entry.links).map(([platform, url]) => {
                      if (!url) return null
                      const label =
                        platform === 'spotify'
                          ? 'Spotify'
                          : platform === 'apple'
                            ? 'Apple Music'
                            : platform === 'youtube'
                              ? 'YouTube'
                              : platform === 'tiktok'
                                ? 'TikTok'
                                : platform === 'instagram'
                                  ? 'Instagram'
                                  : platform
                      return (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded transition-colors duration-200 hover:border-[var(--accent-amber)] hover:text-[var(--accent-amber)]"
                          style={{
                            backgroundColor: 'rgba(196, 149, 106, 0.08)',
                            color: 'var(--text-secondary)',
                            border: '1px solid var(--border-color)',
                          }}
                        >
                          {label}
                          <ExternalLink size={10} />
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-base font-light" style={{ color: 'var(--text-secondary)' }}>
              No entries in this category yet.
            </p>
          </div>
        )}
      </div>

      {/* Back to Home */}
      <div className="content-container pb-16">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-sm transition-colors duration-300 hover:text-[var(--accent-amber)]"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
      </div>

      <Footer />
    </div>
  )
}
