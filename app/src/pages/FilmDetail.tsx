import { useParams, useNavigate } from 'react-router'
import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, ArrowRight, Film, Video, ChevronLeft, ChevronRight, X, ExternalLink } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getFilmById, getAdjacentFilms } from '@/data/films'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { lenisInstance } from '@/hooks/useLenis'

gsap.registerPlugin(ScrollTrigger)

interface LightboxProps {
  items: { type: string; label: string; src: string }[]
  initialIndex: number
  onClose: () => void
}

function FilmLightbox({ items, initialIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex)

  const current = items[index]
  const hasPrev = index > 0
  const hasNext = index < items.length - 1

  const goPrev = () => { if (hasPrev) setIndex((i) => i - 1) }
  const goNext = () => { if (hasNext) setIndex((i) => i + 1) }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, goPrev, goNext])

  if (!current) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(10,9,8,0.35)' }}
      onClick={onClose}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose() }}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-2 rounded-full transition-colors hover:bg-white/10"
        style={{ color: 'var(--text-primary)' }}
        aria-label="Close"
      >
        <X size={28} />
      </button>

      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrev() }}
          className="absolute left-2 md:left-6 z-10 p-2 rounded-full transition-colors hover:bg-white/10"
          style={{ color: 'var(--text-primary)' }}
          aria-label="Previous"
        >
          <ChevronLeft size={36} />
        </button>
      )}

      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); goNext() }}
          className="absolute right-2 md:right-6 z-10 p-2 rounded-full transition-colors hover:bg-white/10"
          style={{ color: 'var(--text-primary)' }}
          aria-label="Next"
        >
          <ChevronRight size={36} />
        </button>
      )}

      <div
        className="relative w-full max-w-5xl max-h-[85vh] px-12 md:px-16 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {current.type === 'photo' && (
          <img src={current.src} alt={current.label} className="max-w-full max-h-[85vh] object-contain rounded-md" />
        )}
        {current.type === 'video' && (
          <video src={current.src} controls autoPlay className="max-w-full max-h-[85vh] rounded-md" style={{ backgroundColor: 'var(--bg-void)' }} />
        )}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
        {index + 1} / {items.length}
      </div>
    </div>
  )
}

