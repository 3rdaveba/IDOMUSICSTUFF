export interface Certification {
  id: string
  title: string
  issuer: string
  issued: string
  expires?: string
  credentialId: string
  skills: string[]
}

export const certifications: Certification[] = [
  {
    id: 'lean-six-sigma-yellow-belt',
    title: 'Lean Six Sigma Yellow Belt',
    issuer: 'GLSS (GoLeanSixSigma.com)',
    issued: 'Apr 2025',
    expires: 'Apr 2027',
    credentialId: '0250400467',
    skills: ['Lean Six Sigma', 'Lean Process Improvement'],
  },
  {
    id: 'vectorworks-2025-core-associate',
    title: 'Vectorworks 2025 Core Associate Certification',
    issuer: 'Vectorworks',
    issued: 'Jan 2025',
    expires: 'Jan 2028',
    credentialId: '0997711682WW',
    skills: ['Audio Visual System Design'],
  },
  {
    id: 'dante-certification-level-1',
    title: 'Dante Certification Level 1',
    issuer: 'Audinate',
    issued: 'Nov 2023',
    expires: 'Nov 2026',
    credentialId: '4a61-53a0-aaed-bdf6',
    skills: ['Professional Audio'],
  },
  {
    id: 'crestron-certified-audio-technician',
    title: 'Crestron Certified Audio Technician',
    issuer: 'Crestron Electronics',
    issued: 'Feb 2024',
    credentialId: 'AUD-000-240204-07006',
    skills: ['Audio Visual (AV) Systems'],
  },
]
