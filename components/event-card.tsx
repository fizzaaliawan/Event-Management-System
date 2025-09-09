import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, DollarSign } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Event } from "@/lib/events-data"

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="glass-card rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group hover-lift">
      {/* Event Image */}
      <div className="relative h-44 sm:h-48 overflow-hidden">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
          <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs sm:text-sm">
            {event.category}
          </Badge>
        </div>
        {event.price && (
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
            <Badge variant="outline" className="glass bg-background/80 text-foreground text-xs sm:text-sm">
              <DollarSign className="h-3 w-3 mr-1" />
              {event.price}
            </Badge>
          </div>
        )}
      </div>

      {/* Event Content */}
      <div className="p-4 sm:p-6">
        <h3 className="font-serif font-bold text-lg sm:text-xl text-card-foreground mb-2 text-balance line-clamp-2">
          {event.name}
        </h3>

        <p className="text-muted-foreground mb-4 text-pretty line-clamp-2 text-sm sm:text-base leading-relaxed">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-primary flex-shrink-0" />
            <span className="line-clamp-1">{event.date}</span>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-primary flex-shrink-0" />
            <span className="line-clamp-1">{event.time}</span>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-primary flex-shrink-0" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
        </div>

        {/* Learn More Button */}
        <Button asChild className="w-full neomorphic hover-lift" size="sm">
          <Link href={`/events/${event.id}`}>Learn More</Link>
        </Button>
      </div>
    </div>
  )
}
