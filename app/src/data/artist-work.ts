export interface ArtistWorkEntry {
  id: string
  title: string
  artist: string
  year: number
  role: 'Featured Artist' | 'Songwriter' | 'Co-Writer' | 'Co-Creator'
  category: 'feature' | 'songwriting' | 'social'
  image: string
  links: {
    spotify?: string
    apple?: string
    youtube?: string
    tiktok?: string
    instagram?: string
  }
  description?: string
}

export const artistWork: ArtistWorkEntry[] = [
  {
    id: 'template-feature-1',
    title: 'Song Title',
    artist: 'Primary Artist Name',
    year: 2024,
    role: 'Featured Artist',
    category: 'feature',
    image: 'images/placeholder-cover.jpg',
    links: {
      spotify: 'https://open.spotify.com/track/',
    },
    description:
      'Replace this entry with a real feature credit. Include context about how the collaboration came together and what you contributed.',
  },
  {
    id: 'template-songwriter-1',
    title: 'Song Title',
    artist: 'Primary Artist Name',
    year: 2023,
    role: 'Songwriter',
    category: 'songwriting',
    image: 'images/placeholder-cover.jpg',
    links: {
      apple: 'https://music.apple.com/us/album/',
    },
    description:
      'Replace this entry with a real songwriting credit. Describe your writing process and the lyrical themes you explored.',
  },
  {
    id: 'template-social-1',
    title: 'Challenge Title',
    artist: 'Collaborator Name',
    year: 2025,
    role: 'Co-Creator',
    category: 'social',
    image: 'images/placeholder-cover.jpg',
    links: {
      tiktok: 'https://www.tiktok.com/',
    },
    description:
      'Replace this entry with a real social collaboration. Mention the challenge name, the creator you worked with, and any traction it gained.',
  },
]

export const artistWorkCategories = [
  { key: 'all', label: 'All' },
  { key: 'feature', label: 'Featured On' },
  { key: 'songwriting', label: 'Written By' },
  { key: 'social', label: 'Social' },
] as const
