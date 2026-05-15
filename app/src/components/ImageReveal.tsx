import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ImageRevealProps {
  src: string
  alt: string
  aspectRatio?: string
  className?: string
}

export default function ImageReveal({ src, alt, aspectRatio = '4/5', className = '' }: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const blurRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !imageRef.current || !blurRef.current) return

    gsap.set(imageRef.current, {
      clipPath: 'inset(100% 0 0% 0)',
      scale: 1.2,
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: '+=35%',
        scrub: true,
      },
    })

    tl.to(imageRef.current, {
      clipPath: 'inset(0% 0 0 0)',
      scale: 1.0,
      ease: 'none',
    }, 0)

    tl.to(blurRef.current, {
      opacity: 0,
      ease: 'none',
    }, 0)

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div ref={containerRef} className={`relative overflow-hidden rounded ${className}`} style={{ aspectRatio }}>
      {/* Blur overlay */}
      <div
        ref={blurRef}
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
          opacity: 1,
        }}
      />
      {/* Actual image */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover relative z-0"
      />
    </div>
  )
}
