import { useState, useEffect, useRef } from 'react'
import { ExternalLink, ArrowLeft, Play, Video, Music, Users, Disc3 } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import VideoLightbox from '@/components/VideoLightbox'
import { artistWork, artistWorkCategories } from '@/data/artist-work'
import { lenisInstance } from '@/hooks/useLenis'

gsap.registerPlugin(ScrollTrigger)

const subcategoryLabels: Record<string, string> = {
  solo: 'Solo',
  feature: 'Feature',
  'music-video': 'Music Video',
  'lyric-video': 'Lyric Video',
  collaboration: 'Collab',
}

const subcategoryIcons: Record<string, React.ReactNode> = {
  solo: <Disc3 size={12} />,
  feature: <Music size={12} />,
  'music-video': <Video size={12} />,
  'lyric-video': <Play size={12} />,
  collaboration: <Users size={12} />,
}

const platformLabels: Record<string, string> = {
  spotify: 'Spotify',
  apple: 'Apple Music',
  youtube: 'YouTube',
  tidal: 'Tidal',
  tiktok: 'TikTok',
  instagram: 'Instagram',
  soundcloud: 'SoundCloud',
}

function extractYouTubeId(url?: string): string | null {
  if (!url) return null
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ]
  for (const p of patterns) {
    const m = url.match(p)
    if (m) return m[1]
  }
  return null
}

export default function ArtistWorkPage() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [lightboxVideo, setLightboxVideo] = useState<{ id: string; title: string } | null>(null)
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

  const isVideoCategory = (cat: string) => cat === 'video'

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
            B.A.
          </span>
          <h1
            className="font-display text-3xl md:text-5xl font-bold leading-tight max-w-3xl"
            style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
          >
            Artist Work
          </h1>
          <p className="mt-4 text-base md:text-lg font-light max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            Solo releases, features, music videos, and social collaborations — all under the name B.A.
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
            {filtered.map((entry) => {
              const youtubeId = extractYouTubeId(entry.links.youtube)
              const isClickable = !!youtubeId

              return (
                <div
                  key={entry.id}
                  className="group flex gap-5 p-5 rounded-md transition-colors duration-200 hover:bg-[var(--bg-surface)]"
                  style={{ border: '1px solid var(--border-color)' }}
                >
                  {/* Artwork / Thumbnail */}
                  <div
                    className={`flex-shrink-0 overflow-hidden rounded-sm relative ${isClickable ? 'cursor-pointer' : ''}`}
                    style={{ width: 140, height: 140 }}
                    onClick={() => {
                      if (youtubeId) {
                        setLightboxVideo({ id: youtubeId, title: entry.title })
                      }
                    }}
                  >
                    {entry.image ? (
                      <img
                        src={entry.image}
                        alt={entry.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ backgroundColor: 'var(--bg-surface-elevated)' }}
                      >
                        {isVideoCategory(entry.category) ? (
                          <Video size={32} style={{ color: 'var(--text-tertiary)' }} />
                        ) : (
                          <Music size={32} style={{ color: 'var(--text-tertiary)' }} />
                        )}
                      </div>
                    )}

                    {/* Play overlay for YouTube embeddable entries */}
                    {isClickable && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-80 group-hover:opacity-100 transition-opacity">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                        >
                          <Play size={16} fill="var(--bg-void)" style={{ color: 'var(--bg-void)' }} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: 'rgba(196, 149, 106, 0.15)',
                          color: 'var(--accent-amber)',
                        }}
                      >
                        {subcategoryIcons[entry.subcategory]}
                        {subcategoryLabels[entry.subcategory]}
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
                    {entry.subtitle && (
                      <p className="text-sm truncate" style={{ color: 'var(--text-secondary)' }}>
                        {entry.subtitle}
                      </p>
                    )}

                    {entry.description && (
                      <p className="mt-2 text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--text-tertiary)' }}>
                        {entry.description}
                      </p>
                    )}

                    {/* Platform Links */}
                    <div className="mt-auto pt-3 flex flex-wrap gap-2">
                      {Object.entries(entry.links).map(([platform, url]) => {
                        if (!url) return null
                        const label = platformLabels[platform] || platform
                        return (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
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
              )
            })}
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

      {/* Video Lightbox */}
      {lightboxVideo && (
        <VideoLightbox
          youtubeId={lightboxVideo.id}
          title={lightboxVideo.title}
          onClose={() => setLightboxVideo(null)}
        />
      )}

      <Footer />
    </div>
  )
}
