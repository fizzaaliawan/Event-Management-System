"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"

interface EventsSearchProps {
  onSearch: (query: string) => void
  onCategoryFilter: (category: string | null) => void
  selectedCategory: string | null
  categories: string[]
}

export function EventsSearch({ onSearch, onCategoryFilter, selectedCategory, categories }: EventsSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      onCategoryFilter(null)
    } else {
      onCategoryFilter(category)
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="glass-card p-4 rounded-lg">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events by name, venue, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" size="sm" className="px-6">
            <Filter className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </form>

      {/* Category Filters */}
      <div className="glass-card p-4 rounded-lg">
        <h3 className="font-semibold text-foreground mb-3 flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filter by Category
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`cursor-pointer transition-all hover:scale-105 ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary hover:text-secondary-foreground"
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
              {selectedCategory === category && <X className="h-3 w-3 ml-1" />}
            </Badge>
          ))}
        </div>
        {selectedCategory && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCategoryFilter(null)}
            className="mt-2 text-muted-foreground hover:text-foreground"
          >
            Clear filters
          </Button>
        )}
      </div>
    </div>
  )
}
