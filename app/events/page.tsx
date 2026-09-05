"use client"

import { useState, useMemo, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { EventCard } from "@/components/event-card"
import { EventsSearch } from "@/components/events-search"
import { Footer } from "@/components/footer"
import { eventsData } from "@/lib/events-data"

function EventsListContent() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get("search") || ""
  const initialCategory = searchParams.get("category") || null

  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory)

  useEffect(() => {
    const searchFromUrl = searchParams.get("search")
    const catFromUrl = searchParams.get("category")
    if (searchFromUrl !== null) {
      setSearchQuery(searchFromUrl)
    }
    if (catFromUrl !== null) {
      setSelectedCategory(catFromUrl)
    }
  }, [searchParams])

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(eventsData.map((event) => event.category)))
  }, [])

  // Filter events based on search and category
  const filteredEvents = useMemo(() => {
    return eventsData.filter((event) => {
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        q === "" ||
        event.name.toLowerCase().includes(q) ||
        event.venue.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q) ||
        event.organizer.toLowerCase().includes(q) ||
        event.category.toLowerCase().includes(q)

      const matchesCategory = selectedCategory === null || event.category.toLowerCase() === selectedCategory.toLowerCase()

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <>
      {/* Page Header */}
      <section className="pt-28 sm:pt-32 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-serif font-bold text-4xl md:text-6xl text-primary mb-4 text-balance">
              Upcoming Events
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Discover amazing events happening around you. From conferences to concerts, find your next unforgettable experience.
            </p>
          </div>

          {/* Search and Filters */}
          <EventsSearch
            searchQuery={searchQuery}
            onSearch={setSearchQuery}
            onCategoryFilter={setSelectedCategory}
            selectedCategory={selectedCategory}
            categories={categories}
          />
        </div>
      </section>

      {/* Events Grid */}
      <section className="pb-20 px-6">
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
              <div className="glass-card max-w-md mx-auto p-8 rounded-2xl shadow-lg">
                <h3 className="font-serif font-bold text-xl text-foreground mb-2">No Events Found</h3>
                <p className="text-muted-foreground mb-6 text-pretty">
                  We couldn't find any events matching your criteria. Try adjusting your keywords or reset filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory(null)
                  }}
                  className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover-lift shadow"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Suspense fallback={<div className="min-h-screen pt-32 text-center text-muted-foreground">Loading events...</div>}>
        <EventsListContent />
      </Suspense>
      <Footer />
    </main>
  )
}

