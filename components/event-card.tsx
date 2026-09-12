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
    <div className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group hover-lift border border-border/50 flex flex-col justify-between h-full">
      <div>
        {/* Event Image */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
            <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs px-3 py-1 font-semibold rounded-full shadow-sm">
              {event.category}
            </Badge>
          </div>
          {event.price && (
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
              <Badge variant="outline" className="glass bg-background/90 text-foreground font-semibold text-xs px-2.5 py-1 rounded-full shadow-xs">
                <DollarSign className="h-3 w-3 mr-0.5" />
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

          <p className="text-muted-foreground mb-4 text-pretty line-clamp-2 text-xs sm:text-sm leading-relaxed">
            {event.description}
          </p>

          {/* Event Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 text-primary flex-shrink-0" />
              <span className="line-clamp-1">{event.date}</span>
            </div>
            <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 text-primary flex-shrink-0" />
              <span className="line-clamp-1">{event.time}</span>
            </div>
            <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 text-primary flex-shrink-0" />
              <span className="line-clamp-1">{event.venue}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Learn More Button */}
      <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0">
        <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-2.5 sm:py-3 min-h-[44px] rounded-xl shadow-sm hover-lift text-sm">
          <Link href={`/events/${event.id}`}>Learn More & RSVP</Link>
        </Button>
      </div>
    </div>
  )
}
