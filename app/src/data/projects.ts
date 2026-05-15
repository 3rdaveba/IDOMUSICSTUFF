export interface DMAICStep {
  label: string
  text: string
}

export interface MediaItem {
  type: 'photo-slot' | 'video-slot' | 'link-slot'
  label: string
  icon?: string
  url?: string
  src?: string
}

export interface TimelineEvent {
  phase: string
  label: string
}

export interface StreamingLink {
  platform: string
  url: string
}

export interface Project {
  id: string
  title: string
  category: 'music' | 'systems'
  role: string
  status: 'active' | 'complete'
  heroImage: string
  heroVideo?: string
  description: string
  dmaic: {
    D: DMAICStep
    M: DMAICStep
    A: DMAICStep
    I: DMAICStep
    C: DMAICStep
  }
  timeline: TimelineEvent[]
  tools: string[]
  outcomes: string[]
  streaming?: StreamingLink[]
  media?: {
    items: MediaItem[]
  }
}

export const projects: Project[] = [
  {
    id: 'audiolab-intelligence',
    title: 'Audiolab Intelligence',
    category: 'systems',
    role: 'Architect & Systems Designer',
    status: 'active',
    heroImage: 'images/project-lukas.jpg',
    description: 'Design a private, autonomous agent infrastructure for creative workflow intelligence, operating 24/7 without human intervention.',
    dmaic: {
      D: { label: 'Define', text: 'Design a private, autonomous agent infrastructure for creative workflow intelligence, operating 24/7 without human intervention.' },
      M: { label: 'Measure', text: 'System uptime, task completion rate, zero unauthorized writes to production code, full audit trail coverage.' },
      A: { label: 'Analyze', text: 'Identified gaps between existing creative tooling and intelligent automation. Designed around strict read-only safety boundaries and multi-model orchestration.' },
      I: { label: 'Improve', text: 'Implemented containerized agent system with structured memory, scheduled intelligence pipelines, and layered security constraints.' },
      C: { label: 'Control', text: 'All agent outputs logged and traceable. No secrets in memory. No arbitrary execution. Ongoing monitoring via heartbeat scheduler.' },
    },
    timeline: [
      { phase: '01', label: 'Research & Architecture' },
      { phase: '02', label: 'Core System Build' },
      { phase: '03', label: 'Agent Integration' },
      { phase: '04', label: 'Security Hardening' },
      { phase: '05', label: 'Ongoing Optimization' },
    ],
    tools: ['Docker', 'Python', 'LLM Orchestration', 'Structured Memory Systems', 'Heartbeat Scheduling', 'Read-Only Security Boundaries'],
    outcomes: [
      'Autonomous 24/7 agent infrastructure',
      'Zero unauthorized production writes',
      'Full audit trail on all outputs',
      'Multi-model orchestration pipeline',
    ],
  },
  {
    id: 'calby-inner-critic',
    title: "Calby — Inner Critic's Choice Awards",
    category: 'music',
    role: 'Vocal Producer & Audio Engineer',
    status: 'complete',
    heroImage: 'images/project-calby.jpg',
    heroVideo: 'project media/Calby \u2014 Inner Critic\'s Choice Awards/CALBY PROJECT BANNER VIDEO.mp4',
    description: 'Vocal producer for background vocals across 12 songs on an unreleased album for Danish artist Calby. Managed vocal arrangements, talent acquisition, production coordination, and budget oversight on behalf of Sony Music Denmark and Bogs Agency.',
    dmaic: {
      D: { label: 'Define', text: 'Produce background vocal arrangements for 12 songs on Calby\'s album, managing talent, production logistics, and budget for Sony Music Denmark / Bogs Agency.' },
      M: { label: 'Measure', text: 'Completion of vocal arrangements, successful recording of prioritized songs, stakeholder approval of arrangements, and delivery of promotional video content.' },
      A: { label: 'Analyze', text: 'Tight timeline (less than a week for arrangements), budget constraints, balancing musical requirements with videography needs, and coordinating multiple teams across pre-production and recording.' },
      I: { label: 'Improve', text: 'Created and refined vocal arrangements under pressure, acquired and managed vocal talent, coordinated studio sessions, collaborated with videographers, and delivered all prioritized songs within budget and timeframe.' },
      C: { label: 'Control', text: 'All prioritized songs recorded successfully. Stakeholders gave positive feedback. High-quality audio and visual assets delivered for archival and marketing use.' },
    },
    timeline: [
      { phase: '01', label: 'Pre-Production & Arrangement' },
      { phase: '02', label: 'Talent Acquisition' },
      { phase: '03', label: 'Studio Recording' },
      { phase: '04', label: 'Post-Production' },
      { phase: '05', label: 'Client Delivery' },
    ],
    tools: ['Pro Tools', 'Vocal Arranging', 'BGV Production', 'Talent Management', 'Budget Management', 'Studio Coordination', 'Multi-Track Recording', 'Video Collaboration'],
    outcomes: [
      'Vocal arrangements for 12 songs delivered',
      'All prioritized songs recorded within timeframe',
      'Positive stakeholder feedback from artist and label',
      'High-quality audio and visual assets for marketing',
      'Effective budget management under constraints',
    ],
    streaming: [
      { platform: 'Spotify', url: 'https://open.spotify.com/album/3QhpZrBYmjDXLP0lu35Tg7' },
      { platform: 'Pandora', url: 'https://www.pandora.com/AL:28125140' },
      { platform: 'Tidal', url: 'https://listen.tidal.com/album/321639547' },
    ],
    media: {
      items: [
        { type: 'photo-slot', label: 'Photo', src: 'project media/Calby \u2014 Inner Critic\'s Choice Awards/wix-image-1.png' },
        { type: 'photo-slot', label: 'Photo', src: 'project media/Calby \u2014 Inner Critic\'s Choice Awards/wix-image-2.png' },
        { type: 'photo-slot', label: 'Photo', src: 'project media/Calby \u2014 Inner Critic\'s Choice Awards/calby project photo 3.jpg' },
        { type: 'photo-slot', label: 'Artwork', src: 'project media/Calby \u2014 Inner Critic\'s Choice Awards/Calby Daydream Artwork.jpg' },
        { type: 'video-slot', label: 'Pre Production', src: 'project media/Calby \u2014 Inner Critic\'s Choice Awards/Calby - Pre Production Session 2023.mp4' },
        { type: 'video-slot', label: 'Studio Session', src: 'project media/Calby \u2014 Inner Critic\'s Choice Awards/Calby studio session 2 .mp4' },
      ],
    },
  },
  {
    id: 'lukas-graham-purple',
    title: 'Lukas Graham 3 — The Purple Album',
    category: 'music',
    role: 'Vocal Producer & Arranger',
    status: 'complete',
    heroImage: 'images/project-lukas-graham.jpg',
    heroVideo: 'project media/Lukas Graham - The Purple Album/LGLP BTS UPDATED.mp4',
    description: 'Vocal producer for background vocals on four songs for Lukas Graham\'s 3 (The Purple Album). Created arrangements, hired and directed vocal talent, and led recording sessions in collaboration with Warner Music Group and Then We Take The World.',
    dmaic: {
      D: { label: 'Define', text: 'Create vocal arrangements for four songs on Lukas Graham\'s 3 (The Purple Album), hiring vocal talent and leading recording sessions for Warner Music Group / Then We Take The World.' },
      M: { label: 'Measure', text: 'Quality of vocal arrangements, performance cohesion, stakeholder satisfaction, and seamless integration of BGVs into the final album.' },
      A: { label: 'Analyze', text: 'High-profile partnership demands, balancing commercial appeal with artist vision, managing vocal talent schedules, and making on-the-spot arrangement modifications during sessions.' },
      I: { label: 'Improve', text: 'Created arrangements informed by deep artist research, hired fitting vocal talent, led recording sessions with real-time adjustments, and negotiated fair talent compensation within budget.' },
      C: { label: 'Control', text: 'All four songs delivered with high-quality vocal performances. Stakeholders expressed great satisfaction. Relationships strengthened for future collaborations.' },
    },
    timeline: [
      { phase: '01', label: 'Research & Preparation' },
      { phase: '02', label: 'Vocal Arrangement' },
      { phase: '03', label: 'Talent Acquisition' },
      { phase: '04', label: 'Studio Recording' },
      { phase: '05', label: 'International Release' },
    ],
    tools: ['Vocal Arranging', 'Pro Tools', 'Talent Acquisition', 'Session Direction', 'Stakeholder Negotiation', 'Comping & Tuning', 'International Collaboration'],
    outcomes: [
      'Vocal arrangements for four songs on international release',
      'High-quality vocal performances capturing artist vision',
      'Stakeholder satisfaction from Warner Music and management',
      'Strengthened relationships for future collaborations',
      'Seamless BGV integration into final album mix',
    ],
    streaming: [
      { platform: 'Spotify', url: 'https://open.spotify.com/album/02gV87QEIFp2T9q7OqVBjj' },
      { platform: 'Pandora', url: 'https://www.pandora.com/AL:1831323' },
      { platform: 'Tidal', url: 'https://listen.tidal.com/album/96589868' },
    ],
    media: {
      items: [
        { type: 'photo-slot', label: 'Photo', src: 'project media/Lukas Graham - The Purple Album/LGLP3 2018.jpg' },
        { type: 'photo-slot', label: 'Photo', src: 'project media/Lukas Graham - The Purple Album/William & Lukas LGLP3 2018.jpg' },
        { type: 'video-slot', label: 'BTS', src: 'project media/Lukas Graham - The Purple Album/LGLP BTS UPDATED.mp4' },
      ],
    },
  },
  {
    id: 'heart-soul-image-village',
    title: 'Heart & Soul — Image Village 2023',
    category: 'music',
    role: 'Music & Technology Educator',
    status: 'complete',
    heroImage: 'images/project-heart-soul.jpg',
    description: 'Creating impactful experiences for youth in South Central Los Angeles through the power of music and technology.',
    dmaic: {
      D: { label: 'Define', text: 'Create impactful music and technology experiences for youth in South Central Los Angeles.' },
      M: { label: 'Measure', text: 'Youth engagement, skill development outcomes, and community reach within the program.' },
      A: { label: 'Analyze', text: 'Designed programming to meet participants at varied skill and exposure levels while maintaining high creative standards.' },
      I: { label: 'Improve', text: 'Delivered hands-on music and technology curriculum that connected creative expression to practical skills.' },
      C: { label: 'Control', text: 'Program outcomes documented. Community relationships built for continued collaboration.' },
    },
    timeline: [
      { phase: '01', label: 'Curriculum Design' },
      { phase: '02', label: 'Community Outreach' },
      { phase: '03', label: 'Workshop Delivery' },
      { phase: '04', label: 'Student Projects' },
      { phase: '05', label: 'Outcome Documentation' },
    ],
    tools: ['Music Production', 'STEM Education', 'Ableton Live', 'MIDI Controllers', 'Community Engagement'],
    outcomes: [
      'Youth skill development in music & tech',
      'Community relationships established',
      'Hands-on curriculum delivered at scale',
      'Documented program outcomes for stakeholders',
    ],
    media: {
      items: [
        { type: 'photo-slot', label: 'Photo' },
        { type: 'photo-slot', label: 'Photo' },
        { type: 'video-slot', label: 'BTS' },
      ],
    },
  },
  {
    id: 'jimmy-gnarly-live',
    title: 'JIMMY — A Gnarly Live Performance',
    category: 'music',
    role: 'Creative Collaborator & Live Production',
    status: 'complete',
    heroImage: 'images/project-jimmy.jpg',
    description: 'Collaborating to create a dynamic live performance of an unreleased alt. hip hop album during the global pandemic.',
    dmaic: {
      D: { label: 'Define', text: 'Produce a dynamic live performance of an unreleased alt. hip hop album during the global pandemic.' },
      M: { label: 'Measure', text: 'Audience impact, artistic cohesion, and successful execution of an unreleased body of work in a live format.' },
      A: { label: 'Analyze', text: 'Solved the creative and logistical challenge of staging a compelling live show under pandemic-era constraints.' },
      I: { label: 'Improve', text: 'Collaborated to design and execute a high-energy live set that brought the album to life without a traditional release.' },
      C: { label: 'Control', text: 'Performance completed and documented. Served as a controlled creative proof-of-concept for the artist\'s unreleased work.' },
    },
    timeline: [
      { phase: '01', label: 'Creative Concepting' },
      { phase: '02', label: 'Set Design & Logistics' },
      { phase: '03', label: 'Rehearsal & Tech' },
      { phase: '04', label: 'Live Performance' },
      { phase: '05', label: 'Documentation & Archive' },
    ],
    tools: ['Live Production', 'Stage Design', 'Pandemic Safety Protocols', 'Multi-Camera Capture', 'Creative Direction'],
    outcomes: [
      'Dynamic live set of unreleased album executed',
      'Creative proof-of-concept for artist',
      'Documented performance under pandemic constraints',
      'High audience engagement and artistic cohesion',
    ],
    media: {
      items: [
        { type: 'photo-slot', label: 'Photo' },
        { type: 'video-slot', label: 'BTS' },
        { type: 'link-slot', icon: 'Youtube', label: 'Watch' },
      ],
    },
  },
  {
    id: 'lmu-gospel-choir',
    title: 'LMU Gospel Choir',
    category: 'music',
    role: 'Adjunct Professor / Gospel Choir Director',
    status: 'complete',
    heroImage: 'images/project-lmu-gospel-choir.jpg',
    description: 'Directed the LMU Gospel Choir, housed in the Department of African American Studies, through semester-long cycles of recruitment, rehearsal, and performance. Assumed the role upon recommendation from the previous director and managed all aspects of production including graphic design for promotional materials, hiring session musicians, negotiating departmental budgets, and collaborating with alumni vocalists for end-of-semester concerts.',
    dmaic: {
      D: { label: 'Define', text: 'Sustain and direct the LMU Gospel Choir within the Department of African American Studies, focusing on student vocal development, culturally informed performance, and successful end-of-semester concerts each term across all four course levels.' },
      M: { label: 'Measure', text: 'Student enrollment and retention across non-audition course levels, performance quality, vocal growth across the semester, successful execution of end-of-semester concerts, and community engagement.' },
      A: { label: 'Analyze', text: 'Operating a non-audition ensemble within a department outside of music, managing enrollment decline, navigating departmental budget restrictions, working with students of varying skill levels, and working within an established curriculum while adding personal direction to rehearsals and performances.' },
      I: { label: 'Improve', text: 'Led an existing gospel choir program, combining African American Gospel Music history with practical vocal training. Taught music by rote with score reading support. Provided one-on-one and small group vocal coaching. Created flyers and promotional graphics for performances. Hired session musicians. Negotiated budget allocation with department leadership. Invited alumni to return as lead vocalists for concerts. Advocated for course cross-listing to boost enrollment.' },
      C: { label: 'Control', text: 'Multiple semesters of successful end-of-semester concerts delivered. Students developed vocal technique and cultural understanding across a non-audition ensemble. Alumni collaborations strengthened the program\'s legacy. Promotional materials consistently drove audience attendance.' },
    },
    timeline: [
      { phase: '01', label: 'Semester Planning & Budget' },
      { phase: '02', label: 'Recruitment & Auditions' },
      { phase: '03', label: 'Rehearsal & Direction' },
      { phase: '04', label: 'Performance Production' },
      { phase: '05', label: 'Concert & Evaluation' },
    ],
    tools: ['Vocal Direction', 'Program Leadership', 'Graphic Design', 'Budget Negotiation', 'Talent Acquisition', 'Alumni Relations', 'Event Planning', 'Music Selection'],
    outcomes: [
      'Multiple successful end-of-semester concerts produced',
      'Student vocal development and cultural education delivered each semester',
      'Alumni vocalists engaged for concert collaborations',
      'Promotional materials and flyers designed for performances',
      'Session musicians hired and coordinated for live performances',
    ],
    media: {
      items: [
        { type: 'photo-slot', label: 'Photo' },
        { type: 'video-slot', label: 'BTS' },
      ],
    },
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

export function getAdjacentProjects(id: string): { prev: Project | undefined; next: Project | undefined } {
  const idx = projects.findIndex((p) => p.id === id)
  return {
    prev: idx > 0 ? projects[idx - 1] : undefined,
    next: idx >= 0 && idx < projects.length - 1 ? projects[idx + 1] : undefined,
  }
}
