import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { EventDetailContent } from "@/components/event-detail-content"
import { Footer } from "@/components/footer"
import { eventsData } from "@/lib/events-data"

interface EventDetailPageProps {
  params: {
    id: string
  }
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const event = eventsData.find((e) => e.id === params.id)

  if (!event) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <EventDetailContent event={event} />
      <Footer />
    </main>
  )
}

export function generateStaticParams() {
  return eventsData.map((event) => ({
    id: event.id,
  }))
}

export function generateMetadata({ params }: EventDetailPageProps) {
  const event = eventsData.find((e) => e.id === params.id)

  if (!event) {
    return {
      title: "Event Not Found - EventSphere",
    }
  }

  return {
    title: `${event.name} - EventSphere`,
    description: event.description,
  }
}
