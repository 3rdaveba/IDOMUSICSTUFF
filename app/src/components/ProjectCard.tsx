import { useNavigate } from 'react-router'

interface ProjectCardProps {
  number: string
  title: string
  description: string
  image: string
  projectId: string
  category?: 'music' | 'systems'
  status?: 'active' | 'complete'
}

export default function ProjectCard({
  number,
  title,
  description,
  image,
  projectId,
  category = 'music',
}: ProjectCardProps) {
  const navigate = useNavigate()

  return (
    <div
      className="group cursor-pointer"
      onClick={() => navigate(`/project/${projectId}`)}
    >
      {/* Image container */}
      <div className="relative overflow-hidden rounded" style={{ aspectRatio: '1/1' }}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform ease-out group-hover:scale-[1.03]"
          style={{ transitionDuration: '400ms' }}
          loading="lazy"
        />

      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 mt-4">
        <span className="text-eyebrow" style={{ color: 'var(--text-tertiary)' }}>
          {number}
        </span>
        <span
          className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded"
          style={{
            backgroundColor: 'rgba(196, 149, 106, 0.1)',
            color: 'var(--accent-amber)',
          }}
        >
          {category === 'music' ? (projectId === 'lmu-gospel-choir' || projectId === 'heart-soul-image-village' ? 'Music & Education' : 'Music & Production') : 'Systems & Technology'}
        </span>
      </div>
      <h3
        className="font-display italic text-xl md:text-[28px] font-medium mt-2 leading-tight"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
      </h3>
      <p
        className="text-sm md:text-base font-normal mt-2 leading-relaxed line-clamp-2"
        style={{ color: 'var(--text-secondary)' }}
      >
        {description}
      </p>
      <span
        className="inline-block mt-3 text-xs font-medium transition-colors duration-300 group-hover:underline"
        style={{ color: 'var(--accent-amber)' }}
      >
        View project details &rarr;
      </span>
    </div>
  )
}
