import { Play } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { ArtistWorkEntry } from '@/data/artist-work'

interface CollabCardProps {
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

export default function CollabCard({ entry, onPlay }: CollabCardProps) {
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
      {/* Thumbnail — square */}
      <div className="relative w-full" style={{ paddingBottom: '100%' }}>
        <img
          src={entry.image}
          alt={entry.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
          >
            <Play size={16} fill="var(--bg-void)" style={{ color: 'var(--bg-void)' }} />
          </div>
        </div>

        {/* Year badge */}
        <div className="absolute top-2 right-2">
          <span
            className="text-[10px] font-medium px-1.5 py-0.5 rounded"
            style={{ backgroundColor: 'rgba(10,9,8,0.7)', color: 'var(--text-primary)', backdropFilter: 'blur(4px)' }}
          >
            {entry.year}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3" style={{ backgroundColor: 'var(--bg-surface)' }}>
        <h3
          className="font-display text-sm font-bold truncate"
          style={{ color: 'var(--text-primary)' }}
        >
          {entry.title}
        </h3>
        {entry.subtitle && (
          <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>
            {entry.subtitle}
          </p>
        )}
        {entry.description && (
          <p className="mt-1 text-[11px] line-clamp-2" style={{ color: 'var(--text-tertiary)' }}>
            {t(`data.artistWork.entries.${entry.id}.description`, { defaultValue: entry.description })}
          </p>
        )}
      </div>
    </div>
  )
}
