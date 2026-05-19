import { useEffect, useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { lenisInstance } from '@/hooks/useLenis'

const navLinks = [
  { label: 'Home', href: '#home', type: 'hash' as const },
  { label: 'About', href: '#about', type: 'hash' as const },
  { label: 'Projects', href: '#work', type: 'hash' as const },
  { label: 'Film', href: '#tv-film', type: 'hash' as const },
  { label: 'Music', href: '#discography', type: 'hash' as const },
  { label: 'Artist Work', href: '/artist-work', type: 'route' as const },
  { label: 'Contact', href: '#contact', type: 'hash' as const },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const navRef = useRef<HTMLElement>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100)

      // Determine active section (only on home page)
      if (!isHome) return
      const sections = ['home', 'about', 'work', 'tv-film', 'discography', 'contact']
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 200) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '')
    if (lenisInstance) {
      lenisInstance.scrollTo(`#${id}`, { offset: -64 })
    } else {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    type: 'hash' | 'route'
  ) => {
    e.preventDefault()
    if (type === 'route') {
      navigate(href)
      return
    }
    // hash link
    if (isHome) {
      scrollToSection(href)
    } else {
      navigate('/')
      // Wait for React to mount the homepage, then scroll reliably
      setTimeout(() => {
        const id = href.replace('#', '')
        const el = document.getElementById(id)
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 64
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }, 400)
    }
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full transition-all duration-300"
      style={{
        zIndex: 50,
        backgroundColor: 'rgba(10, 9, 8, 0.45)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
      }}
    >
      <div className="content-container flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home', 'hash')}
          className="flex items-center gap-2.5 group flex-shrink-0"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2C12 2 14 4 16 4C16 4 15 6 15 8C15 8 17 7 19 8C19 8 17 10 16 11C16 11 18 12 18 14C18 16 16 18 14 18V20C14 21.1 13.1 22 12 22C10.9 22 10 21.1 10 20V18C8 18 6 16 6 14C6 12 8 11 8 11C7 10 5 8 5 8C7 7 9 8 9 8C9 6 8 4 8 4C10 4 12 2 12 2Z"
              stroke="var(--accent-amber)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 14H14M10 11H14M11 8H13"
              stroke="var(--accent-amber)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-nav hidden sm:inline" style={{ color: 'rgba(250, 246, 241, 0.7)' }}>
            WILLIAM &quot;B.A.&quot; WASHINGTON
          </span>
        </a>

        {/* Nav Links */}
        <div
          className="flex items-center gap-5 md:gap-8 overflow-x-auto"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {navLinks.map((link) => {
            const isActive =
              link.type === 'route'
                ? location.pathname === link.href
                : isHome && activeSection === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.type)}
                className="text-nav transition-colors duration-300 relative flex-shrink-0"
                style={{
                  color: isActive
                    ? '#FAF6F1'
                    : 'rgba(250, 246, 241, 0.65)',
                }}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-0 w-full h-0.5"
                    style={{ backgroundColor: 'var(--accent-amber)' }}
                  />
                )}
              </a>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
