import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { FileCheck, BookOpen, AlertCircle, Scale } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Review the terms and conditions governing your use of EventSphere and event registrations.",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              <Scale className="h-4 w-4" />
              <span>Platform Guidelines</span>
            </div>
            <h1 className="font-serif font-bold text-4xl sm:text-5xl text-primary mb-4 text-balance">
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-sm">
              Last updated: September 2025 • Version 1.2
            </p>
          </div>

          <Card className="glass-card mb-8">
            <CardContent className="p-8 sm:p-12 space-y-8 text-foreground/90">
              <section className="space-y-3">
                <h2 className="font-serif font-bold text-2xl text-primary flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-secondary" />
                  1. Acceptance of Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using EventSphere, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform or register for events listed on EventSphere.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-serif font-bold text-2xl text-primary flex items-center">
                  <FileCheck className="h-5 w-5 mr-2 text-secondary" />
                  2. Event Registrations and RSVPs
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  When you register or RSVP for an event on EventSphere, you agree to provide accurate and complete information. Event dates, times, and venues are subject to the discretion and announcements of the respective event organizers.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-serif font-bold text-2xl text-primary flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-secondary" />
                  3. Organizer and Attendee Code of Conduct
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  All users and event hosts must adhere to standard community guidelines. Harassment, deceptive listings, abusive conduct, or fraudulent registrations will result in immediate termination of account access and removal from the platform.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-serif font-bold text-2xl text-primary">
                  4. Limitation of Liability
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  EventSphere provides discovery and scheduling tools. We are not directly liable for cancellations, venue disputes, or alterations made by third-party event organizers. Attendees are encouraged to verify details with hosts.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-serif font-bold text-2xl text-primary">
                  5. Contact Information
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  For inquiries regarding legal terms or platform policies, contact us at{" "}
                  <a href="mailto:legal@eventsphere.com" className="text-primary font-semibold hover:underline">
                    legal@eventsphere.com
                  </a>
                  .
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}
