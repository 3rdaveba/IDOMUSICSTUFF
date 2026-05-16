// =============================================================================
// EDIT FROM YOUR PHONE:
// 1. Go to github.com/3rdaveba/IDOMUSICSTUFF on your phone browser
// 2. Navigate to: app/src/data/artist-work.ts
// 3. Tap the pencil (✎) icon
// 4. Add/modify entries below, then commit to main
// 5. GitHub Actions auto-builds and deploys — no computer needed
//
// For new YouTube videos, just paste the URL and copy an existing entry format.
// For local image/video files, you still need a computer to upload to public/.
// =============================================================================

export interface ArtistWorkEntry {
  id: string
  title: string
  subtitle?: string
  year: number
  category: 'release' | 'video' | 'social'
  subcategory: 'solo' | 'feature' | 'music-video' | 'lyric-video' | 'collaboration'
  image: string
  links: {
    spotify?: string
    apple?: string
    youtube?: string
    tidal?: string
    tiktok?: string
    instagram?: string
    soundcloud?: string
  }
  description?: string
}

export const artistWorkCategories = [
  { key: 'all', label: 'All' },
  { key: 'release', label: 'Releases' },
  { key: 'video', label: 'Videos' },
  { key: 'social', label: 'Social' },
] as const

export const artistWork: ArtistWorkEntry[] = [
  // ─── SOLO RELEASES ───
  {
    id: 'ba-solo-1',
    title: 'Solo Track Title',
    subtitle: 'Single',
    year: 2024,
    category: 'release',
    subcategory: 'solo',
    image: 'images/placeholder-cover.jpg',
    links: {
      spotify: 'https://open.spotify.com',
      apple: 'https://music.apple.com',
      youtube: 'https://youtube.com',
    },
    description: 'Replace with your solo release. Add streaming links and artwork.',
  },

  // ─── FEATURES ───
  {
    id: 'ba-we-get-the-party-started',
    title: 'We Get The Party Started',
    subtitle: 'feat. B.A.',
    year: 2023,
    category: 'release',
    subcategory: 'feature',
    image: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0210528bc05892cdc7b60d1126',
    links: {
      spotify: 'https://open.spotify.com/track/5AC3jJ4aFDWXrTRVm3XKdh',
      tidal: 'https://listen.tidal.com/track/360223419',
    },
    description: 'Feature credit. Streaming on Spotify and Tidal.',
  },
  {
    id: 'ba-one-of-a-kind',
    title: 'One of a Kind',
    subtitle: 'feat. B.A.',
    year: 2025,
    category: 'release',
    subcategory: 'feature',
    image: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02b9f8c80a195a9874616f803e',
    links: {
      spotify: 'https://open.spotify.com/track/3ba4kKQbDim0DQCDXx3Uwi?si=b7e66356770e487d',
      apple: 'https://music.apple.com/us/album/one-of-a-kind-feat-b-a-single/1799988815',
      tidal: 'https://listen.tidal.com/track/421820687',
    },
    description: 'Feature credit. Streaming on Spotify, Apple Music, and Tidal.',
  },
  {
    id: 'ba-feature-1',
    title: 'Track Title',
    subtitle: 'feat. B.A.',
    year: 2024,
    category: 'release',
    subcategory: 'feature',
    image: 'images/placeholder-cover.jpg',
    links: {
      spotify: 'https://open.spotify.com',
      youtube: 'https://youtube.com',
    },
    description: 'Replace with a feature credit. Mention the primary artist and your contribution.',
  },

  // ─── MUSIC VIDEOS ───
  {
    id: 'ba-54-17-mv',
    title: '54:17',
    subtitle: 'Official Music Video',
    year: 2016,
    category: 'video',
    subcategory: 'music-video',
    image: 'https://img.youtube.com/vi/gDux9KLzWzU/maxresdefault.jpg',
    links: {
      youtube: 'https://youtu.be/gDux9KLzWzU',
    },
    description: 'From the album "Born Again". Music written, produced and performed by William "B.A." Washington.',
  },
  {
    id: 'ba-he-set-me-free-mv',
    title: 'He Set Me Free',
    subtitle: 'Official Music Video',
    year: 2017,
    category: 'video',
    subcategory: 'music-video',
    image: 'https://img.youtube.com/vi/LywstQIMsp0/maxresdefault.jpg',
    links: {
      youtube: 'https://youtu.be/LywstQIMsp0',
    },
    description: 'From the album "Born Again". Music written, produced and performed by William "B.A." Washington.',
  },
  {
    id: 'ba-where-would-i-be-mv',
    title: 'Where Would I Be?',
    subtitle: 'Official Music Video',
    year: 2020,
    category: 'video',
    subcategory: 'music-video',
    image: 'https://img.youtube.com/vi/ApQ2lEBVUbc/maxresdefault.jpg',
    links: {
      youtube: 'https://youtu.be/ApQ2lEBVUbc',
    },
    description: 'From the album "Born Again". Music written, produced and performed by William "B.A." Washington.',
  },
  {
    id: 'ba-mv-1',
    title: 'Music Video Title',
    subtitle: 'Official Music Video',
    year: 2024,
    category: 'video',
    subcategory: 'music-video',
    image: 'images/placeholder-cover.jpg',
    links: {
      youtube: 'https://youtube.com',
    },
    description: 'Replace with a music video. Add a thumbnail or still frame.',
  },

  // ─── LYRIC VIDEOS ───
  {
    id: 'ba-glow-lv',
    title: 'Glow',
    subtitle: 'Official Lyric Video',
    year: 2020,
    category: 'video',
    subcategory: 'lyric-video',
    image: 'https://img.youtube.com/vi/98iblEJBjSs/maxresdefault.jpg',
    links: {
      youtube: 'https://youtu.be/4gnRFbj9-dw',
    },
    description: 'From the album "Born Again". Music written, produced and performed by William "B.A." Washington.',
  },
  {
    id: 'ba-lv-1',
    title: 'Lyric Video Title',
    subtitle: 'Lyric Video',
    year: 2024,
    category: 'video',
    subcategory: 'lyric-video',
    image: 'images/placeholder-cover.jpg',
    links: {
      youtube: 'https://youtube.com',
    },
    description: 'Replace with a lyric video entry.',
  },

  // ─── SOCIAL COLLABORATIONS ───
  {
    id: 'ba-grinch-flow-valentinbeatz',
    title: 'Grinch Flow',
    subtitle: 'with @valentinbeatz',
    year: 2022,
    category: 'social',
    subcategory: 'collaboration',
    image: 'https://img.youtube.com/vi/UEx_Y9SCUCE/maxresdefault.jpg',
    links: {
      youtube: 'https://youtube.com/shorts/UEx_Y9SCUCE',
    },
    description: 'Christmas Grinch flow over production by @valentinbeatz.',
  },
  {
    id: 'ba-freestyle-therealasethic',
    title: 'Freestyle',
    subtitle: 'with @therealasethic',
    year: 2026,
    category: 'social',
    subcategory: 'collaboration',
    image: 'https://img.youtube.com/vi/Aj1vCcyG8q4/maxresdefault.jpg',
    links: {
      youtube: 'https://youtube.com/shorts/Aj1vCcyG8q4',
    },
    description: 'Freestyle verse over production by @therealasethic.',
  },
  {
    id: 'ba-joker-open-verse',
    title: 'Joker Open Verse',
    subtitle: 'with @Dax',
    year: 2023,
    category: 'social',
    subcategory: 'collaboration',
    image: 'https://img.youtube.com/vi/6uZz2-R64Qc/maxresdefault.jpg',
    links: {
      youtube: 'https://youtube.com/shorts/6uZz2-R64Qc',
    },
    description: 'Had fun getting into character for this one 😈.',
  },
  {
    id: 'ba-social-1',
    title: 'Collaboration Title',
    subtitle: 'with @creator',
    year: 2025,
    category: 'social',
    subcategory: 'collaboration',
    image: 'images/placeholder-cover.jpg',
    links: {
      youtube: 'https://youtube.com',
    },
    description: 'Replace with a social media collaboration. Mention the platform, creator, and any traction.',
  },
]
