export interface StreamingLink {
  platform: string
  url: string
}

export interface Film {
  id: string
  title: string
  studio: string
  year: number
  role: string
  recognition: string
  description: string
  image: string
  heroVideo?: string
  streaming?: StreamingLink[]
  details?: {
    heading: string
    text: string
  }[]
  media?: {
    items: {
      type: 'photo' | 'video'
      label: string
      src: string
    }[]
  }
}

export const films: Film[] = [
  {
    id: 'sinners',
    title: 'Sinners',
    studio: 'Warner Bros.',
    year: 2025,
    role: 'Featured Vocalist — Original Motion Picture Soundtrack',
    recognition: 'GRAMMY® Award Winner',
    description:
      'Featured vocalist on the original motion picture soundtrack for Sinners, the 2025 Warner Bros. film written and directed by Ryan Coogler.',
    image: 'images/film-sinners.jpg',
    streaming: [
      {
        platform: 'Spotify',
        url: 'https://open.spotify.com/album/0zjAqh1Fr7XQWy1SlzGhMn',
      },
      {
        platform: 'Apple Music',
        url: 'https://music.apple.com/us/album/sinners-original-motion-picture-soundtrack/1808534010',
      },
      {
        platform: 'Pandora',
        url: 'https://www.pandora.com/artist/sinners-movie/sinners-original-motion-picture-soundtrack/ALX2n574lwX4hn6',
      },
      {
        platform: 'TIDAL',
        url: 'https://listen.tidal.com/album/430131352',
      },
    ],
    details: [
      {
        heading: 'About the Film',
        text: 'Sinners is a 2025 period thriller written and directed by Ryan Coogler, starring Michael B. Jordan, Hailee Steinfeld, and Jack O\'Connell. Set in 1932 Mississippi, the story follows twin brothers who return to their hometown and find it haunted by supernatural forces. The film blends Southern Gothic horror with deep blues and gospel musical traditions, using music as both narrative device and emotional anchor.',
      },
      {
        heading: 'The Music',
        text: 'I performed as a member of The DC6 Singers Collective, a Los Angeles-based vocal ensemble - alongside fellow members who contributed featured vocals to the film\'s soundtrack, most notably on "This Little Light of Mine" alongside Miles Caton and the Pleasant Valley Youth Choir of New Orleans. The soundtrack was executive produced by Ludwig Göransson, Ryan Coogler, and Serena Göransson, and released digitally on April 18, 2025 through Sony Masterworks.',
      },
      {
        heading: 'Recognition',
        text: 'The Sinners Original Motion Picture Soundtrack received a GRAMMY® Award for Best Compilation Soundtrack for Visual Media at the 68th Annual Grammy Awards. The songs "I Lied to You," "Pale Pale Moon," and "Sinners" were also nominated for Best Song Written for Visual Media. This marked my first win as a credited featured artist on a GRAMMY-recognized release.',
      },
    ],
  },
  {
    id: 'kpops',
    title: 'K-Pops!',
    studio: 'Anderson .Paak',
    year: 2024,
    role: 'Featured Actor & Onscreen Performer',
    recognition: 'Featured Film Performance',
    description:
      'Acted and performed onscreen in K-Pops!, a film by Anderson .Paak. Brought both musical performance and screen presence to the project, bridging the worlds of film and music in a unique creative collaboration.',
    image: 'images/film-kpops.jpg',
  },
]

export function getFilmById(id: string): Film | undefined {
  return films.find((f) => f.id === id)
}

export function getAdjacentFilms(id: string): { prev: Film | undefined; next: Film | undefined } {
  const idx = films.findIndex((f) => f.id === id)
  return {
    prev: idx > 0 ? films[idx - 1] : undefined,
    next: idx >= 0 && idx < films.length - 1 ? films[idx + 1] : undefined,
  }
}
