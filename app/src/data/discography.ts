// =============================================================================
// DISCOGRAPHY & STREAMING DATA
// Source: Chartmetric (chartmetric.com) — pulled May 14, 2026
// Last updated: May 15, 2026
// =============================================================================
// TO ADD MORE RELEASES:
// 1. Look up the track on Chartmetric
// 2. Copy the "Summary Statistics" panel data below
// 3. Update the streamingStats totals at the bottom
// 4. Rebuild and redeploy
// =============================================================================

export interface DiscographyEntry {
  id: string
  artist: string
  title: string
  year: number
  role: string
  type: 'album' | 'single' | 'ep'
  image: string
  links: { spotify?: string; apple?: string; youtube?: string }
  stats: {
    spotifyStreams: number  // in millions
    youtubeViews: number    // in thousands
    airplaySpins: number
    tikTokViews: number     // in thousands
    shazamCount: number     // in thousands
    chartmetricScore: number
  }
  milestones?: string[]
}

export interface CountryAirplay {
  country: string
  countryCode: string
  spins: number
  intensity: 'high' | 'medium' | 'low'
}

// =============================================================================
// INDIVIDUAL TRACK DATA — from Chartmetric Summary Statistics
// =============================================================================

export const discography: DiscographyEntry[] = [
  {
    id: 'lukas-graham-share-that-love',
    artist: 'Lukas Graham',
    title: 'Share That Love (feat. G-Eazy)',
    year: 2020,
    role: 'Vocal Producer',
    type: 'single',
    image: '/images/discography/lukas-graham-share-that-love.jpg',
    links: {},
    stats: {
      spotifyStreams: 141.5,
      youtubeViews: 13100,
      airplaySpins: 24100,
      tikTokViews: 56600,
      shazamCount: 441.4,
      chartmetricScore: 63.8,
    },
    milestones: ['Deezer Ecuador Chart #78 (Apr 2025)'],
  },
  {
    id: 'lady-gaga-babylon',
    artist: 'Lady Gaga',
    title: 'Babylon',
    year: 2020,
    role: 'Vocal Producer',
    type: 'single',
    image: '/images/discography/lady-gaga-babylon.jpg',
    links: {},
    stats: {
      spotifyStreams: 77.6,
      youtubeViews: 10100,
      airplaySpins: 602,
      tikTokViews: 29700,
      shazamCount: 89.7,
      chartmetricScore: 59.3,
    },
    milestones: ['Deezer Estonia Chart #48 (Jan 2026)'],
  },
  {
    id: 'kesi-tilbage',
    artist: 'Kesi',
    title: 'Tilbage',
    year: 2020,
    role: 'Vocal Producer',
    type: 'single',
    image: '/images/discography/kesi-tilbage.jpg',
    links: {},
    stats: {
      spotifyStreams: 23.5,
      youtubeViews: 783.7,
      airplaySpins: 817,
      tikTokViews: 1800,
      shazamCount: 22.5,
      chartmetricScore: 57.7,
    },
    milestones: [],
  },
  {
    id: 'future-animals-crazy-love',
    artist: 'Future Animals',
    title: 'Crazy Love',
    year: 2020,
    role: 'Vocal Producer',
    type: 'single',
    image: '/images/discography/future-animals-crazy-love.jpg',
    links: {},
    stats: {
      spotifyStreams: 15.6,
      youtubeViews: 849.5,
      airplaySpins: 1700,
      tikTokViews: 6,
      shazamCount: 126.9,
      chartmetricScore: 46.0,
    },
    milestones: [],
  },
  {
    id: 'lukas-graham-promise',
    artist: 'Lukas Graham',
    title: 'Promise',
    year: 2023,
    role: 'Vocal Producer',
    type: 'single',
    image: '/images/discography/lukas-graham-4-pink-album.jpg',
    links: {},
    stats: {
      spotifyStreams: 11.5,
      youtubeViews: 2100,
      airplaySpins: 3,
      tikTokViews: 420.9,
      shazamCount: 0,
      chartmetricScore: 44.0,
    },
    milestones: [],
  },
  {
    id: 'lukas-graham-hold-my-hand',
    artist: 'Lukas Graham',
    title: 'Hold My Hand',
    year: 2023,
    role: 'Vocal Producer',
    type: 'single',
    image: '/images/discography/lukas-graham-4-pink-album.jpg',
    links: {},
    stats: {
      spotifyStreams: 11.5,
      youtubeViews: 2800,
      airplaySpins: 53,
      tikTokViews: 317,
      shazamCount: 0,
      chartmetricScore: 44.3,
    },
    milestones: [],
  },
  {
    id: 'hedegaard-need-you',
    artist: 'Hedegaard',
    title: 'Need You Right Now',
    year: 2020,
    role: 'Vocal Producer',
    type: 'single',
    image: '/images/discography/hedegaard-need-you-right-now.jpg',
    links: {},
    stats: {
      spotifyStreams: 11.1,
      youtubeViews: 370,
      airplaySpins: 10,
      tikTokViews: 276.1,
      shazamCount: 12.1,
      chartmetricScore: 43.4,
    },
    milestones: [],
  },
  {
    id: 'lukas-graham-say-yes',
    artist: 'Lukas Graham',
    title: 'Say Yes (Church Ballad)',
    year: 2023,
    role: 'Vocal Producer',
    type: 'single',
    image: '/images/discography/lukas-graham-4-pink-album.jpg',
    links: {},
    stats: {
      spotifyStreams: 8.6,
      youtubeViews: 1600,
      airplaySpins: 15,
      tikTokViews: 93.3,
      shazamCount: 0,
      chartmetricScore: 43.9,
    },
    milestones: [],
  },
  {
    id: 'calby-heartbeat',
    artist: 'Calby',
    title: 'Heartbeat',
    year: 2022,
    role: 'Vocal Producer & Audio Engineer',
    type: 'single',
    image: '/images/discography/calby-heartbeat.jpg',
    links: {},
    stats: {
      spotifyStreams: 0.6,
      youtubeViews: 46.3,
      airplaySpins: 254,
      tikTokViews: 0,
      shazamCount: 0.3,
      chartmetricScore: 56.8,
    },
    milestones: [],
  },
]

// =============================================================================
// AGGREGATED STATS — sum of all tracks above
// Update these whenever you add new tracks
// =============================================================================

export const streamingStats = {
  totalSpotifyStreams: 301.5,    // millions
  totalYoutubeViews: 30749.5,    // thousands = ~30.7M
  totalAirplaySpins: 27554,
  totalTikTokViews: 91013.3,     // thousands = ~91M
  tracksWithData: 9,
  lastUpdated: 'May 15, 2026',
  dataSource: 'Chartmetric',
}

// =============================================================================
// COUNTRY AIRPLAY — pulled from Chartmetric geographic data
// =============================================================================

export const countryAirplay: CountryAirplay[] = [
  { country: 'Denmark', countryCode: 'DNK', spins: 22000, intensity: 'high' },
  { country: 'United States', countryCode: 'USA', spins: 3500, intensity: 'high' },
  { country: 'United Kingdom', countryCode: 'GBR', spins: 800, intensity: 'medium' },
  { country: 'Sweden', countryCode: 'SWE', spins: 450, intensity: 'medium' },
  { country: 'Germany', countryCode: 'DEU', spins: 280, intensity: 'low' },
  { country: 'Canada', countryCode: 'CAN', spins: 200, intensity: 'low' },
  { country: 'Australia', countryCode: 'AUS', spins: 150, intensity: 'low' },
  { country: 'Norway', countryCode: 'NOR', spins: 74, intensity: 'low' },
]
