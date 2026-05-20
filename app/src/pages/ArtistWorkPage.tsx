import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, Disc3, Video, Users } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import VideoLightbox from '@/components/VideoLightbox'
import ReleaseCard from '@/components/ReleaseCard'
import VideoCard from '@/components/VideoCard'
import CollabCard from '@/components/CollabCard'
import ArtistStatementSection from '@/sections/ArtistStatementSection'
import ArtistStatsBar from '@/sections/ArtistStatsBar'
import { artistWork } from '@/data/artist-work'
import { lenisInstance } from '@/hooks/useLenis'

gsap.registerPlugin(ScrollTrigger)

export default function ArtistWorkPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [lightboxVideo, setLightboxVideo] = useState<{ id: string; title: string } | null>(null)

  const releasesRef = useRef<HTMLDivElement>(null)
  const videosRef = useRef<HTMLDivElement>(null)
  const collabsRef = useRef<HTMLDivElement>(null)

  const releases = artistWork.filter((e) => e.category === 'release')
  const videos = artistWork.filter((e) => e.category === 'video')
  const collabs = artistWork.filter((e) => e.category === 'social')

  useEffect(() => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [])

  // Scroll-triggered section reveals
  useEffect(() => {
    const sections = [releasesRef, videosRef, collabsRef].filter(Boolean)
    sections.forEach((ref) => {
      if (!ref.current) return
      const children = ref.current.children
      if (children.length === 0) return

      gsap.set(children, { opacity: 0, y: 40 })
      gsap.to(children, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    })
  }, [])

  const handlePlay = (id: string, title: string) => {
    setLightboxVideo({ id, title })
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-void)' }}>
      <Helmet>
        <title>Artist Work | William &quot;B.A.&quot; Washington</title>
        <meta name="description" content="Releases, music videos, and collaborations from William &quot;B.A.&quot; Washington." />
      </Helmet>
      <Navigation />

      {/* 1. Artist Statement */}
      <div style={{ paddingTop: 80 }}>
        <ArtistStatementSection />
      </div>

      {/* 2. Stats Bar */}
      <ArtistStatsBar />

      <div className="content-container py-16 md:py-24 space-y-20 md:space-y-28">
        {/* 4. Releases */}
        {releases.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Disc3 size={18} style={{ color: 'var(--accent-amber)' }} />
              <h2
                className="font-display text-xl md:text-2xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                {t('artistWork.releasesHeading')}
              </h2>
              <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                ({releases.length})
              </span>
            </div>
            <div ref={releasesRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {releases.map((entry) => (
                <ReleaseCard key={entry.id} entry={entry} />
              ))}
            </div>
          </section>
        )}

        {/* 5. Videos */}
        {videos.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Video size={18} style={{ color: 'var(--accent-amber)' }} />
              <h2
                className="font-display text-xl md:text-2xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                {t('artistWork.videosHeading')}
              </h2>
              <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                ({videos.length})
              </span>
            </div>
            <div ref={videosRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {videos.map((entry) => (
                <VideoCard key={entry.id} entry={entry} onPlay={handlePlay} />
              ))}
            </div>
          </section>
        )}

        {/* 6. Collaborations */}
        {collabs.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Users size={18} style={{ color: 'var(--accent-amber)' }} />
              <h2
                className="font-display text-xl md:text-2xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                {t('artistWork.collaborationsHeading')}
              </h2>
              <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                ({collabs.length})
              </span>
            </div>
            <div
              ref={collabsRef}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6"
            >
              {collabs.map((entry) => (
                <CollabCard key={entry.id} entry={entry} onPlay={handlePlay} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Back to Home */}
      <div className="content-container pb-16">
        <button
          onClick={() => {
            navigate('/')
            setTimeout(() => {
              if (lenisInstance) {
                lenisInstance.scrollTo(0, { immediate: true })
              } else {
                window.scrollTo(0, 0)
              }
            }, 100)
          }}
          className="inline-flex items-center gap-2 text-sm transition-colors duration-300 hover:text-[var(--accent-amber)]"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={16} /> {t('artistWork.backToHome')}
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
