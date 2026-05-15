import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { MediaItem } from '@/data/projects'

interface LightboxProps {
  items: MediaItem[]
  initialIndex: number
  onClose: () => void
}

export default function Lightbox({ items, initialIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex)

  const current = items[index]
  const hasPrev = index > 0
  const hasNext = index < items.length - 1

  const goPrev = useCallback(() => {
    if (hasPrev) setIndex((i) => i - 1)
  }, [hasPrev])

  const goNext = useCallback(() => {
    if (hasNext) setIndex((i) => i + 1)
  }, [hasNext])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
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

      {/* Prev arrow */}
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            goPrev()
          }}
          className="absolute left-2 md:left-6 z-10 p-2 rounded-full transition-colors hover:bg-white/10"
          style={{ color: 'var(--text-primary)' }}
          aria-label="Previous"
        >
          <ChevronLeft size={36} />
        </button>
      )}

      {/* Next arrow */}
      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            goNext()
          }}
          className="absolute right-2 md:right-6 z-10 p-2 rounded-full transition-colors hover:bg-white/10"
          style={{ color: 'var(--text-primary)' }}
          aria-label="Next"
        >
          <ChevronRight size={36} />
        </button>
      )}

      {/* Content */}
      <div
        className="relative w-full max-w-5xl max-h-[85vh] px-12 md:px-16 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {current.type === 'photo-slot' && current.src && (
          <img
            src={current.src}
            alt={current.label}
            className="max-w-full max-h-[85vh] object-contain rounded-md"
          />
        )}
        {current.type === 'video-slot' && current.src && (
          <video
            src={current.src}
            controls
            autoPlay
            className="max-w-full max-h-[85vh] rounded-md"
            style={{ backgroundColor: 'var(--bg-void)' }}
          />
        )}
      </div>

      {/* Counter */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium uppercase tracking-wider"
        style={{ color: 'var(--text-tertiary)' }}
      >
        {index + 1} / {items.length}
      </div>
    </div>
  )
}
