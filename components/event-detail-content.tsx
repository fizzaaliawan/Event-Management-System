import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Clock, DollarSign, User, ArrowLeft, ExternalLink, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Event } from "@/lib/events-data"

interface EventDetailContentProps {
  event: Event
}

export function EventDetailContent({ event }: EventDetailContentProps) {
  return (
    <div className="pt-20">
      {/* Hero Banner */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <Image src={event.image || "/placeholder.svg"} alt={event.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <Button asChild variant="outline" size="sm" className="glass-card bg-transparent">
            <Link href="/events">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Link>
          </Button>
        </div>

        {/* Event Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl">
            <Badge variant="secondary" className="bg-primary text-primary-foreground mb-4">
              {event.category}
            </Badge>
            <h1 className="font-serif font-bold text-4xl md:text-6xl text-black mb-4 text-balance drop-shadow-lg">
              {event.name}
            </h1>
            <p className="text-xl text-black/90 max-w-2xl text-pretty drop-shadow">{event.description}</p>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Event Information */}
              <Card className="glass-card">
                <CardContent className="p-8">
                  <h2 className="font-serif font-bold text-2xl text-foreground mb-6">About This Event</h2>
                  <p className="text-muted-foreground leading-relaxed text-pretty">{event.fullDescription}</p>
                </CardContent>
              </Card>

              {/* Location Map */}
              <Card className="glass-card">
                <CardContent className="p-8">
                  <h2 className="font-serif font-bold text-2xl text-foreground mb-6">Event Location</h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">{event.venue}</p>
                        <Button variant="link" className="p-0 h-auto text-primary hover:text-primary/80" asChild>
                          <a
                            href={`https://maps.google.com/?q=${encodeURIComponent(event.venue)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View on Google Maps
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </Button>
                      </div>
                    </div>

                    {/* Embedded Map */}
                    <div className="rounded-lg overflow-hidden border border-border">
                      <iframe
                        src={event.mapEmbedUrl}
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Map showing location of ${event.venue}`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Event Details Card */}
              <Card className="glass-card sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-serif font-bold text-xl text-foreground mb-6">Event Details</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">Date</p>
                        <p className="text-muted-foreground">{event.date}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">Time</p>
                        <p className="text-muted-foreground">{event.time}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">Venue</p>
                        <p className="text-muted-foreground text-pretty">{event.venue}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <User className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">Organizer</p>
                        <p className="text-muted-foreground">{event.organizer}</p>
                      </div>
                    </div>

                    {event.price && (
                      <div className="flex items-start space-x-3">
                        <DollarSign className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-foreground">Price</p>
                          <p className="text-muted-foreground font-semibold text-lg">{event.price}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button className="w-full neomorphic" size="lg">
                      Register / RSVP
                    </Button>
                    <Button variant="outline" className="w-full glass-card bg-transparent" size="lg">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Event
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Related Events */}
              <Card className="glass-card">
                <CardContent className="p-6">
                  <h3 className="font-serif font-bold text-xl text-foreground mb-4">More Events</h3>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/events">Browse All Events</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
