import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

interface FooterProps {
  showCTA?: boolean
}

export default function Footer({ showCTA = true }: FooterProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const goToContact = () => {
    navigate('/')
    setTimeout(() => {
      const el = document.getElementById('contact')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <footer style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className={`content-container pb-10 ${showCTA ? 'pt-20' : 'pt-10'}`}>
        {/* Row 1 */}
        {showCTA && (
          <div className="max-w-3xl">
            <h2
              className="font-display text-3xl md:text-5xl font-bold leading-tight"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
            >
              {t('footer.ctaLine1')}
            </h2>
            <h3
              className="font-display italic text-2xl md:text-4xl font-medium mt-2"
              style={{ color: 'var(--accent-amber)' }}
            >
              {t('footer.ctaLine2')}
            </h3>
            <button
              onClick={goToContact}
              className="inline-block mt-8 text-lg md:text-xl font-light transition-colors duration-300 hover:underline bg-transparent border-none cursor-pointer"
              style={{ color: 'var(--accent-amber)' }}
            >
              {t('footer.ctaLink', { defaultValue: 'Get in touch' })}
            </button>
          </div>
        )}

        {/* Row 2 */}
        <div
          className="flex flex-col sm:flex-row justify-between items-center mt-16 pt-6"
          style={{ borderTop: '1px solid var(--border-color)' }}
        >
          <span className="text-eyebrow" style={{ color: 'var(--text-tertiary)' }}>
            {t('footer.copyright')}
          </span>
          <span className="text-eyebrow mt-2 sm:mt-0" style={{ color: 'var(--text-tertiary)' }}>
            {t('footer.location')}
          </span>
        </div>
      </div>
    </footer>
  )
}
