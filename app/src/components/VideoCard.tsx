import { Play } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { ArtistWorkEntry } from '@/data/artist-work'

interface VideoCardProps {
  entry: ArtistWorkEntry
  onPlay?: (youtubeId: string, title: string) => void
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

export default function VideoCard({ entry, onPlay }: VideoCardProps) {
  const { t } = useTranslation()
  const youtubeId = extractYouTubeId(entry.links.youtube)

  return (
    <div
      className="group relative overflow-hidden rounded-md cursor-pointer"
      style={{ border: '1px solid var(--border-color)' }}
      onClick={() => {
        if (youtubeId && onPlay) {
          onPlay(youtubeId, entry.title)
        }
      }}
    >
      {/* Thumbnail — 16:9 */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <img
          src={entry.image}
          alt={entry.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
          >
            <Play size={22} fill="var(--bg-void)" style={{ color: 'var(--bg-void)' }} />
          </div>
        </div>

        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <span
            className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded"
            style={{ backgroundColor: 'rgba(10,9,8,0.7)', color: 'var(--accent-amber)', backdropFilter: 'blur(4px)' }}
          >
            {entry.subcategory === 'music-video' ? t('videoCard.musicVideo') : t('videoCard.lyricVideo')}
          </span>
        </div>

        {/* Year */}
        <div className="absolute top-3 right-3">
          <span
            className="text-[11px] font-medium px-2 py-1 rounded"
            style={{ backgroundColor: 'rgba(10,9,8,0.7)', color: 'var(--text-primary)', backdropFilter: 'blur(4px)' }}
          >
            {entry.year}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <h3
          className="font-display text-base font-bold truncate"
          style={{ color: 'var(--text-primary)' }}
        >
          {entry.title}
        </h3>
        {entry.description && (
          <p className="mt-1 text-xs line-clamp-2" style={{ color: 'var(--text-tertiary)' }}>
            {t(`data.artistWork.entries.${entry.id}.description`, { defaultValue: entry.description })}
          </p>
        )}
      </div>
    </div>
  )
}
