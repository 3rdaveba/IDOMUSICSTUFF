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
      'Sinners is a 2025 film written and directed by Ryan Coogler, starring Michael B. Jordan, Hailee Steinfeld, and Jack O\'Connell. Set in 1932 Mississippi, the story follows twin brothers who return home to find their town haunted by supernatural forces. I am a member of The DC6 Singers Collective, a vocal ensemble that contributed to the film\'s original motion picture soundtrack. Our performances anchored key emotional moments throughout the film. The soundtrack went on to win a GRAMMY® Award, marking my first win as a credited artist.',
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
