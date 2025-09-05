"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { EventCard } from "@/components/event-card"
import { EventsSearch } from "@/components/events-search"
import { Footer } from "@/components/footer"
import { eventsData } from "@/lib/events-data"

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(eventsData.map((event) => event.category)))
  }, [])

  // Filter events based on search and category
  const filteredEvents = useMemo(() => {
    return eventsData.filter((event) => {
      const matchesSearch =
        searchQuery === "" ||
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === null || event.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Page Header */}
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-serif font-bold text-4xl md:text-6xl text-primary mb-4 text-balance">
              Upcoming Events
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Discover amazing events happening around you. From conferences to concerts, find your next unforgettable
              experience.
            </p>
          </div>

          {/* Search and Filters */}
          <EventsSearch
            onSearch={setSearchQuery}
            onCategoryFilter={setSelectedCategory}
            selectedCategory={selectedCategory}
            categories={categories}
          />
        </div>
      </section>

      {/* Events Grid */}
      <section className="pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredEvents.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif font-bold text-2xl text-foreground">
                  {searchQuery || selectedCategory
                    ? `Found ${filteredEvents.length} event${filteredEvents.length !== 1 ? "s" : ""}`
                    : `All Events (${filteredEvents.length})`}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="glass-card max-w-md mx-auto p-8 rounded-lg">
                <h3 className="font-serif font-bold text-xl text-foreground mb-2">No Events Found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search criteria or browse all events.</p>
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory(null)
                  }}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
