import { useEffect, useRef, useState, memo } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from 'react-simple-maps'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Radio, Headphones, Youtube, Music } from 'lucide-react'
import { streamingStats, countryAirplay } from '@/data/discography'

gsap.registerPlugin(ScrollTrigger)

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

// Airplay country codes
const airplaySet = new Set(countryAirplay.map((c) => c.countryCode))

// Intensity colors for airplay
const intensityColors: Record<string, string> = {
  high: 'var(--accent-amber)',
  medium: 'rgba(196, 149, 106, 0.5)',
  low: 'rgba(196, 149, 106, 0.2)',
}

const defaultColor = 'var(--bg-surface-elevated)'
const strokeColor = 'var(--border-color)'

// Simplified country centroids for marker placement
// (lat, lon) for countries with airplay data
const countryCentroids: Record<string, [number, number]> = {
  DNK: [10.0, 56.0],
  USA: [-95.0, 37.0],
  SWE: [15.0, 62.0],
  GBR: [-2.0, 54.0],
  DEU: [10.0, 51.0],
  NOR: [10.0, 64.0],
  NLD: [5.5, 52.0],
  CAN: [-106.0, 56.0],
  AUS: [135.0, -25.0],
  FRA: [2.0, 47.0],
  BRA: [-55.0, -10.0],
}

