import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Headphones, Youtube, Radio, Music, TrendingUp, Award } from 'lucide-react'
import { discography, streamingStats } from '@/data/discography'

gsap.registerPlugin(ScrollTrigger)

export default function DiscographySection() {
  const listRef = useRef<HTMLDivElement>(null)
  const totalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!listRef.current) return
    const items = listRef.current.children
    if (items.length === 0) return

    gsap.set(items, { opacity: 0, y: 30 })
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: listRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    if (totalRef.current) {
      gsap.fromTo(
        totalRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: totalRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
  }, [])

  return (
    <section
      id="discography"
      style={{
        backgroundColor: 'var(--bg-void)',
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
      }}
    >
      <div className="content-container">
        {/* Header */}
        <div className="mb-10">
          <span className="text-eyebrow block mb-3" style={{ color: 'var(--text-tertiary)' }}>
            MUSIC
          </span>
          <h2
            className="font-display text-3xl md:text-5xl font-bold leading-tight"
            style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
          >
            <em style={{ color: 'var(--accent-amber)' }}>{streamingStats.totalSpotifyStreams}M+</em> streams
          </h2>
          <p className="mt-2 text-base font-light" style={{ color: 'var(--text-secondary)' }}>
            {streamingStats.tracksWithData} tracks &middot; sourced from {streamingStats.dataSource}
          </p>
        </div>

        {/* Total stats bar */}
        <div
          ref={totalRef}
          className="flex flex-wrap gap-6 mb-10 px-6 py-4 rounded-md"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}
        >
          <div className="flex items-center gap-2">
            <Headphones size={13} style={{ color: 'var(--accent-amber)' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
              {streamingStats.totalSpotifyStreams}M Spotify
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Youtube size={13} style={{ color: 'var(--accent-amber)' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
              {(streamingStats.totalYoutubeViews / 1000).toFixed(1)}M YouTube
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Radio size={13} style={{ color: 'var(--accent-amber)' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
              {streamingStats.totalAirplaySpins.toLocaleString()} airplay spins
            </span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp size={13} style={{ color: 'var(--accent-amber)' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
              {(streamingStats.totalTikTokViews / 1000).toFixed(0)}M TikTok
            </span>
          </div>
        </div>

        {/* Track list */}
        <div ref={listRef} className="space-y-0">
          {discography.map((entry, i) => (
            <div
              key={entry.id}
              className="group py-5 transition-colors duration-200"
              style={{ borderBottom: '1px solid var(--border-color)' }}
            >
              {/* Main row */}
              <div className="flex items-center gap-4 md:gap-5">
                {/* Index */}
                <span
                  className="hidden md:block text-xs font-medium w-5 flex-shrink-0"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Album art */}
                <div
                  className="flex-shrink-0 overflow-hidden rounded-sm"
                  style={{ width: 52, height: 52 }}
                >
                  <img
                    src={entry.image}
                    alt={`${entry.artist} - ${entry.title}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3
                      className="font-display text-sm md:text-base font-bold truncate"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {entry.title}
                    </h3>
                    {entry.milestones && entry.milestones.length > 0 && (
                      <span
                        className="flex-shrink-0 flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: 'rgba(196, 149, 106, 0.15)', color: 'var(--accent-amber)' }}
                      >
                        <Award size={8} /> Charted
                      </span>
                    )}
                  </div>
                  <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>
                    {entry.artist} &middot; {entry.role}
                  </p>
                </div>

                {/* Chartmetric Score */}
                <div className="hidden sm:flex flex-col items-end flex-shrink-0">
                  <span className="font-display text-sm font-bold" style={{ color: 'var(--accent-amber)' }}>
                    {entry.stats.chartmetricScore}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                    CM Score
                  </span>
                </div>

                {/* Year */}
                <span
                  className="hidden md:block text-xs flex-shrink-0 w-10 text-right"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {entry.year}
                </span>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-3 ml-0 md:ml-16 pl-0 md:pl-[68px]">
                <div className="flex items-center gap-1.5">
                  <Headphones size={11} style={{ color: 'var(--text-tertiary)' }} />
                  <span className="text-[11px] font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {entry.stats.spotifyStreams}M Spotify
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Youtube size={11} style={{ color: 'var(--text-tertiary)' }} />
                  <span className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                    {entry.stats.youtubeViews >= 1000
                      ? `${(entry.stats.youtubeViews / 1000).toFixed(1)}M`
                      : `${entry.stats.youtubeViews}K`} YouTube
                  </span>
                </div>
                {entry.stats.airplaySpins > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Radio size={11} style={{ color: 'var(--text-tertiary)' }} />
                    <span className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                      {entry.stats.airplaySpins.toLocaleString()} spins
                    </span>
                  </div>
                )}
                {entry.stats.tikTokViews > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Music size={11} style={{ color: 'var(--text-tertiary)' }} />
                    <span className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>
                      {entry.stats.tikTokViews >= 1000
                        ? `${(entry.stats.tikTokViews / 1000).toFixed(1)}M`
                        : `${entry.stats.tikTokViews}K`} TikTok
                    </span>
                  </div>
                )}
              </div>

              {/* Milestones */}
              {entry.milestones && entry.milestones.length > 0 && (
                <div className="mt-2 ml-0 md:ml-16 pl-0 md:pl-[68px]">
                  {entry.milestones.map((m, j) => (
                    <span
                      key={j}
                      className="inline-flex items-center gap-1 text-[10px] font-medium"
                      style={{ color: 'var(--accent-amber)' }}
                    >
                      <Award size={9} /> {m}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-[10px] mt-5" style={{ color: 'var(--text-tertiary)' }}>
          * All streaming, airplay, and performance data sourced from Chartmetric.
          Accurate as of {streamingStats.lastUpdated}.
          Spotify streams represent cumulative all-time totals.
        </p>
      </div>
    </section>
  )
}
