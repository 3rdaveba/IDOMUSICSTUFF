interface FooterProps {
  showCTA?: boolean
}

export default function Footer({ showCTA = true }: FooterProps) {
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
              Let's make something
            </h2>
            <h3
              className="font-display italic text-2xl md:text-4xl font-medium mt-2"
              style={{ color: 'var(--accent-amber)' }}
            >
              worth listening to.
            </h3>
            <a
              href="#contact"
              className="inline-block mt-8 text-lg md:text-xl font-light transition-colors duration-300 hover:underline"
              style={{ color: 'var(--accent-amber)' }}
            >
              Get in touch
            </a>
          </div>
        )}

        {/* Row 2 */}
        <div
          className="flex flex-col sm:flex-row justify-between items-center mt-16 pt-6"
          style={{ borderTop: '1px solid var(--border-color)' }}
        >
          <span className="text-eyebrow" style={{ color: 'var(--text-tertiary)' }}>
            &copy; 2026 Epiphany Music Group
          </span>
          <span className="text-eyebrow mt-2 sm:mt-0" style={{ color: 'var(--text-tertiary)' }}>
            Los Angeles, CA
          </span>
        </div>
      </div>
    </footer>
  )
}
