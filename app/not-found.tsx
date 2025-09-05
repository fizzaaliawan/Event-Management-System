import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass-card p-12 rounded-lg">
            <h1 className="font-serif font-bold text-6xl text-primary mb-4">404</h1>
            <h2 className="font-serif font-bold text-2xl text-foreground mb-4">Event Not Found</h2>
            <p className="text-muted-foreground mb-8 text-pretty">
              Sorry, we couldn't find the event you're looking for. It may have been moved or no longer exists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/events">Browse All Events</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/">Go Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
