"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Sparkles } from "lucide-react"
import Link from "next/link"

const POPULAR_CATEGORIES = [
  "Technology",
  "Music",
  "Business",
  "Arts & Culture",
  "Food & Drink",
]

export function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/events?search=${encodeURIComponent(searchTerm.trim())}`)
    } else {
      router.push("/events")
    }
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background Graphic & Mesh Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-primary/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-6 animate-in fade-in zoom-in duration-500">
          <Sparkles className="h-4 w-4" />
          <span>Curated Live Experiences & Gatherings</span>
        </div>

        <h1 className="font-serif font-bold text-4xl sm:text-5xl md:text-7xl text-primary mb-4 sm:mb-6 text-balance leading-tight tracking-tight">
          Discover Upcoming Events
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
          Explore premier conferences, festivals, and summits happening around you. Find your next unforgettable experience.
        </p>

        {/* Interactive Search Bar Form */}
        <form
          onSubmit={handleSearch}
          className="glass-card max-w-2xl mx-auto p-2 sm:p-3 rounded-full mb-6 shadow-xl"
        >
          <div className="flex items-center">
            <div className="pl-4 text-muted-foreground">
              <Search className="h-5 w-5 text-primary" />
            </div>
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search events by title, venue, or keyword..."
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base sm:text-lg h-12 sm:h-14 px-4 shadow-none"
            />
            <Button
              type="submit"
              size="lg"
              className="rounded-full px-6 sm:px-8 hover-lift h-12 sm:h-14 font-medium"
            >
              Search
            </Button>
          </div>
        </form>

        {/* Quick Category Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 text-xs sm:text-sm">
          <span className="text-muted-foreground mr-1 font-medium">Popular:</span>
          {POPULAR_CATEGORIES.map((category) => (
            <Link
              key={category}
              href={`/events?category=${encodeURIComponent(category)}`}
              className="px-3 py-1 rounded-full bg-background/80 border border-border/60 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all text-xs font-medium hover-lift"
            >
              {category}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-sm sm:max-w-none mx-auto">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 py-6 rounded-2xl shadow-md hover-lift w-full sm:w-auto text-base">
            <Link href="/events">Browse All Events</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-primary bg-background/80 text-primary hover:bg-primary hover:text-primary-foreground font-bold px-8 py-6 rounded-2xl shadow-sm hover-lift w-full sm:w-auto text-base transition-all"
          >
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

