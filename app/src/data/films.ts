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
      'Featured actor and onscreen performer in K-Pops!, the directorial debut of Grammy-winning artist Anderson .Paak.',
    image: 'images/film-kpops.jpg',
    streaming: [
      {
        platform: 'Apple Music',
        url: 'https://music.apple.com/us/album/k-pops-music-from-and-inspired-by-k-pops-motion-picture/6768487478',
      },
    ],
    details: [
      {
        heading: 'About the Film',
        text: 'K-Pops! is the feature film directorial debut of nine-time Grammy Award winner Anderson .Paak, co-written with Khaila Amazan. The film stars .Paak as BJ, a washed-up musician who lands a gig with a house band in Seoul for a K-pop competition show called Wildcard. While working on the show, he discovers that one of the contestants — Tae Young, played by .Paak\'s real-life son Soul Rasheed — is the long-lost son he never knew he had. The cast includes Jee Young Han, Jonnie "Dumbfoundead" Park, Cathy Shim, Kevin Woo, and Yvette Nicole Brown. The film premiered at the Toronto International Film Festival in 2024, made its U.S. debut at Tribeca in 2025, and was released theatrically in February 2026 before streaming on Netflix.',
      },
      {
        heading: 'My Role',
        text: 'I appeared as a featured actor and onscreen performer, bringing both musical performance and screen presence to the project. Working on set alongside .Paak and a cast that blended K-pop stars, veteran actors, and musicians, I contributed to the film\'s unique fusion of film and live performance. The production was shot across Los Angeles, South Korea, and Saudi Arabia.',
      },
      {
        heading: 'The Music',
        text: 'The soundtrack is a seamless blend of Anderson .Paak\'s signature soul-funk sound with authentic K-pop production, shaped in collaboration with legendary producer Dem Jointz. The film features original songs and collaborations including "Keychain" with aespa, "Aftertaste" with DEAN, and contributions from NMIXX. Cameo appearances throughout the film include Vernon of Seventeen, Jessi, Jay Park, The Rose, IShowSpeed, Saweetie, Jaden Smith, Diplo, and Earth, Wind & Fire.',
      },
    ],
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
