import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Check for touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) return

    // Hide default cursor
    document.body.style.cursor = 'none'

    const onMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }

    const onMouseOver = (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement
      const isClickable =
        targetEl.tagName === 'A' ||
        targetEl.tagName === 'BUTTON' ||
        targetEl.closest('a') ||
        targetEl.closest('button') ||
        targetEl.closest('[role="button"]')
      setIsHovering(!!isClickable)
    }

    let rafId: number

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15
      pos.current.y += (target.current.y - pos.current.y) * 0.15

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      }

      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    rafId = requestAnimationFrame(animate)

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none transition-[width,height,opacity] duration-300"
      style={{
        zIndex: 9999,
        width: isHovering ? 40 : 8,
        height: isHovering ? 40 : 8,
        backgroundColor: 'var(--accent-amber)',
        borderRadius: '50%',
        mixBlendMode: 'difference',
        opacity: isHovering ? 0.2 : 1,
      }}
    />
  )
}
