import { HeroSectionDemo } from "@/components/sections/landing/demo"
import { FeaturesSection } from "@/components/sections/landing/blocks/features-section"
import { TestimonialsSection } from "@/components/sections/landing/blocks/testimonials-section"
import Navbar from "@/components/sections/navbar/default"
import PricingSection from "@/components/sections/pricing"

export default function Home() {
  return (
    <div className="max-w-screen overflow-x-hidden min-h-screen flex flex-col items-center bg-zinc-950">
      <Navbar />
      <HeroSectionDemo />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
    </div>
  )
}
