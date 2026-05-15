import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ImageReveal from '@/components/ImageReveal'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const bio1Ref = useRef<HTMLParagraphElement>(null)
  const bio2Ref = useRef<HTMLParagraphElement>(null)
  const sigRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    // Headline reveal
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

    // Bio paragraphs
    const bios = [bio1Ref.current, bio2Ref.current].filter(Boolean)
    if (bios.length > 0) {
      gsap.set(bios, { opacity: 0, y: 24 })
      gsap.to(bios, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: bio1Ref.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }

    // Signature
    if (sigRef.current) {
      gsap.set(sigRef.current, { opacity: 0, y: 24 })
      gsap.to(sigRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: sigRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }
  }, [])

  return (
    <section
      id="about"
      style={{
        backgroundColor: 'var(--bg-void)',
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-12">
          {/* Portrait */}
          <ImageReveal
            src="https://static.wixstatic.com/media/a5a306_8bb7caa1f37949de8f6b535d1ad7d22c~mv2.jpg/v1/fill/w_1512,h_1390,fp_0.57_0.53,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/Washingtons2025(20of20).jpg"
            alt="William B.A. Washington portrait"
            aspectRatio="4/5"
            className="w-full"
          />

          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <h2
              ref={headlineRef}
              className="font-display text-3xl md:text-5xl font-bold leading-[1.15]"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
            >
              Hi! My name is{' '}
              <span style={{ color: 'var(--accent-amber)' }}>William</span>{' '}
              and I&apos;m a{' '}
              <span style={{ color: 'var(--accent-amber)' }}>GRAMMY&reg; Award-nominated</span>{' '}
              <em>vocal producer, educator,</em> and <em>music technologist.</em>
            </h2>

            <p
              ref={bio1Ref}
              className="mt-8 text-lg md:text-xl font-light leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Over the course of my career, I&apos;ve acquired tons of experience as an artist, stage performer, audio engineer, and creative project manager. From organizing live performances, collaborating with artists, teaching students, and working with underserved communities, I&apos;ve been able to build a track record of successfully delivering projects from concept to completion.
            </p>

            <p
              ref={bio2Ref}
              className="mt-4 text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              This site is designed to give you insight into my passion for creating impactful experiences, my creative thought process, and a look at some of the projects I&apos;ve been a part of from behind the scenes.
            </p>

            <p
              ref={sigRef}
              className="mt-8 text-base italic leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              I look forward to the opportunity to work with you in the future!
              <br />
              &mdash; William B.A. Washington
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
