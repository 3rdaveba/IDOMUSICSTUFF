import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ParallaxHeader from '@/components/ParallaxHeader'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/projects'

gsap.registerPlugin(ScrollTrigger)

export default function WorkSection() {
  const { t } = useTranslation()
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
        paddingBottom: '60px',
      }}
    >
      <div className="content-container">
        {/* Parallax Header */}
        <ParallaxHeader
          line1={t('work.line1')}
          line2={t('work.line2')}
          triggerSelector="#work"
        />

        {/* Intro copy */}
        <p
          className="text-base md:text-lg font-light max-w-2xl mt-6 mb-12"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('work.intro')}
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
                {t('work.active')}
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16">
              {projects
                .filter((p) => p.status === 'active')
                .map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    number={`0${i + 1}`}
                    title={project.title}
                    description={t(`data.projects.${project.id}.description`, { defaultValue: project.description })}
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
            {t('work.complete')}
          </h3>
        </div>

        {/* Project Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
        >
          {projects
            .filter((p) => p.status === 'complete')
            .map((project, i) => (
              <ProjectCard
                key={project.id}
                number={`0${i + 1}`}
                title={project.title}
                description={t(`data.projects.${project.id}.description`, { defaultValue: project.description })}
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
