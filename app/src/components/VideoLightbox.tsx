import { useEffect } from 'react'
import { X, ExternalLink } from 'lucide-react'

interface VideoLightboxProps {
  youtubeId: string
  title?: string
  onClose: () => void
}

export default function VideoLightbox({ youtubeId, title, onClose }: VideoLightboxProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(10,9,8,0.92)' }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-2 rounded-full transition-colors hover:bg-white/10"
        style={{ color: 'var(--text-primary)' }}
        aria-label="Close"
      >
        <X size={28} />
      </button>

      {/* Video container */}
      <div
        className="relative w-full max-w-5xl px-4 md:px-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title || 'YouTube video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full rounded-md"
            style={{ border: 'none' }}
          />
        </div>

        {/* Title + external link */}
        {title && (
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              {title}
            </span>
            <a
              href={`https://youtu.be/${youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs transition-colors hover:text-[var(--accent-amber)]"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Watch on YouTube <ExternalLink size={10} />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
