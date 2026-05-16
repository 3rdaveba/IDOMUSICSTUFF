import { Routes, Route } from 'react-router'
import { useLenis } from '@/hooks/useLenis'
import ParticleCanvas from '@/components/ParticleCanvas'
import CustomCursor from '@/components/CustomCursor'
import HomePage from '@/pages/HomePage'
import ProjectDetail from '@/pages/ProjectDetail'
import FilmDetail from '@/pages/FilmDetail'
import ArtistWorkPage from '@/pages/ArtistWorkPage'

export default function App() {
  useLenis()

  return (
    <>
      <ParticleCanvas />
      <CustomCursor />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/film/:id" element={<FilmDetail />} />
        <Route path="/artist-work" element={<ArtistWorkPage />} />
      </Routes>
    </>
  )
}
