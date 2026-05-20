import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'da', label: 'Dansk', flag: '🇩🇰' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const current = languages.find((l) => l.code === i18n.language) || languages[0]

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const select = (code: string) => {
    i18n.changeLanguage(code)
    setOpen(false)
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Floating circle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed right-6 z-40 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-105"
        style={{
          bottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
          width: 48,
          height: 48,
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          fontSize: 22,
          lineHeight: 1,
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-amber)'
          e.currentTarget.style.boxShadow = '0 0 12px rgba(196, 149, 106, 0.25)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-color)'
          e.currentTarget.style.boxShadow = 'none'
        }}
        aria-label="Change language"
      >
        {current.flag}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="fixed right-6 z-40 overflow-hidden rounded-md"
          style={{
            bottom: 'calc(80px + env(safe-area-inset-bottom, 0px))',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            minWidth: 140,
            animation: 'langPopIn 150ms ease-out forwards',
          }}
        >
          {languages.map((lang) => {
            const isActive = lang.code === i18n.language
            return (
              <button
                key={lang.code}
                onClick={() => select(lang.code)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-200 hover:bg-[var(--bg-surface-elevated)]"
                style={{
                  borderLeft: isActive ? '3px solid var(--accent-amber)' : '3px solid transparent',
                }}
              >
                <span style={{ fontSize: 18 }}>{lang.flag}</span>
                <span
                  className="text-sm font-medium"
                  style={{
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  {lang.label}
                </span>
              </button>
            )
          })}
        </div>
      )}

      <style>{`
        @keyframes langPopIn {
          from { opacity: 0; transform: scale(0.9) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )
}
