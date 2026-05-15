import Navigation from '@/components/Navigation'
import HeroSection from '@/sections/HeroSection'
import AboutSection from '@/sections/AboutSection'
import StatsSection from '@/sections/StatsSection'
import WorkSection from '@/sections/WorkSection'
import TVFilmSection from '@/sections/TVFilmSection'
import DiscographySection from '@/sections/DiscographySection'
import ContactSection from '@/sections/ContactSection'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <WorkSection />
        <TVFilmSection />
        <DiscographySection />
        <ContactSection />
      </main>
      <Footer showCTA={false} />
    </>
  )
}
