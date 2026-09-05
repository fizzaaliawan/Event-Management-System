import type { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Sparkles,
  Users,
  Compass,
  Award,
  CalendarCheck,
  ShieldCheck,
  Zap,
} from "lucide-react"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn more about EventSphere, our mission to connect communities through unforgettable events, and how we empower organizers.",
}

const stats = [
  { label: "Events Hosted", value: "2,500+" },
  { label: "Active Attendees", value: "150K+" },
  { label: "Partner Venues", value: "400+" },
  { label: "Satisfaction Rate", value: "99.4%" },
]

const values = [
  {
    icon: Compass,
    title: "Curated Discovery",
    description:
      "We handpick and categorize premier technology, cultural, arts, and business events so you never miss what matters.",
  },
  {
    icon: Zap,
    title: "Instant Seamless RSVP",
    description:
      "Experience frictionless registrations with verified seat reservations, calendar integrations, and instant ticket confirmations.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Bridging the gap between passionate organizers and enthusiastic attendees to foster meaningful in-person connections.",
  },
  {
    icon: ShieldCheck,
    title: "Verified & Safe",
    description:
      "Every organizer and venue is thoroughly vetted to ensure authentic experiences and transparent event scheduling.",
  },
]

const faqs = [
  {
    question: "How do I register for an event on EventSphere?",
    answer:
      "Simply navigate to any event from our Upcoming Events list, click 'Learn More', and press 'Register / RSVP'. You'll receive instant confirmation and event details.",
  },
  {
    question: "Is EventSphere free to use for attendees?",
    answer:
      "Yes! Browsing and discovering events on EventSphere is completely free. For paid events, ticket pricing is clearly shown on each event card without hidden fees.",
  },
  {
    question: "How can I feature my event on EventSphere?",
    answer:
      "If you are an organizer or venue manager, reach out through our Contact page or email organizers@eventsphere.com to list and promote your gathering.",
  },
  {
    question: "Can I cancel or modify my event RSVP?",
    answer:
      "Yes. You can contact support or the event organizer directly using the details provided on the event details page.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Discovering the Future of Live Experiences</span>
          </div>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-primary mb-6 text-balance leading-tight">
            Connecting People Through Unforgettable Events
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            EventSphere was built to revolutionize how people find, experience, and engage with live summits, tech festivals, concerts, and cultural gatherings.
          </p>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="glass-card p-6 sm:p-8 rounded-xl text-center hover-lift"
              >
                <div className="font-serif font-bold text-3xl sm:text-4xl text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Mission & Values */}
      <section className="py-16 px-6 bg-muted/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-foreground mb-4">
              Why Choose EventSphere?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-pretty">
              We focus on delivering the highest quality event discovery and attendance experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon
              return (
                <Card key={idx} className="glass-card border-none hover-lift">
                  <CardContent className="p-8 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-serif font-bold text-xl text-foreground">
                      {val.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-pretty">
                      {val.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about EventSphere and attending events.
            </p>
          </div>

          <div className="glass-card p-6 sm:p-8 rounded-xl">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="font-serif text-left text-base sm:text-lg text-foreground font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center p-10 sm:p-14 rounded-3xl bg-primary text-primary-foreground shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-secondary/30 pointer-events-none" />
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-inner">
              <CalendarCheck className="h-8 w-8 text-white" />
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl mb-4 text-white text-balance drop-shadow-sm">
              Ready to explore what&apos;s happening?
            </h2>
            <p className="text-white/90 max-w-xl mx-auto mb-8 text-pretty text-base sm:text-lg leading-relaxed">
              Browse our curated lineup of upcoming conferences, live concerts, workshops, and gatherings today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-bold text-base px-8 py-6 rounded-xl shadow-lg hover-lift"
              >
                <Link href="/events">Explore Events</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-bold text-base px-8 py-6 rounded-xl hover-lift transition-all"
              >
                <Link href="/contact">Contact Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
