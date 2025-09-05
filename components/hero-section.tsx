import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "@/components/icons"
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
        <div className="glass-card max-w-md mx-auto p-2 rounded-full mb-6 sm:mb-8">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search events..."
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base"
            />
            <Button size="sm" className="rounded-full px-3 sm:px-4 hover-lift">
              <SearchIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-sm sm:max-w-none mx-auto">
          <Button asChild size="lg" className="neomorphic hover-lift w-full sm:w-auto">
            <Link href="/events">Browse All Events</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="glass-card hover-lift w-full sm:w-auto bg-transparent">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
