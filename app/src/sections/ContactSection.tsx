import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const { t } = useTranslation()
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (headlineRef.current) {
      gsap.set(headlineRef.current, { opacity: 0, y: 40 })
      gsap.to(headlineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headlineRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }

    if (detailsRef.current) {
      const items = detailsRef.current.children
      gsap.set(items, { opacity: 0, y: 24 })
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: detailsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }

    if (formRef.current) {
      gsap.set(formRef.current, { opacity: 0, y: 60 })
      gsap.to(formRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState('sending')

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('https://formspree.io/f/mredplgz', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        setFormState('success')
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    backgroundColor: 'var(--bg-surface-elevated)',
    border: '1px solid var(--border-color)',
    borderRadius: 4,
    padding: '14px 16px',
    color: 'var(--text-primary)',
    fontFamily: "'Inter', sans-serif",
    fontSize: 16,
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: 4,
    color: 'var(--text-tertiary)',
    fontSize: 12,
    fontWeight: 500,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.12em',
  }

  return (
    <section
      id="contact"
      style={{
        backgroundColor: 'var(--bg-void)',
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
      }}
    >
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-12">
          {/* Left: Headline + Details */}
          <div>
            <h2
              ref={headlineRef}
              className="font-display text-3xl md:text-5xl font-bold leading-tight"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
            >
              {t('contact.headline')}
            </h2>

            <div ref={detailsRef} className="mt-10 space-y-6">
              <div>
                <span style={labelStyle}>{t('contact.phoneLabel')}</span>
                <a
                  href="tel:+13236206448"
                  className="text-base transition-colors duration-300"
                  style={{ color: 'var(--text-primary)' }}
                >
                  (323) 620-6448
                </a>
              </div>
              <div>
                <span style={labelStyle}>{t('contact.emailLabel')}</span>
                <a
                  href="mailto:William@epiphanymusicgroup.com"
                  className="text-base transition-colors duration-300 hover:underline"
                  style={{ color: 'var(--accent-amber)' }}
                >
                  William@epiphanymusicgroup.com
                </a>
              </div>
              <div>
                <span style={labelStyle}>{t('contact.locationLabel')}</span>
                <span className="text-base" style={{ color: 'var(--text-secondary)' }}>
                  {t('contact.locationValue')}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            {formState === 'success' ? (
              <div className="flex items-center justify-center h-full min-h-[300px]">
                <h3
                  className="font-display italic text-2xl md:text-3xl font-medium text-center"
                  style={{ color: 'var(--accent-amber)' }}
                >
                  {t('contact.successMessage')}
                </h3>
              </div>
            ) : formState === 'error' ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] space-y-4">
                <h3
                  className="font-display italic text-2xl md:text-3xl font-medium text-center"
                  style={{ color: '#ef4444' }}
                >
                  {t('contact.errorMessage')}
                </h3>
                <button
                  type="button"
                  onClick={() => setFormState('idle')}
                  className="text-nav transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    backgroundColor: 'var(--accent-amber)',
                    color: 'var(--bg-void)',
                    padding: '12px 32px',
                    borderRadius: 4,
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {t('contact.tryAgainButton')}
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                <div>
                  <label htmlFor="name" style={labelStyle}>{t('contact.formNameLabel')}</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t('contact.formNamePlaceholder')}
                    required
                    className="focus:border-[var(--accent-amber)]"
                    style={{
                      ...inputStyle,
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent-amber)'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(196, 149, 106, 0.15)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="email" style={labelStyle}>{t('contact.formEmailLabel')}</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t('contact.formEmailPlaceholder')}
                    required
                    className="focus:border-[var(--accent-amber)]"
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent-amber)'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(196, 149, 106, 0.15)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="subject" style={labelStyle}>{t('contact.formSubjectLabel')}</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder={t('contact.formSubjectPlaceholder')}
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent-amber)'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(196, 149, 106, 0.15)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="message" style={labelStyle}>{t('contact.formMessageLabel')}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder={t('contact.formMessagePlaceholder')}
                    required
                    style={{
                      ...inputStyle,
                      resize: 'vertical',
                      minHeight: 120,
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent-amber)'
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(196, 149, 106, 0.15)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState === 'sending'}
                  className="text-nav w-full md:w-auto transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    backgroundColor: formState === 'sending' ? 'var(--text-tertiary)' : 'var(--accent-amber)',
                    color: 'var(--bg-void)',
                    padding: '16px 48px',
                    borderRadius: 4,
                    border: 'none',
                    cursor: formState === 'sending' ? 'wait' : 'pointer',
                    animation: formState === 'sending' ? 'pulse 1s ease-in-out infinite' : 'none',
                  }}
                >
                  {formState === 'sending' ? t('contact.sendingButton') : t('contact.sendButton')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </section>
  )
}
