import type { Certification } from '@/data/certifications'

interface CertificationCardProps {
  cert: Certification
}

export default function CertificationCard({ cert }: CertificationCardProps) {
  return (
    <div
      className="group p-4 rounded-md transition-colors duration-200 hover:bg-[var(--bg-surface)]"
      style={{ border: '1px solid var(--border-color)' }}
    >
      {/* Title + issuer */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4
            className="font-display text-sm md:text-base font-semibold leading-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            {cert.title}
          </h4>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
            {cert.issuer}
          </p>
        </div>
        <span
          className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded flex-shrink-0"
          style={{
            backgroundColor: 'rgba(196, 149, 106, 0.15)',
            color: 'var(--accent-amber)',
          }}
        >
          {cert.issued}
          {cert.expires && ` – ${cert.expires}`}
        </span>
      </div>

      {/* Credential ID */}
      <p className="mt-2 text-[11px] font-mono" style={{ color: 'var(--text-tertiary)' }}>
        ID: {cert.credentialId}
      </p>

      {/* Skills */}
      <div className="mt-2 flex flex-wrap gap-1.5">
        {cert.skills.map((skill) => (
          <span
            key={skill}
            className="text-[10px] px-1.5 py-0.5 rounded"
            style={{
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-secondary)',
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}
