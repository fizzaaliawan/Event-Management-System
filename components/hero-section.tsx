import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/placeholder.svg?height=1080&width=1920&text=EventSphere+Hero+Background')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="font-serif font-bold text-4xl sm:text-5xl md:text-7xl text-primary mb-4 sm:mb-6 text-balance leading-tight">
          Discover Upcoming Events
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
          Explore amazing events happening around you. From tech conferences to music festivals, find your next
          unforgettable experience.
        </p>

        {/* Search Bar */}
        <div className="glass-card max-w-2xl mx-auto p-4 rounded-full mb-6 sm:mb-8">
  <div className="flex items-center space-x-4">
    <Input
      placeholder="Search events..."
      className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-lg sm:text-xl h-14 px-6"
    />
    <Button size="lg" className="rounded-full px-6 sm:px-8 hover-lift h-14">
      <Search className="h-6 w-6" />
    </Button>
  </div>
</div>


        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-sm sm:max-w-none mx-auto">
          <Button asChild size="lg" className="neomorphic hover-lift w-full sm:w-auto">
            <Link href="/events">Browse All Events</Link>
          </Button>
          <Button asChild size="lg" className="neomorphic hover-lift w-full sm:w-auto">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