export default function FilmDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const film = getFilmById(id || '')
  const pageTitle = film ? `${film.title} | Film` : 'Film'
  const pageDesc = film?.description || 'Film details'
  const { prev, next } = getAdjacentFilms(id || '')

  const heroRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const lightboxItems = film?.media?.items ?? []

  useEffect(() => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [id])

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power3.out' })
    }
    const sections = [infoRef, mediaRef].filter(Boolean)
    sections.forEach((ref, i) => {
      if (!ref.current) return
      gsap.fromTo(ref.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.15 * (i + 1),
        scrollTrigger: { trigger: ref.current, start: 'top 88%', toggleActions: 'play none none none' },
      })
    })
  }, [])

  if (!film) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-void)' }}>
        <Helmet>
          <title>Film Not Found | William &quot;B.A.&quot; Washington</title>
        </Helmet>
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{t('filmDetail.filmNotFound')}</h1>
          <button onClick={() => navigate('/')} className="mt-6 inline-flex items-center gap-2 transition-colors duration-300" style={{ color: 'var(--accent-amber)' }}>
            <ArrowLeft size={16} /> {t('filmDetail.backHome')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-void)' }}>
      <Helmet>
        <title>{pageTitle} | William &quot;B.A.&quot; Washington</title>
        <meta name="description" content={pageDesc} />
      </Helmet>
      <Navigation />

      {/* Hero */}
      <div ref={heroRef} className="relative w-full overflow-hidden" style={{ height: 'clamp(400px, 65vh, 750px)' }}>
        {film.heroVideo ? (
          <video src={film.heroVideo} autoPlay muted loop playsInline className="w-full h-full object-cover" />
        ) : (
          <img src={film.image} alt={film.title} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,9,8,0.2) 0%, rgba(10,9,8,0.85) 100%)' }} />

        <nav className="absolute top-20 left-6 md:left-12 z-10 flex items-center gap-2 text-xs font-medium uppercase tracking-wider">
          <button onClick={() => navigate('/')} className="transition-colors duration-300 hover:text-[var(--accent-amber)]" style={{ color: 'var(--text-tertiary)' }}>{t('filmDetail.breadcrumbHome')}</button>
          <span style={{ color: 'var(--text-tertiary)' }}>/</span>
          <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('tv-film')?.scrollIntoView({ behavior: 'smooth' }), 100) }} className="transition-colors duration-300 hover:text-[var(--accent-amber)]" style={{ color: 'var(--text-tertiary)' }}>{t('filmDetail.breadcrumbFilm')}</button>
          <span style={{ color: 'var(--text-tertiary)' }}>/</span>
          <span style={{ color: 'var(--text-primary)' }}>{film.title}</span>
        </nav>
      </div>

      {/* Title + Streaming */}
      <div className="content-container pt-10 pb-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight" style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              {film.title}
            </h1>
            <p className="mt-2 text-base md:text-lg font-light" style={{ color: 'var(--text-secondary)' }}>
              {film.role}
            </p>
          </div>
          {film.streaming && film.streaming.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 md:pt-2">
              <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                {t('filmDetail.listen')}:
              </span>
              {film.streaming.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors duration-200 hover:border-[var(--accent-amber)] hover:text-[var(--accent-amber)]"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  {link.platform}
                  <ExternalLink size={12} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Overview Bar */}
      <div className="content-container relative z-10 mb-16">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 px-6 py-4 rounded-md" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--text-tertiary)' }} />
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{t('filmDetail.statusComplete')}</span>
          </div>
          <div className="hidden sm:block w-px h-4" style={{ backgroundColor: 'var(--border-color)' }} />
          <div className="flex items-center gap-1.5">
            <Film size={13} style={{ color: 'var(--accent-amber)' }} />
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{t('filmDetail.categoryFilm')}</span>
          </div>
          <div className="hidden sm:block w-px h-4" style={{ backgroundColor: 'var(--border-color)' }} />
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{film.studio}</span>
          </div>
          <div className="hidden sm:block w-px h-4" style={{ backgroundColor: 'var(--border-color)' }} />
          <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{film.year}</span>
        </div>
      </div>

      {/* Info + Media */}
      <div className="content-container mb-16 space-y-16">
        <div ref={infoRef} className="max-w-3xl">
          {film.details && film.details.length > 0 ? (
            <div className="space-y-10">
              {film.details.map((detail, i) => (
                <div key={i}>
                  <span className="text-eyebrow block mb-4" style={{ color: 'var(--text-tertiary)' }}>{detail.heading.toUpperCase()}</span>
                  <p className="text-base md:text-lg font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {detail.text}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <>
              <span className="text-eyebrow block mb-5" style={{ color: 'var(--text-tertiary)' }}>{t('filmDetail.aboutProject')}</span>
              <p className="text-base md:text-lg font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {film.description}
              </p>
            </>
          )}
        </div>

        {lightboxItems.length > 0 && (
          <div ref={mediaRef}>
            <span className="text-eyebrow block mb-6" style={{ color: 'var(--text-tertiary)' }}>{t('filmDetail.mediaResources')}</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {lightboxItems.map((item, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-md cursor-pointer transition-all duration-200 hover:border-[var(--accent-amber)]"
                  style={{ aspectRatio: '4/3', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)' }}
                  onClick={() => setLightboxIndex(i)}
                >
                  {item.type === 'photo' && (
                    <img src={item.src} alt={item.label} className="w-full h-full object-cover" loading="lazy" />
                  )}
                  {item.type === 'video' && (
                    <>
                      <video src={item.src} className="w-full h-full object-cover" preload="metadata" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Video size={28} style={{ color: 'var(--text-primary)' }} />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Prev/Next */}
      {(prev || next) && (
        <div className="content-container py-12">
          <div className="flex flex-col sm:flex-row items-stretch gap-4 rounded-md overflow-hidden" style={{ border: '1px solid var(--border-color)' }}>
            {prev && (
              <button onClick={() => navigate(`/film/${prev.id}`)} className="group flex-1 flex items-center gap-4 p-6 text-left transition-colors duration-200 hover:bg-[var(--bg-surface)]">
                <ArrowLeft size={20} style={{ color: 'var(--text-tertiary)' }} className="group-hover:text-[var(--accent-amber)] transition-colors flex-shrink-0" />
                <div>
                  <span className="text-[11px] font-medium uppercase tracking-wider block mb-1" style={{ color: 'var(--text-tertiary)' }}>{t('filmDetail.previous')}</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{prev.title}</span>
                </div>
              </button>
            )}
            {prev && next && <div className="hidden sm:block w-px self-stretch" style={{ backgroundColor: 'var(--border-color)' }} />}
            {next && (
              <button onClick={() => navigate(`/film/${next.id}`)} className="group flex-1 flex items-center gap-4 p-6 text-right justify-end transition-colors duration-200 hover:bg-[var(--bg-surface)]">
                <div>
                  <span className="text-[11px] font-medium uppercase tracking-wider block mb-1" style={{ color: 'var(--text-tertiary)' }}>{t('filmDetail.next')}</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{next.title}</span>
                </div>
                <ArrowRight size={20} style={{ color: 'var(--text-tertiary)' }} className="group-hover:text-[var(--accent-amber)] transition-colors flex-shrink-0" />
              </button>
            )}
          </div>
        </div>
      )}

      {lightboxIndex !== null && (
        <FilmLightbox items={lightboxItems} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}

      <Footer />
    </div>
  )
}
