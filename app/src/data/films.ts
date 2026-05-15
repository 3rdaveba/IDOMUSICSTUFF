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
      'Featured vocalist on the original motion picture soundtrack for Ryan Coogler\'s Sinners. Contributed vocal performances that anchored key emotional moments in the film. The soundtrack received a GRAMMY® Award, marking my first win as a credited artist.',
    image: 'images/film-sinners.jpg',
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
