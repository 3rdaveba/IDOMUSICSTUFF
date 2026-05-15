import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ParallaxHeader from '@/components/ParallaxHeader'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/projects'

gsap.registerPlugin(ScrollTrigger)

export default function WorkSection() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return

    const cards = gridRef.current.children
    if (cards.length === 0) return

    gsap.set(cards, { opacity: 0, y: 60, scale: 0.97 })

    const tween = gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      tween.kill()
    }
  }, [])

  return (
    <section
      id="work"
      className="relative"
      style={{
        zIndex: 1,
        minHeight: '100vh',
        paddingTop: 'var(--section-padding-y)',
        paddingBottom: 'var(--section-padding-y)',
      }}
    >
      <div className="content-container">
        {/* Parallax Header */}
        <ParallaxHeader
          line1="SELECTED"
          line2="WORK"
          triggerSelector="#work"
        />

        {/* Intro copy */}
        <p
          className="text-base md:text-lg font-light max-w-2xl mt-6 mb-12"
          style={{ color: 'var(--text-secondary)' }}
        >
          A cross-section of projects spanning music production, community education,
          systems architecture, and creative technology — each built with the same
          intention: craft something meaningful, scalable, and human.
        </p>

        {/* Divider */}
        <div
          className="w-full mb-12"
          style={{ height: 1, backgroundColor: 'var(--border-color)' }}
        />

        {/* Active Section */}
        {projects.filter((p) => p.status === 'active').length > 0 && (
          <>
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#1D9E75' }} />
              <h3 className="text-eyebrow" style={{ color: 'var(--text-tertiary)' }}>
                Active
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
              {projects
                .filter((p) => p.status === 'active')
                .map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    number={`0${i + 1}`}
                    title={project.title}
                    description={project.description}
                    image={project.heroImage}
                    projectId={project.id}
                    category={project.category}
                    status={project.status}
                  />
                ))}
            </div>
          </>
        )}

        {/* Complete Section */}
        <div className="flex items-center gap-3 mb-8">
          <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--text-tertiary)' }} />
          <h3 className="text-eyebrow" style={{ color: 'var(--text-tertiary)' }}>
            Complete
          </h3>
        </div>

        {/* Project Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
        >
          {projects
            .filter((p) => p.status === 'complete')
            .map((project, i) => (
              <ProjectCard
                key={project.id}
                number={`0${i + 1}`}
                title={project.title}
                description={project.description}
                image={project.heroImage}
                projectId={project.id}
                category={project.category}
                status={project.status}
              />
            ))}
        </div>
      </div>
    </section>
  )
}
