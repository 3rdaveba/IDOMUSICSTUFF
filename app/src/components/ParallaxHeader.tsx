import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ParallaxHeaderProps {
  line1: string
  line2: string
  line2Color?: string
  triggerSelector: string
}

export default function ParallaxHeader({
  line1,
  line2,
  line2Color = 'var(--accent-amber)',
  triggerSelector,
}: ParallaxHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!line1Ref.current || !line2Ref.current || !containerRef.current) return

    const triggerEl = document.querySelector(triggerSelector)
    if (!triggerEl) return

    const tween1 = gsap.to(line1Ref.current, {
      x: '-15vw',
      ease: 'none',
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    const tween2 = gsap.to(line2Ref.current, {
      x: '15vw',
      ease: 'none',
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      tween1.kill()
      tween2.kill()
    }
  }, [triggerSelector])

  return (
    <div ref={containerRef} className="select-none">
      <div
        ref={line1Ref}
        className="font-display font-bold whitespace-nowrap leading-[0.9]"
        style={{
          fontSize: 'clamp(80px, 12vw, 160px)',
          color: 'var(--text-primary)',
          letterSpacing: '-0.03em',
        }}
      >
        {line1}
      </div>
      <div
        ref={line2Ref}
        className="font-display font-bold whitespace-nowrap leading-[0.9] text-right"
        style={{
          fontSize: 'clamp(80px, 12vw, 160px)',
          color: line2Color,
          letterSpacing: '-0.03em',
          opacity: 0.6,
        }}
      >
        {line2}
      </div>
    </div>
  )
}
