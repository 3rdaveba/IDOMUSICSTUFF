import type { ArtistWorkEntry } from '@/data/artist-work'

const platformIcons: Record<string, React.ReactNode> = {
  spotify: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  ),
  apple: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04 0-.08 0-.12.01-.606.04-1.29.13-1.994.33a18.15 18.15 0 00-2.368.83c-.37.17-.76.35-1.17.55h-.1c-.39-.19-.77-.37-1.13-.54a16.88 16.88 0 00-2.35-.84 9.502 9.502 0 00-2.06-.33c-.08-.01-.17-.01-.25 0a5.12 5.12 0 00-1.84.34c-1.1.63-1.83 1.55-2.18 2.77a9.542 9.542 0 00-.29 3.1c.04.72.14 1.42.31 2.1.35 1.36.93 2.59 1.75 3.67.96 1.26 2.1 2.23 3.41 2.9.67.35 1.37.55 2.1.55.46 0 .93-.09 1.38-.3.45-.2.88-.48 1.28-.84.2-.18.38-.38.57-.6.19.22.37.42.57.6.4.36.83.64 1.28.84.45.21.92.3 1.38.3.73 0 1.43-.2 2.1-.55 1.31-.67 2.45-1.64 3.41-2.9.82-1.08 1.4-2.31 1.75-3.67.17-.68.27-1.38.31-2.1.04-.52.04-1.04 0-1.56z" />
    </svg>
  ),
  tidal: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.012 3.992L8.008 7.996 4.004 3.992 0 7.996 4.004 12l4.004-4.004L12.012 12l-4.004 4.004 4.004 4.004 4.004-4.004L12.012 12l4.004-4.004L12.012 3.992zM16.042 7.996l3.979-3.979L24 7.996l-3.979 3.979z" />
    </svg>
  ),
  youtube: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
}

const platformOrder = ['spotify', 'apple', 'tidal', 'youtube'] as const

interface ReleaseCardProps {
  entry: ArtistWorkEntry
}

export default function ReleaseCard({ entry }: ReleaseCardProps) {
  return (
    <div className="group flex gap-5 p-5 rounded-md transition-colors duration-200 hover:bg-[var(--bg-surface)]" style={{ border: '1px solid var(--border-color)' }}>
      {/* Artwork */}
      <div
        className="flex-shrink-0 overflow-hidden rounded-sm"
        style={{ width: 160, height: 160 }}
      >
        <img
          src={entry.image}
          alt={entry.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span
            className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
            style={{ backgroundColor: 'rgba(196, 149, 106, 0.15)', color: 'var(--accent-amber)' }}
          >
            {entry.subcategory === 'solo' ? 'Solo' : 'Feature'}
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

        {/* Platform icon links */}
        <div className="mt-auto pt-3 flex items-center gap-3">
          {platformOrder.map((key) => {
            const url = entry.links[key]
            if (!url) return null
            return (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-[var(--accent-amber)]"
                style={{ color: 'var(--text-tertiary)' }}
                title={key}
              >
                {platformIcons[key]}
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
