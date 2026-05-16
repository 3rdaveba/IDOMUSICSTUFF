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
    id: 'ba-social-1',
    title: 'Collaboration Title',
    subtitle: 'with @creator',
    year: 2025,
    category: 'social',
    subcategory: 'collaboration',
    image: 'images/placeholder-cover.jpg',
    links: {
      tiktok: 'https://tiktok.com',
      instagram: 'https://instagram.com',
    },
    description: 'Replace with a social media collaboration. Mention the platform, creator, and any traction.',
  },
]
