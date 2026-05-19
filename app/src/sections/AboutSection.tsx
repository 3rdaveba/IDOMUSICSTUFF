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
            src="images/portrait-william.jpg"
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
              <span style={{ color: 'var(--accent-amber)' }}>GRAMMY&reg; Award-winning</span>{' '}
              vocal producer, music technologist, and creative systems architect.
            </h2>

            <p
              ref={bio1Ref}
              className="mt-8 text-lg md:text-xl font-light leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Throughout my career, I&apos;ve built a body of experience across music, live performance, education, and creative project management. As an artist, stage performer, audio engineer, and collaborator, I&apos;ve had the opportunity to help bring ideas to life across a wide range of spaces&hellip;from live events and recording sessions to student programs, community initiatives, and artist-driven projects.
            </p>

            <p
              ref={bio2Ref}
              className="mt-8 text-lg md:text-xl font-light leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              My work is rooted in creating meaningful experiences, supporting creative vision, and guiding projects from concept to completion with intention, care, and professionalism. This portfolio offers a look into my creative process, the work I&apos;ve contributed to, and the projects that reflect my passion for building experiences that connect with people.
            </p>

            <p
              ref={sigRef}
              className="mt-8 text-lg md:text-xl font-light leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              I look forward to connecting and exploring how we can work together!
              <br />
              <span className="inline-block mt-4">&mdash; William &quot;B.A.&quot; Washington</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
