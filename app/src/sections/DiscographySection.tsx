import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Headphones, Youtube, Music, TrendingUp, Award, ExternalLink } from 'lucide-react'
import { discography, streamingStats } from '@/data/discography'
import ParallaxHeader from '@/components/ParallaxHeader'

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
        paddingTop: '60px',
        paddingBottom: 'var(--section-padding-y)',
      }}
    >
      <div className="content-container">
        {/* Header */}
        <div className="mb-10">
          <span className="text-eyebrow block mb-3" style={{ color: 'var(--text-tertiary)' }}>
            MUSIC
          </span>
          <ParallaxHeader
            line1={`${streamingStats.totalSpotifyStreams}M+`}
            line2="STREAMS"
            triggerSelector="#discography"
          />
          <p className="mt-6 text-base md:text-lg font-light max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            Select discography from notable projects as vocal producer, featured artist, or performer &middot; {streamingStats.tracksWithData} tracks &middot; sourced from {streamingStats.dataSource}
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
            <TrendingUp size={13} style={{ color: 'var(--accent-amber)' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
              {(streamingStats.totalTikTokViews / 1000).toFixed(0)}M TikTok
            </span>
          </div>
        </div>

        {/* Track list */}
        <div ref={listRef} className="space-y-0">
          {discography.map((entry) => (
            <div
              key={entry.id}
              className="group py-6 transition-colors duration-200"
              style={{ borderBottom: '1px solid var(--border-color)' }}
            >
              {/* Main row */}
              <div className="flex items-start gap-5">
                {/* Album art */}
                <div
                  className="flex-shrink-0 overflow-hidden rounded-md"
                  style={{ width: 96, height: 96 }}
                >
                  <img
                    src={entry.image}
                    alt={`${entry.artist} - ${entry.title}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3
                      className="font-display text-base md:text-lg font-bold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {entry.title}
                    </h3>
                    {entry.milestones && entry.milestones.length > 0 && (
                      <span
                        className="flex-shrink-0 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: 'rgba(196, 149, 106, 0.15)', color: 'var(--accent-amber)' }}
                      >
                        <Award size={9} /> Charted
                      </span>
                    )}
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {entry.artist} &middot; {entry.role}
                  </p>

                  {/* Streaming links */}
                  {Object.keys(entry.links).length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                        Listen:
                      </span>
                      {Object.entries(entry.links).map(([platform, url]) => {
                        if (!url) return null
                        const label =
                          platform === 'spotify'
                            ? 'Spotify'
                            : platform === 'apple'
                              ? 'Apple Music'
                              : platform === 'youtube'
                                ? 'YouTube'
                                : platform
                        return (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded transition-colors duration-200 hover:border-[var(--accent-amber)] hover:text-[var(--accent-amber)]"
                            style={{
                              backgroundColor: 'var(--bg-surface)',
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
                  )}

                  {/* Stats row */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-3">
                    <div className="flex items-center gap-1.5">
                      <Headphones size={12} style={{ color: 'var(--text-tertiary)' }} />
                      <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                        {entry.stats.spotifyStreams}M Spotify
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Youtube size={12} style={{ color: 'var(--text-tertiary)' }} />
                      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        {entry.stats.youtubeViews >= 1000
                          ? `${(entry.stats.youtubeViews / 1000).toFixed(1)}M`
                          : `${entry.stats.youtubeViews}K`} YouTube
                      </span>
                    </div>
                    {entry.stats.tikTokViews > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Music size={12} style={{ color: 'var(--text-tertiary)' }} />
                        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                          {entry.stats.tikTokViews >= 1000
                            ? `${(entry.stats.tikTokViews / 1000).toFixed(1)}M`
                            : `${entry.stats.tikTokViews}K`} TikTok
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Milestones */}
                  {entry.milestones && entry.milestones.length > 0 && (
                    <div className="mt-2">
                      {entry.milestones.map((m, j) => (
                        <span
                          key={j}
                          className="inline-flex items-center gap-1 text-xs font-medium"
                          style={{ color: 'var(--accent-amber)' }}
                        >
                          <Award size={10} /> {m}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Year + CM Score */}
                <div className="hidden md:flex flex-col items-end gap-2 flex-shrink-0 pt-0.5">
                  <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                    {entry.year}
                  </span>
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="font-display text-sm font-bold" style={{ color: 'var(--accent-amber)' }}>
                      {entry.stats.chartmetricScore}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                      CM Score
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-[10px] mt-5" style={{ color: 'var(--text-tertiary)' }}>
          * All streaming and performance data sourced from Chartmetric.
          Accurate as of {streamingStats.lastUpdated}.
          Spotify streams represent cumulative all-time totals.
        </p>
      </div>
    </section>
  )
}
