import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ParallaxHeader from '@/components/ParallaxHeader'

gsap.registerPlugin(ScrollTrigger)

export default function CTABanner() {
  const emailRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (emailRef.current) {
      gsap.set(emailRef.current, { opacity: 0, y: 24 })
      gsap.to(emailRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: emailRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }
  }, [])

  return (
    <section
      className="cta-banner"
      style={{
        backgroundColor: 'var(--bg-surface)',
        paddingTop: 100,
        paddingBottom: 100,
      }}
    >
      <div className="content-container">
        <ParallaxHeader
          line1="LET'S MAKE"
          line2="SOMETHING REAL"
          line2Color="var(--accent-amber)"
          triggerSelector=".cta-banner"
        />

        <div className="text-center mt-16">
          <a
            ref={emailRef}
            href="mailto:William@epiphanymusicgroup.com"
            className="inline-block text-lg md:text-xl font-light transition-colors duration-300 hover:underline"
            style={{ color: 'var(--accent-amber)' }}
          >
            William@epiphanymusicgroup.com
          </a>
        </div>
      </div>
    </section>
  )
}
