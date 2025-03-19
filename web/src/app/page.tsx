import { HeroSectionDemo } from "@/components/sections/landing/demo"
import { FeaturesSection } from "@/components/sections/landing/blocks/features-section"
import { TestimonialsSection } from "@/components/sections/landing/blocks/testimonials-section"
import Navbar from "@/components/sections/navbar/default"
import PricingSection from "@/components/sections/pricing"
import { Suspense } from "react"

const LoadingSpinner = () => (
  <div className="w-full h-96 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
  </div>
)

export default function Home() {
  return (
    <div className="max-w-screen overflow-x-hidden min-h-screen flex flex-col items-center bg-zinc-950">
      <Navbar />
      <HeroSectionDemo />
      <Suspense fallback={<LoadingSpinner />}>
        <FeaturesSection />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <TestimonialsSection />
      </Suspense>
      <PricingSection />
    </div>
  )
}
