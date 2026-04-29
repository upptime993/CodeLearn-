import { Navbar } from '@/components/navbar'
import { HeroSection } from '@/components/hero-section'
import { FeatureStrip } from '@/components/feature-strip'
import { CourseCatalog } from '@/components/course-catalog'
import { PlaygroundSection } from '@/components/playground-section'
import { RoadmapSection } from '@/components/roadmap-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { StatsSection } from '@/components/stats-section'
import { PricingSection } from '@/components/pricing-section'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeatureStrip />
      <CourseCatalog />
      <PlaygroundSection />
      <RoadmapSection />
      <TestimonialsSection />
      <StatsSection />
      <PricingSection />
      <Footer />
    </main>
  )
}
