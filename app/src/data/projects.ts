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
    id: 'creative-intelligence-production-system',
    title: 'Creative Intelligence Production System',
    category: 'systems',
    role: 'Architect & Systems Designer',
    status: 'active',
    heroImage: 'project media/Creative Intelligence Production System/image-web.jpg',
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
    id: 'the-reimagination-engine',
    title: 'The Reimagination Engine',
    category: 'systems',
    role: 'Creative Systems & Technology Lead',
    status: 'active',
    heroImage: 'project media/The Reimagination Engine/image.png',
    description: 'An experimental release project where old demos and unfinished song ideas are reimagined through AI tools and released in clustered waves. Drops happen every other week in alternating three-track clusters — one wave relational, the next energetic — with performance reviewed every 45 days. The goal is to see if consistent releases alone can generate streaming revenue and organic traction without any marketing, social media presence, or paid promotion. If a track lands in the top tier of its cluster, it gets flagged for potential reproduction or licensing.',
    dmaic: {
      D: { label: 'Define', text: 'Take old demos and song ideas, run them through AI tools to create new iterations, and release them publicly every other week for one year with zero marketing or social media push.' },
      M: { label: 'Measure', text: 'Track streaming numbers, saves, completion rates, and listener retention across roughly 30 releases over 12 months. Every 45 days, review cluster performance to see which wave style is gaining traction and which individual tracks are rising to the top.' },
      A: { label: 'Analyze', text: 'Compare relational clusters against energetic clusters. Identify which tracks land in the top 20% of their wave, and look for patterns in what resonates when there is no external promotion driving traffic.' },
      I: { label: 'Improve', text: 'When a track performs in the top 20% of its cluster with above-median engagement, flag it for reproduction or licensing exploration. Reinvest any revenue back into refining the workflow.' },
      C: { label: 'Control', text: 'After 30 releases and one year, evaluate whether the catalog is sustainably generating revenue. Decide whether to continue, pivot the release strategy, or pull the catalog and test a new system.' },
    },
    timeline: [
      { phase: '01', label: 'Catalog Curation' },
      { phase: '02', label: 'AI Iteration & Release' },
      { phase: '03', label: 'Performance Tracking' },
      { phase: '04', label: 'Revenue & Licensing Evaluation' },
      { phase: '05', label: 'System Review & Next Phase' },
    ],
    tools: ['Suno', 'AI Music Tools', 'DSP Streaming', 'Metadata Systems', 'Cluster-Based Release Scheduling', '45-Day Review Cycles'],
    outcomes: [
      'Roughly 30 releases deployed in alternating relational/energetic clusters',
      'Biweekly release cadence sustained over 12 months',
      '45-day performance reviews identifying top-tier tracks for reproduction',
      'Organic streaming revenue generated without marketing spend',
      'Revenue and licensing opportunities surfaced by cluster data',
      'A repeatable experiment framework for future release systems',
    ],
    media: {
      items: [
        { type: 'photo-slot', label: 'Photo', src: 'project media/The Reimagination Engine/image.png' },
        { type: 'video-slot', label: 'Workflow', src: 'project media/The Reimagination Engine/placeholder.mp4' },
      ],
    },
  },
  {
    id: 'vocal-production-lab',
    title: 'The Vocal Production Lab',
    category: 'music',
    role: 'Course Creator & Instructor',
    status: 'complete',
    heroImage: 'project media/The Vocal Production Lab/course-image.png',
    heroVideo: 'project media/The Vocal Production Lab/new hero banner video.mp4',
    description: 'An online instructional course designed to teach intermediate music technology users what vocal production is, why it matters, and how to achieve professional vocal recordings at home or in the studio.',
    dmaic: {
      D: { label: 'Define', text: 'Create an accessible online course that teaches vocal production concepts — from understanding the voice through recording, editing, and mixing — without requiring expensive equipment or overly complex language.' },
      M: { label: 'Measure', text: 'Course completeness across 12 lessons, 3 quizzes, and 6 practical assignments; video production quality; student comprehension and engagement; and platform usability.' },
      A: { label: 'Analyze', text: 'Vocal production is a niche focus with limited consolidated learning resources. Creating engaging educational video content required solving continuity across multiple filming days, managing environmental noise, and learning an unfamiliar hosting platform.' },
      I: { label: 'Improve', text: 'Produced 16 videos including 12 lessons, an introduction, a course ending, and a trailer. Filmed in a home studio using multiple camera angles and screen recordings. Edited with motion graphics, sound design, and professional titles. Built the course on Thinkific with organized curriculum, quizzes, and downloadable audio examples compatible with any DAW.' },
      C: { label: 'Control', text: 'Course published and available for students. Content organized with clear lesson objectives, assignments, and assessments. Framework designed to be replicable for future courses in music technology and related topics.' },
    },
    timeline: [
      { phase: '01', label: 'Research & Curriculum Design' },
      { phase: '02', label: 'Scripting & Lesson Planning' },
      { phase: '03', label: 'Filming & Production' },
      { phase: '04', label: 'Editing & Post-Production' },
      { phase: '05', label: 'Platform Build & Publishing' },
    ],
    tools: ['Adobe Premiere Pro', 'OBS Studio', 'Thinkific', 'Canva', 'HandBrake', 'Motion Graphics', 'Sound Design', 'Teleprompter Direction', 'Home Studio Production'],
    outcomes: [
      '16-video course published with professional motion graphics and titles',
      '12 lessons covering voice, recording, editing, and mixing',
      '3 quizzes and 6 practical assignments with downloadable audio examples',
      'Hosted course platform built and organized for student usability',
      'Replicable course framework established for future expansion',
    ],
    media: {
      items: [
        { type: 'photo-slot', label: 'Course Image', src: 'project media/The Vocal Production Lab/course-image.png' },
        { type: 'photo-slot', label: 'Lesson Title Card', src: 'project media/The Vocal Production Lab/lesson-title-card.jpg' },
        { type: 'photo-slot', label: 'Interactive Quiz', src: 'project media/The Vocal Production Lab/quiz-interactive.jpg' },
        { type: 'photo-slot', label: 'Instructor-Led Lesson', src: 'project media/The Vocal Production Lab/lesson-instructor.jpg' },
        { type: 'video-slot', label: 'Introduction', src: 'project media/The Vocal Production Lab/introduction.mp4' },
        { type: 'link-slot', icon: 'ExternalLink', label: 'Take Course', url: 'https://epiphanymusicgroup.thinkific.com/courses/the-vocal-production-lab' },
      ],
    },
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
    title: 'Heart & Soul Center - Image Village 2023',
    category: 'music',
    role: 'Music & Technology Educator',
    status: 'complete',
    heroImage: 'images/project-heart-soul.jpg',
    heroVideo: 'project media/Heart and Soul Center/HAS CENTER bg.mp4',
    description: 'Led the choral and recording studio components of Image Village 2023, a summer camp at Heart and Soul Center in South Central Los Angeles. Taught vocal technique and ensemble skills to two age groups while guiding students through songwriting, DAW production, and music video creation.',
    dmaic: {
      D: { label: 'Define', text: 'Deliver a summer camp music program at Heart and Soul Center combining choral instruction and recording studio education for youth in South Central Los Angeles.' },
      M: { label: 'Measure', text: 'Student skill development in vocal technique and music production, successful end-of-camp performance, completion of student music video, and lesson plan delivery.' },
      A: { label: 'Analyze', text: 'Teaching two distinct age groups with different skill levels. Balancing choral rehearsal with studio production in limited time. Coordinating lesson plans, materials, and a final performance within a three-week schedule.' },
      I: { label: 'Improve', text: 'Created comprehensive lesson plans with clear learning objectives. Taught vocal technique, ensemble skills, and stage presence for the choral component. Guided students through songwriting, DAW production, and music video creation for the studio component. Prepared both groups for the end-of-camp performance.' },
      C: { label: 'Control', text: 'End-of-camp performance delivered successfully with both age groups. Students completed songwriting and production projects. Music video created. Lesson plans executed and documented. Photo and video footage archived for portfolio.' },
    },
    timeline: [
      { phase: '01', label: 'Lesson Plan Development' },
      { phase: '02', label: 'Choral Instruction' },
      { phase: '03', label: 'Studio Instruction' },
      { phase: '04', label: 'Performance & Video' },
      { phase: '05', label: 'Documentation & Archive' },
    ],
    tools: ['Vocal Instruction', 'DAW Production', 'Songwriting', 'Music Video Production', 'Lesson Planning', 'Ensemble Direction', 'Youth Education'],
    outcomes: [
      'End-of-camp performance with both age groups',
      'Student songwriting and DAW production projects completed',
      'Music video created by students',
      'Comprehensive lesson plans developed and executed',
      'Photo and video footage archived for portfolio',
    ],
    media: {
      items: [
        { type: 'photo-slot', label: 'Photo', src: 'project media/Heart and Soul Center/HAS CENTER.00_00_00_27.Still001.jpg' },
        { type: 'photo-slot', label: 'Photo', src: 'project media/Heart and Soul Center/HAS CENTER.00_00_22_47.Still002.jpg' },
        { type: 'photo-slot', label: 'Photo', src: 'project media/Heart and Soul Center/HAS CENTER.00_00_43_12.Still003.jpg' },
        { type: 'video-slot', label: 'PRVBLEMS', src: 'project media/Heart and Soul Center/Image Village 2023 - PRVBLEMS.mp4' },
        { type: 'video-slot', label: 'Recording Studio', src: 'project media/Heart and Soul Center/Has Center - Recording Studio.mp4' },
        { type: 'video-slot', label: 'Rehearsal', src: 'project media/Heart and Soul Center/C0021-HD 720p.mp4' },
        { type: 'video-slot', label: 'Choir Rehearsal', src: 'project media/Heart and Soul Center/06 - The Name Game - Choir Rehearsal.mp4' },
      ],
    },
  },
  {
    id: 'jimmy-gnarly-live',
    title: 'JIMMY — A Gnarly Live Performance',
    category: 'music',
    role: 'Vocal Producer / Choir Director',
    status: 'complete',
    heroImage: 'images/project-jimmy.jpg',
    heroVideo: 'project media/Jimmy/Jimmy Luna Show Header.mp4',
    description: 'Collaborating to create a dynamic live performance of an unreleased alt. hip hop album during the global pandemic.',
    dmaic: {
      D: { label: 'Define', text: 'Create a dynamic live performance of an unreleased alt. hip hop album during the global pandemic, elevating vocal performances to a professional standard through choir direction and vocal production.' },
      M: { label: 'Measure', text: 'Vocal cohesion, harmonization quality, individual and group vocal performance growth, and successful execution of the live set.' },
      A: { label: 'Analyze', text: 'Navigated the challenge of adapting vocal arrangements to suit the specific needs and abilities of choir members, showcasing strengths and minimizing weaknesses under pandemic-era constraints.' },
      I: { label: 'Improve', text: 'Led pre-production planning and rehearsals, collaborating closely with the artist, musicians, and choir members. Provided guidance and feedback on vocal techniques and harmonization to enhance overall musicality.' },
      C: { label: 'Control', text: 'Performance completed and documented. Choir and vocal arrangements achieved professional cohesion, serving as a creative proof-of-concept for the artist\'s unreleased work.' },
    },
    timeline: [
      { phase: '01', label: 'Pre-Production Planning' },
      { phase: '02', label: 'Vocal Arrangement & Adaptation' },
      { phase: '03', label: 'Choir Rehearsals' },
      { phase: '04', label: 'Rehearsal with Artist & Musicians' },
      { phase: '05', label: 'Live Performance' },
    ],
    tools: ['Vocal Production', 'Choir Direction', 'Vocal Arrangement', 'Harmonization', 'Rehearsal Direction', 'Creative Collaboration'],
    outcomes: [
      'Vocal arrangements adapted to highlight choir strengths',
      'Individual and group vocal performances elevated through focused coaching',
      'Professional-level harmonization and musicality achieved',
      'Dynamic live set of unreleased album executed successfully',
    ],
    media: {
      items: [
        { type: 'photo-slot', label: 'Photo', src: 'project media/Jimmy/DSC02121-web.jpeg' },
        { type: 'photo-slot', label: 'Photo', src: 'project media/Jimmy/DSC02161-web.jpeg' },
        { type: 'photo-slot', label: 'Photo', src: 'project media/Jimmy/DSC02174-web.jpeg' },
        { type: 'photo-slot', label: 'Photo', src: 'project media/Jimmy/DSC02552-web.jpeg' },
        { type: 'photo-slot', label: 'Photo', src: 'project media/Jimmy/DSC03122-web.jpeg' },
        { type: 'photo-slot', label: 'Photo', src: 'project media/Jimmy/DSC03166-web.jpeg' },
        { type: 'photo-slot', label: 'Photo', src: 'project media/Jimmy/DSC03174-web.jpeg' },
        { type: 'photo-slot', label: 'Photo', src: 'project media/Jimmy/DSC03318-web.jpeg' },
        { type: 'video-slot', label: 'Show Header', src: 'project media/Jimmy/Jimmy Luna Show Header.mp4' },
        { type: 'video-slot', label: 'Trailer', src: 'project media/Jimmy/10 - gnarly live trailer.mp4' },
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
    description: 'Directed the LMU Gospel Choir, leading semester-long cycles of recruitment, rehearsal, and performance. Managed vocal coaching, promotional design, musician hiring, budget negotiation, and alumni collaborations.',
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
        { type: 'photo-slot', label: 'Photo', src: 'project media/LMU Gospel Choir/lmu gospel choir_edited.jpg' },
        { type: 'photo-slot', label: 'Photo', src: 'project media/LMU Gospel Choir/LMU GOSPEL CHOIR.00_19_42_31.Still010.jpg' },
        { type: 'photo-slot', label: 'Photo', src: 'project media/LMU Gospel Choir/IMG_9187.jpeg' },
        { type: 'photo-slot', label: 'Photo', src: 'project media/LMU Gospel Choir/IMG_9596.JPG' },
        { type: 'photo-slot', label: 'Photo', src: 'project media/LMU Gospel Choir/IMG_9721.jpeg' },
        { type: 'video-slot', label: 'Interlude', src: 'project media/LMU Gospel Choir/LMU GOSPEL CHOIR interlude video.mp4' },
        { type: 'video-slot', label: 'Rehearsal', src: 'project media/LMU Gospel Choir/I get to spend Monday Nights working with some awesome students and we all get to spend our rehe.mp4' },
        { type: 'video-slot', label: 'Sunday Service', src: 'project media/LMU Gospel Choir/If Waves and Man in the Mirror were Sunday Service songs (Private).mp4' },
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
