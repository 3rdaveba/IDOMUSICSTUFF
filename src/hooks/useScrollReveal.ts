import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type RevealVariant = 'heading' | 'body' | 'element' | 'stat'

interface RevealConfig {
  variant?: RevealVariant
  delay?: number
  stagger?: number
  childSelector?: string
}

const configMap: Record<RevealVariant, { y: number; duration: number; ease: string; scale?: number }> = {
  heading: { y: 40, duration: 0.8, ease: 'power3.out' },
  body: { y: 24, duration: 0.6, ease: 'power2.out' },
  element: { y: 60, duration: 0.8, ease: 'power2.out', scale: 0.97 },
  stat: { y: 40, duration: 1.0, ease: 'power3.out' },
}

export function useScrollReveal<T extends HTMLElement>(config: RevealConfig = {}) {
  const ref = useRef<T>(null)
  const { variant = 'element', delay = 0, stagger = 0, childSelector } = config

  useEffect(() => {
    if (!ref.current) return

    const targets = childSelector
      ? ref.current.querySelectorAll(childSelector)
      : [ref.current]

    if (targets.length === 0) return

    const cfg = configMap[variant]

    gsap.set(targets, {
      opacity: 0,
      y: cfg.y,
      ...(cfg.scale !== undefined ? { scale: cfg.scale } : {}),
    })

    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      ...(cfg.scale !== undefined ? { scale: 1 } : {}),
      duration: cfg.duration,
      ease: cfg.ease,
      delay,
      stagger: stagger || undefined,
      scrollTrigger: {
        trigger: ref.current,
        start: variant === 'heading' ? 'top 85%' : 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      tween.kill()
    }
  }, [variant, delay, stagger, childSelector])

  return ref
}
