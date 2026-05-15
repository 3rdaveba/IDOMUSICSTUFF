# Site Maintenance Guide

## Overview

This is the maintenance document for William B.A. Washington's portfolio website.
All content lives in data files under `src/data/`. No component code needs to change for content updates.

---

## Quick Update Checklist

| Task | File | Section |
|------|------|---------|
| Add a new track | `src/data/discography.ts` | `discography[]` + `streamingStats` |
| Update streaming numbers | `src/data/discography.ts` | `stats` on each entry + `streamingStats` |
| Add a country to the globe | `src/data/discography.ts` | `countryAirplay[]` |
| Add a film/TV credit | `src/data/projects.ts` (film section) | Create a new film data file |
| Update year count | `src/sections/StatsSection.tsx` | Hardcoded number |
| Update project count | `src/sections/StatsSection.tsx` | Hardcoded number |
| Update the "last updated" date | `src/data/discography.ts` | `streamingStats.lastUpdated` |

---

## Adding a New Track (Step by Step)

1. Look up the track on **Chartmetric** (chartmetric.com)
2. Open the track page, scroll to **Summary Statistics**
3. Copy the following:
   - Spotify Streams
   - YouTube Views
   - Airplay Spins
   - TikTok Views
   - Shazam Count
   - Chartmetric Score
4. Add a new entry to the `discography` array in `src/data/discography.ts`
5. Update `streamingStats` totals at the bottom of the file
6. If the track has chart milestones (e.g., "Deezer Estonia #48"), add them to `milestones[]`
7. Run `npm run build` and deploy

### Entry Template

```typescript
{
  id: 'artist-song-slug',           // unique kebab-case ID
  artist: 'Artist Name',
  title: 'Song Title',
  year: 2026,                        // release year
  role: 'Vocal Producer',            // your role
  type: 'single',                    // 'single' | 'album' | 'ep'
  image: '/images/project-lukas.jpg', // use existing image or add new one
  links: {},                         // platform links if available
  stats: {
    spotifyStreams: 0.0,             // millions
    youtubeViews: 0,                 // thousands
    airplaySpins: 0,
    tikTokViews: 0,                  // thousands
    shazamCount: 0,                  // thousands
    chartmetricScore: 0.0,
  },
  milestones: [],                    // chart positions, awards, etc.
},
```

---

## Adding a Country to the Airplay Globe

1. Find the country's **ISO 3166-1 alpha-3 code** (e.g., "USA", "DNK", "GBR")
2. Get airplay spin count from Chartmetric's **Geography** tab
3. Determine intensity: >1000 = "high", >100 = "medium", else "low"
4. Add to `countryAirplay[]` in `src/data/discography.ts`
5. Add centroid coordinates to `countryCentroids` in `src/sections/StreamingGlobe.tsx` if missing

### Country Template

```typescript
{ country: 'Country Name', countryCode: 'XXX', spins: 0, intensity: 'medium' },
```

### Centroid Template (in StreamingGlobe.tsx)

```typescript
XXX: [longitude, latitude],
```

Find coordinates: https://www.latlong.net

---

## Adding a Film/TV Credit

1. Add a new entry to the `credits` array in `src/sections/TVFilmSection.tsx`
2. Add a film still/artwork to `public/images/` (600x400px minimum)
3. Reference the image in the entry

### Entry Template

```typescript
{
  id: 'film-slug',
  title: 'Film Title',
  studio: 'Studio Name',
  year: 2026,
  role: 'Your Role',
  recognition: 'Recognition Type',
  description: 'One to two sentence description.',
  image: '/images/film-new.jpg',
},
```

---

## Data Sources

| Source | What It Provides | URL |
|--------|-----------------|-----|
| **Chartmetric** | Full streaming, airplay, social data | chartmetric.com |
| **Spotify for Artists** | Spotify-only data, geography | artists.spotify.com |
| **Apple Music for Artists** | Apple-only data | artists.apple.com |
| **YouTube Analytics** | YouTube views, geography | youtube.com/analytics |
| **Viberate** | Free tier: basic stats | viberate.com |

---

## Build & Deploy

```bash
# Install dependencies (if needed)
npm install --legacy-peer-deps

# Build
npm run build

# The dist/ folder is ready to deploy to any static host
```

### Deployment Options

**GitHub Pages**: Push `dist/` to `gh-pages` branch
**Netlify**: Drag `dist/` folder into deploy UI
**Vercel**: Connect repo, auto-deploys on push

---

## File Map

```
src/
  data/
    discography.ts          # ALL streaming data, tracks, countries
    projects.ts             # Work projects + film data
  sections/
    HeroSection.tsx         # Hero with particles
    WorkSection.tsx         # Project cards (links to detail pages)
    AboutSection.tsx        # Bio + portrait
    StatsSection.tsx        # 15+ years, 10+ countries, 50+ projects
    TVFilmSection.tsx       # Sinners, K-Pops! (add new films here)
    StreamingGlobe.tsx      # World map + platform stats
    DiscographySection.tsx  # Music list (reads from discography.ts)
    ContactSection.tsx      # Form
    CTABanner.tsx           # Final CTA
  pages/
    HomePage.tsx            # Section order
    ProjectDetail.tsx       # Individual project DMAIC pages
  components/
    ParticleCanvas.tsx      # Three.js hero effect
    Navigation.tsx          # Nav bar
    Footer.tsx              # Site footer
  App.tsx                   # Router
```

---

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS
- Three.js (hero particles)
- GSAP + ScrollTrigger (animations)
- react-simple-maps (world map)
- Lenis (smooth scroll)

---

Last updated: May 15, 2026
