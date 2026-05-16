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
// Ordered chronologically: newest → oldest
// =============================================================================

export const discography: DiscographyEntry[] = [
  {
    id: 'sinners-rocky-road-to-dublin',
    artist: 'Sinners',
    title: 'Rocky Road to Dublin',
    year: 2025,
    role: 'Featured Artist · DC6 Singers Collective',
    type: 'single',
    image: 'images/discography/sinners-rocky-road-to-dublin.jpg',
    links: {
      spotify: 'https://open.spotify.com/track/1esmJ8t2PRbYt2yMx2aSEW?si=81585929586f4d9b',
      apple: 'https://geo.music.apple.com/us/album/_/1808534010?i=1808534203&mt=1&app=music&ls=1',
    },
    stats: {
      spotifyStreams: 35.4,
      youtubeViews: 11100,
      airplaySpins: 104,
      tikTokViews: 138600,
      shazamCount: 178.3,
      chartmetricScore: 82.7,
    },
    milestones: ['Spotify Viral 50 – Iceland #38 (Mar 2026)'],
  },
  {
    id: 'sinners-this-little-light',
    artist: 'Sinners',
    title: 'This Little Light of Mine',
    year: 2025,
    role: 'Featured Artist · DC6 Singers Collective',
    type: 'single',
    image: 'images/discography/sinners-rocky-road-to-dublin.jpg',
    links: {},
    stats: {
      spotifyStreams: 3.0,
      youtubeViews: 426.9,
      airplaySpins: 34,
      tikTokViews: 123.3,
      shazamCount: 33.1,
      chartmetricScore: 69.2,
    },
    milestones: [],
  },
  {
    id: 'lukas-graham-you',
    artist: 'Lukas Graham',
    title: 'You',
    year: 2023,
    role: 'Vocal Producer',
    type: 'single',
    image: 'images/discography/lukas-graham-you.jpg',
    links: {},
    stats: {
      spotifyStreams: 4.1,
      youtubeViews: 1000,
      airplaySpins: 9600,
      tikTokViews: 47900,
      shazamCount: 35.3,
      chartmetricScore: 70.2,
    },
    milestones: [],
  },
  {
    id: 'lukas-graham-share-that-love',
    artist: 'Lukas Graham',
    title: 'Share That Love (feat. G-Eazy)',
    year: 2020,
    role: 'Vocal Producer',
    type: 'single',
    image: 'images/discography/lukas-graham-share-that-love.jpg',
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
    image: 'images/discography/lady-gaga-babylon.jpg',
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
    image: 'images/discography/kesi-tilbage.jpg',
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
    image: 'images/discography/future-animals-crazy-love.jpg',
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
    id: 'matoma-its-christmas-time',
    artist: 'Matoma',
    title: "It's Christmas Time (feat. Michael Bolton)",
    year: 2020,
    role: 'Vocal Producer',
    type: 'single',
    image: 'images/discography/matoma-its-christmas-time.jpg',
    links: {},
    stats: {
      spotifyStreams: 7.8,
      youtubeViews: 0,
      airplaySpins: 0,
      tikTokViews: 2100,
      shazamCount: 0,
      chartmetricScore: 48.2,
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
    image: 'images/discography/hedegaard-need-you-right-now.jpg',
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
    id: 'matoma-sunday-morning',
    artist: 'Matoma',
    title: 'Sunday Morning (feat. Josie Dunne)',
    year: 2018,
    role: 'Vocal Producer',
    type: 'single',
    image: 'images/discography/matoma-sunday-morning.jpg',
    links: {},
    stats: {
      spotifyStreams: 63.3,
      youtubeViews: 1800,
      airplaySpins: 680,
      tikTokViews: 6500,
      shazamCount: 130.1,
      chartmetricScore: 52.6,
    },
    milestones: [],
  },
  {
    id: 'lukas-graham-promise',
    artist: 'Lukas Graham',
    title: 'Promise',
    year: 2018,
    role: 'Vocal Producer',
    type: 'single',
    image: 'images/discography/lukas-graham-3-purple-album.jpg',
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
    year: 2018,
    role: 'Vocal Producer',
    type: 'single',
    image: 'images/discography/lukas-graham-3-purple-album.jpg',
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
    id: 'lukas-graham-say-yes',
    artist: 'Lukas Graham',
    title: 'Say Yes (Church Ballad)',
    year: 2018,
    role: 'Vocal Producer',
    type: 'single',
    image: 'images/discography/lukas-graham-3-purple-album.jpg',
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
    id: 'lukas-graham-youre-not-the-only-one',
    artist: 'Lukas Graham',
    title: "You're Not the Only One (Redemption Song)",
    year: 2018,
    role: 'Vocal Producer',
    type: 'single',
    image: 'images/discography/lukas-graham-youre-not-the-only-one.jpg',
    links: {},
    stats: {
      spotifyStreams: 27.7,
      youtubeViews: 6100,
      airplaySpins: 66,
      tikTokViews: 52.1,
      shazamCount: 32.7,
      chartmetricScore: 45.9,
    },
    milestones: [],
  },
]

// =============================================================================
// AGGREGATED STATS — sum of all tracks above
// Update these whenever you add new tracks
// =============================================================================

export const streamingStats = {
  totalSpotifyStreams: 442.2,    // millions
  totalYoutubeViews: 51130.1,    // thousands = ~51.1M
  totalAirplaySpins: 37784,
  totalTikTokViews: 286288.7,    // thousands = ~286M
  tracksWithData: 14,
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
