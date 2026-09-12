"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Tag, X } from "lucide-react"

interface EventsSearchProps {
  searchQuery: string
  onSearch: (query: string) => void
  onCategoryFilter: (category: string | null) => void
  selectedCategory: string | null
  categories: string[]
}

export function EventsSearch({
  searchQuery,
  onSearch,
  onCategoryFilter,
  selectedCategory,
  categories,
}: EventsSearchProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery)

  useEffect(() => {
    setLocalQuery(searchQuery)
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(localQuery)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setLocalQuery(val)
    onSearch(val)
  }

  const handleCategoryClick = (category: string | null) => {
    if (selectedCategory === category) {
      onCategoryFilter(null)
    } else {
      onCategoryFilter(category)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Search Input Bar */}
      <form onSubmit={handleSearch} className="glass-card p-2 sm:p-3.5 rounded-2xl shadow-md border border-border/50">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative min-w-0">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            <Input
              placeholder="Search by event name, venue, city, or keyword..."
              value={localQuery}
              onChange={handleInputChange}
              className="pl-10 sm:pl-11 pr-10 h-11 sm:h-12 text-sm sm:text-base rounded-xl border-border/70 focus-visible:ring-primary shadow-none"
            />
            {localQuery && (
              <button
                type="button"
                onClick={() => {
                  setLocalQuery("")
                  onSearch("")
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted"
                aria-label="Clear search input"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button type="submit" size="lg" className="px-6 h-11 sm:h-12 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover-lift w-full sm:w-auto text-sm sm:text-base">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </form>

      {/* Category Filter Pills */}
      <div className="glass-card p-3.5 sm:p-5 rounded-2xl shadow-md border border-border/50">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground flex items-center text-xs sm:text-sm">
            <Tag className="h-3.5 w-3.5 mr-1.5 text-primary" />
            Categories
          </h3>
          {selectedCategory && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCategoryFilter(null)}
              className="text-xs text-primary font-medium hover:bg-primary/10 h-6 px-2 rounded-full"
            >
              Clear Filter
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <Badge
            variant={selectedCategory === null ? "default" : "outline"}
            className={`cursor-pointer transition-all px-3 py-1.5 text-xs rounded-full font-medium hover-lift ${
              selectedCategory === null
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-background/80 hover:bg-primary/10 hover:text-primary border-border text-foreground"
            }`}
            onClick={() => handleCategoryClick(null)}
          >
            All Categories
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`cursor-pointer transition-all px-3 py-1.5 text-xs rounded-full font-medium hover-lift ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-background/80 hover:bg-primary/10 hover:text-primary border-border text-foreground"
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
              {selectedCategory === category && <X className="h-3 w-3 ml-1" />}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}


