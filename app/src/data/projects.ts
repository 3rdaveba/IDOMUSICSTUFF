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
    description: 'Capturing voices and stunning visuals to be used for artist archival and future marketing campaigns.',
    dmaic: {
      D: { label: 'Define', text: 'Capture high-quality audio and visual content for long-term artist archival and future marketing use on behalf of Sony Music Denmark.' },
      M: { label: 'Measure', text: 'Completeness of audio and visual asset delivery. Usability of materials across archival and marketing applications.' },
      A: { label: 'Analyze', text: 'Multi-format capture in a live event context required precise coordination across audio, video, and production teams with no room for error.' },
      I: { label: 'Improve', text: 'Executed a capture strategy optimized for fidelity and flexibility, ensuring assets would hold up across future uses beyond the original event.' },
      C: { label: 'Control', text: 'Delivered a complete, structured asset library to the client. Materials organized for long-term accessibility and reuse by the artist and label.' },
    },
    timeline: [
      { phase: '01', label: 'Pre-Production Planning' },
      { phase: '02', label: 'Multi-Format Capture' },
      { phase: '03', label: 'Post-Production & Edit' },
      { phase: '04', label: 'Asset Organization' },
      { phase: '05', label: 'Client Delivery' },
    ],
    tools: ['Pro Tools', 'Multi-Track Recording', 'Visual Capture', 'Asset Management', 'Sony Music Denmark Pipeline'],
    outcomes: [
      'Complete audio & visual asset library delivered',
      'Materials archived for long-term artist use',
      'Marketing-ready content for future campaigns',
      'Structured delivery to Sony Music Denmark',
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
    description: 'Arranging and producing vocals for an international pop album project.',
    dmaic: {
      D: { label: 'Define', text: 'Arrange and produce vocals for an international pop album release with a globally recognized artist.' },
      M: { label: 'Measure', text: 'Vocal performance quality, arrangement cohesion, and alignment with the artistic vision of the project.' },
      A: { label: 'Analyze', text: 'Navigated the demands of international collaboration, high production standards, and artist-specific stylistic expectations.' },
      I: { label: 'Improve', text: 'Delivered polished vocal arrangements and production that integrated seamlessly into the final album release.' },
      C: { label: 'Control', text: 'Album released internationally. Vocal contributions sustained across the full project lifecycle from pre-production to final mix.' },
    },
    timeline: [
      { phase: '01', label: 'Pre-Production' },
      { phase: '02', label: 'Vocal Arrangement' },
      { phase: '03', label: 'Studio Recording' },
      { phase: '04', label: 'Production & Mix' },
      { phase: '05', label: 'International Release' },
    ],
    tools: ['Vocal Arranging', 'Pro Tools', 'Comping & Tuning', 'Session Direction', 'International Collaboration'],
    outcomes: [
      'Vocal arrangements on international album release',
      'Cohesive vocal performances across full album',
      'Aligned with artist vision and label standards',
      'Sustained through pre-production to final mix',
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
]

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}
