import { useParams, useNavigate } from 'react-router'
import { useEffect, useRef } from 'react'
import { ArrowLeft, Music, Cpu, Image, Video, ExternalLink, CheckCircle2 } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getProjectById } from '@/data/projects'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { lenisInstance } from '@/hooks/useLenis'

gsap.registerPlugin(ScrollTrigger)

const dmaicKeys = ['D', 'M', 'A', 'I', 'C'] as const

const dmaicMeta: Record<string, { word: string; question: string }> = {
  D: { word: 'Define', question: 'What was the goal?' },
  M: { word: 'Measure', question: 'What did success look like?' },
  A: { word: 'Analyze', question: 'What were the challenges?' },
  I: { word: 'Improve', question: 'What was implemented?' },
  C: { word: 'Control', question: 'How was quality sustained?' },
}

const iconMap: Record<string, React.ReactNode> = {
  'Music': <Music size={14} />,
  'Spotify': <ExternalLink size={14} />,
  'Apple': <ExternalLink size={14} />,
  'Youtube': <Video size={14} />,
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const project = getProjectById(id || '')

  const heroRef = useRef<HTMLDivElement>(null)
  const overviewRef = useRef<HTMLDivElement>(null)
  const narrativeRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [])

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power3.out' })
    }

    const sections = [overviewRef, narrativeRef, detailsRef, mediaRef].filter(Boolean)
    sections.forEach((ref, i) => {
      if (!ref.current) return
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.15 * (i + 1),
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
  }, [])

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-void)' }}>
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Project not found</h1>
          <button
            onClick={() => navigate('/work')}
            className="mt-6 inline-flex items-center gap-2 transition-colors duration-300"
            style={{ color: 'var(--accent-amber)' }}
          >
            <ArrowLeft size={16} /> Back to Work
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-void)' }}>
      <Navigation />

      {/* ===== HERO ===== */}
      <div ref={heroRef} className="relative w-full overflow-hidden" style={{ height: 'clamp(260px, 38vh, 420px)' }}>
        <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,9,8,0.2) 0%, rgba(10,9,8,0.85) 100%)' }} />

        {/* Breadcrumb navigation */}
        <nav className="absolute top-20 left-6 md:left-12 z-10 flex items-center gap-2 text-xs font-medium uppercase tracking-wider">
          <button
            onClick={() => navigate('/')}
            className="transition-colors duration-300 hover:text-[var(--accent-amber)]"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Home
          </button>
          <span style={{ color: 'var(--text-tertiary)' }}>/</span>
          <button
            onClick={() => {
              navigate('/')
              setTimeout(() => {
                const el = document.getElementById('work')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }, 100)
            }}
            className="transition-colors duration-300 hover:text-[var(--accent-amber)]"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Work
          </button>
          <span style={{ color: 'var(--text-tertiary)' }}>/</span>
          <span style={{ color: 'var(--text-primary)' }}>{project.title}</span>
        </nav>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="content-container">
            <h1
              className="font-display text-3xl md:text-5xl font-bold leading-tight"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
            >
              {project.title}
            </h1>
            <p className="mt-2 text-base md:text-lg font-light" style={{ color: 'var(--text-secondary)' }}>
              {project.role}
            </p>
          </div>
        </div>
      </div>

      {/* ===== OVERVIEW BAR ===== */}
      <div ref={overviewRef} className="content-container -mt-6 relative z-10 mb-16">
        <div
          className="flex flex-wrap items-center gap-x-8 gap-y-3 px-6 py-4 rounded-md"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}
        >
          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: project.status === 'active' ? '#1D9E75' : 'var(--text-tertiary)' }} />
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
              {project.status === 'active' ? 'Active / Ongoing' : 'Complete'}
            </span>
          </div>

          <div className="hidden sm:block w-px h-4" style={{ backgroundColor: 'var(--border-color)' }} />

          {/* Category */}
          <div className="flex items-center gap-1.5">
            {project.category === 'music' ? <Music size={13} style={{ color: 'var(--accent-amber)' }} /> : <Cpu size={13} style={{ color: 'var(--accent-amber)' }} />}
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
              {project.category === 'music' ? 'Music & Production' : 'Systems & Technology'}
            </span>
          </div>

          <div className="hidden sm:block w-px h-4" style={{ backgroundColor: 'var(--border-color)' }} />

          {/* DMAIC indicator */}
          <div className="flex items-center gap-1.5">
            {dmaicKeys.map((k) => (
              <span
                key={k}
                className="text-[10px] font-bold w-5 h-5 rounded flex items-center justify-center"
                style={{ backgroundColor: 'rgba(196, 149, 106, 0.12)', color: 'var(--accent-amber)' }}
              >
                {k}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="content-container pb-20">
        {/* ===== PROJECT NARRATIVE + DMAIC SIDEBAR ===== */}
        <div ref={narrativeRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24">
          {/* Left: Story */}
          <div className="lg:col-span-7">
            <span className="text-eyebrow block mb-4" style={{ color: 'var(--text-tertiary)' }}>
              PROJECT OVERVIEW
            </span>
            <p
              className="font-display text-xl md:text-2xl font-medium leading-relaxed mb-10"
              style={{ color: 'var(--text-primary)' }}
            >
              {project.description}
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--accent-amber)' }}>
                  The Challenge
                </h3>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {project.dmaic.A.text}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--accent-amber)' }}>
                  The Approach
                </h3>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {project.dmaic.I.text}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--accent-amber)' }}>
                  Outcomes
                </h3>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {project.dmaic.C.text}
                </p>
              </div>
            </div>
          </div>

          {/* Right: DMAIC Sidebar */}
          <div className="lg:col-span-5">
            <div
              className="sticky top-24 p-6 rounded-md"
              style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}
            >
              <span className="text-eyebrow block mb-6" style={{ color: 'var(--text-tertiary)' }}>
                PROCESS FRAMEWORK
              </span>

              <div className="space-y-0">
                {dmaicKeys.map((key, i) => {
                  const step = project.dmaic[key]
                  const meta = dmaicMeta[key]
                  return (
                    <div
                      key={key}
                      className="flex gap-4 py-4"
                      style={{ borderBottom: i < dmaicKeys.length - 1 ? '1px solid var(--border-color)' : 'none' }}
                    >
                      <div className="flex-shrink-0">
                        <span
                          className="inline-flex items-center justify-center w-9 h-9 rounded-md font-display text-lg font-bold"
                          style={{
                            backgroundColor: key === 'D' ? 'rgba(196, 149, 106, 0.15)' : 'transparent',
                            color: 'var(--accent-amber)',
                            border: key === 'D' ? '1px solid var(--accent-amber)' : '1px solid var(--border-color)',
                          }}
                        >
                          {key}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
                            {meta.word}
                          </span>
                          <span className="text-[11px] italic" style={{ color: 'var(--text-tertiary)' }}>
                            {meta.question}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                          {step.text}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ===== PROJECT TIMELINE ===== */}
        <div ref={detailsRef} className="mb-24">
          <div className="mb-12">
            <span className="text-eyebrow block mb-4" style={{ color: 'var(--text-tertiary)' }}>
              PROJECT TIMELINE
            </span>
            <div className="flex items-center gap-3 overflow-x-auto pb-4">
              {project.timeline.map((event, i) => (
                <div key={i} className="flex items-center gap-3 flex-shrink-0">
                  <div
                    className="flex flex-col items-center gap-1 px-4 py-3 rounded-md min-w-[140px]"
                    style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}
                  >
                    <span
                      className="font-display text-lg font-bold"
                      style={{ color: 'var(--accent-amber)' }}
                    >
                      {event.phase}
                    </span>
                    <span
                      className="text-[11px] font-medium text-center leading-tight"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {event.label}
                    </span>
                  </div>
                  {i < project.timeline.length - 1 && (
                    <div className="flex-shrink-0 w-6 h-px" style={{ backgroundColor: 'var(--accent-amber)', opacity: 0.4 }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Two column: Tools + Outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tools */}
            <div
              className="p-6 rounded-md"
              style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}
            >
              <span className="text-eyebrow block mb-5" style={{ color: 'var(--text-tertiary)' }}>
                TOOLS & SKILLS
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs font-medium px-3 py-1.5 rounded-md"
                    style={{
                      backgroundColor: 'var(--bg-surface-elevated)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Outcomes */}
            <div
              className="p-6 rounded-md"
              style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}
            >
              <span className="text-eyebrow block mb-5" style={{ color: 'var(--text-tertiary)' }}>
                KEY OUTCOMES
              </span>
              <div className="space-y-3">
                {project.outcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--accent-amber)' }} />
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== MEDIA GALLERY ===== */}
        {project.media && (
          <div ref={mediaRef}>
            <span className="text-eyebrow block mb-6" style={{ color: 'var(--text-tertiary)' }}>
              MEDIA & RESOURCES
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {project.media.items.map((item, i) => (
                <div
                  key={i}
                  className="group flex flex-col items-center justify-center gap-2 rounded-md cursor-pointer transition-all duration-200 hover:border-[var(--accent-amber)]"
                  style={{
                    aspectRatio: '4/3',
                    border: '1px dashed var(--border-color)',
                    backgroundColor: 'var(--bg-surface)',
                  }}
                >
                  {item.type === 'photo-slot' && <Image size={22} style={{ color: 'var(--text-tertiary)' }} className="group-hover:text-[var(--accent-amber)] transition-colors" />}
                  {item.type === 'video-slot' && <Video size={22} style={{ color: 'var(--text-tertiary)' }} className="group-hover:text-[var(--accent-amber)] transition-colors" />}
                  {item.type === 'link-slot' && (
                    <span className="group-hover:text-[var(--accent-amber)] transition-colors" style={{ color: 'var(--text-tertiary)' }}>
                      {iconMap[item.icon || ''] || <ExternalLink size={22} />}
                    </span>
                  )}
                  <span className="text-[11px] font-medium" style={{ color: 'var(--text-tertiary)' }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