const StatBadge = memo(function StatBadge({
  icon,
  label,
  value,
  unit,
}: {
  icon: React.ReactNode
  label: string
  value: string
  unit: string
}) {
  return (
    <div
      className="flex flex-col items-center gap-2 px-4 py-4 rounded-md"
      style={{ backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid var(--border-color)' }}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <span style={{ color: 'var(--accent-amber)' }}>{icon}</span>
        <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
          {label}
        </span>
      </div>
      <span className="font-display text-xl md:text-2xl font-bold" style={{ color: 'var(--accent-amber)' }}>
        {value}
      </span>
      <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
        {unit}
      </span>
    </div>
  )
})

export default function StreamingGlobe() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const [tooltip, setTooltip] = useState<{
    name: string
    spins: number
    intensity: string
    x: number
    y: number
  } | null>(null)

  useEffect(() => {
    if (statsRef.current) {
      const items = statsRef.current.children
      gsap.set(items, { opacity: 0, y: 30 })
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }
    if (mapRef.current) {
      gsap.fromTo(
        mapRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
  }, [])

  const handleMouseEnter = (geo: { properties: { ISO_A3: string; NAME: string } }, e: React.MouseEvent) => {
    const code = geo.properties.ISO_A3
    const data = countryAirplay.find((c) => c.countryCode === code)
    if (data) {
      setTooltip({
        name: data.country,
        spins: data.spins,
        intensity: data.intensity,
        x: e.clientX,
        y: e.clientY,
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (tooltip) {
      setTooltip({ ...tooltip, x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseLeave = () => {
    setTooltip(null)
  }

  const getFillColor = (geo: { properties: { ISO_A3: string } }) => {
    const code = geo.properties.ISO_A3
    if (!airplaySet.has(code)) return defaultColor
    const data = countryAirplay.find((c) => c.countryCode === code)
    return data ? intensityColors[data.intensity] : defaultColor
  }

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--bg-surface)',
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
      }}
    >
      <div className="content-container">
        {/* Header */}
        <div className="mb-6">
          <span className="text-eyebrow block mb-3" style={{ color: 'var(--text-tertiary)' }}>
            GLOBAL REACH
          </span>
          <h2
            className="font-display text-3xl md:text-5xl font-bold leading-tight"
            style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
          >
            <em style={{ color: 'var(--accent-amber)' }}>{streamingStats.totalSpotifyStreams}M+</em> streams
          </h2>
          <p className="mt-2 text-base font-light" style={{ color: 'var(--text-secondary)' }}>
            {streamingStats.tracksWithData} tracks &middot; sourced from {streamingStats.dataSource} &middot; as of {streamingStats.lastUpdated}
          </p>
        </div>

        {/* Stats grid */}
        <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-14">
          <StatBadge
            icon={<Headphones size={14} />}
            label="Spotify"
            value={`${streamingStats.totalSpotifyStreams}M`}
            unit="total streams"
          />
          <StatBadge
            icon={<Youtube size={14} />}
            label="YouTube"
            value={`${(streamingStats.totalYoutubeViews / 1000).toFixed(1)}M`}
            unit="total views"
          />
          <StatBadge
            icon={<Radio size={14} />}
            label="Airplay"
            value={`${streamingStats.totalAirplaySpins}`}
            unit="radio spins"
          />
          <StatBadge
            icon={<Music size={14} />}
            label="Tracks"
            value={`${streamingStats.tracksWithData}`}
            unit="with data"
          />
        </div>

        {/* World Map */}
        <div
          ref={mapRef}
          className="relative rounded-md overflow-hidden"
          style={{ backgroundColor: 'var(--bg-void)', border: '1px solid var(--border-color)' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Legend */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
              Radio Airplay Reach
            </span>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: intensityColors.high }} />
              <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Active airplay</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: intensityColors.low }} />
              <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Emerging markets</span>
            </div>
          </div>

          {/* Airplay count */}
          <div className="absolute top-4 right-4 z-10 text-right">
            <span className="font-display text-2xl font-bold" style={{ color: 'var(--accent-amber)' }}>
              {streamingStats.totalAirplaySpins}
            </span>
            <span className="text-[10px] block" style={{ color: 'var(--text-tertiary)' }}>
              total radio spins
            </span>
          </div>

          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 100, center: [10, 50] }}
            style={{ width: '100%', height: 'auto' }}
          >
            <ZoomableGroup maxZoom={1} minZoom={1}>
              <Geographies geography={GEO_URL}>
                {({ geographies }: { geographies: Array<{ rsmKey: string; properties: { ISO_A3: string; NAME: string } }> }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={(e: React.MouseEvent) => handleMouseEnter(geo, e)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        default: { fill: getFillColor(geo), stroke: strokeColor, strokeWidth: 0.5, outline: 'none' },
                        hover: {
                          fill: airplaySet.has(geo.properties.ISO_A3) ? 'var(--accent-amber-light)' : getFillColor(geo),
                          stroke: strokeColor,
                          strokeWidth: 0.5,
                          outline: 'none',
                          cursor: airplaySet.has(geo.properties.ISO_A3) ? 'pointer' : 'default',
                        },
                        pressed: { fill: getFillColor(geo), stroke: strokeColor, strokeWidth: 0.5, outline: 'none' },
                      }}
                    />
                  ))
                }
              </Geographies>

              {/* Airplay markers */}
              {countryAirplay.map((c) => {
                const coords = countryCentroids[c.countryCode]
                if (!coords) return null
                return (
                  <Marker key={c.countryCode} coordinates={coords}>
                    <circle
                      r={c.spins > 15 ? 6 : c.spins > 5 ? 4 : 3}
                      fill="var(--accent-amber)"
                      stroke="var(--bg-void)"
                      strokeWidth={1.5}
                      style={{ pointerEvents: 'none' }}
                    />
                  </Marker>
                )
              })}
            </ZoomableGroup>
          </ComposableMap>

          {/* Tooltip */}
          {tooltip && (
            <div
              className="fixed z-50 pointer-events-none px-3 py-2 rounded-md text-xs"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--accent-amber)',
                color: 'var(--text-primary)',
                left: tooltip.x + 12,
                top: tooltip.y - 40,
              }}
            >
              <span className="font-semibold">{tooltip.name}</span>
              <span className="ml-2" style={{ color: 'var(--accent-amber)' }}>
                {tooltip.spins.toLocaleString()} spins &middot; {tooltip.intensity} reach
              </span>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="mt-4 flex items-start gap-2">
          <span className="text-[11px] leading-relaxed flex-1" style={{ color: 'var(--text-tertiary)' }}>
            * Streaming and airplay data sourced from {streamingStats.dataSource}.
            Accurate as of {streamingStats.lastUpdated}.
            Spotify streams represent cumulative all-time totals.
            Data updated as additional tracks are indexed.
          </span>
        </div>
      </div>
    </section>
  )
}
