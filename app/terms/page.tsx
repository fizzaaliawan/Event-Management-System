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

      <section className="pt-28 sm:pt-36 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              <Scale className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Platform Guidelines</span>
            </div>
            <h1 className="font-serif font-bold text-3xl sm:text-5xl text-primary mb-3 sm:mb-4 text-balance leading-tight">
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Last updated: September 2025 • Version 1.2
            </p>
          </div>

          <Card className="glass-card mb-8 rounded-2xl border border-border/50 shadow-md">
            <CardContent className="p-5 sm:p-10 space-y-6 sm:space-y-8 text-foreground/90">
              <section className="space-y-2.5 sm:space-y-3">
                <h2 className="font-serif font-bold text-xl sm:text-2xl text-primary flex items-center">
                  <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-secondary flex-shrink-0" />
                  1. Acceptance of Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                  By accessing or using EventSphere, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform or register for events listed on EventSphere.
                </p>
              </section>

              <section className="space-y-2.5 sm:space-y-3">
                <h2 className="font-serif font-bold text-xl sm:text-2xl text-primary flex items-center">
                  <FileCheck className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-secondary flex-shrink-0" />
                  2. Event Registrations and RSVPs
                </h2>
                <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                  When you register or RSVP for an event on EventSphere, you agree to provide accurate and complete information. Event dates, times, and venues are subject to the discretion and announcements of the respective event organizers.
                </p>
              </section>

              <section className="space-y-2.5 sm:space-y-3">
                <h2 className="font-serif font-bold text-xl sm:text-2xl text-primary flex items-center">
                  <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-secondary flex-shrink-0" />
                  3. Organizer and Attendee Code of Conduct
                </h2>
                <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                  All users and event hosts must adhere to standard community guidelines. Harassment, deceptive listings, abusive conduct, or fraudulent registrations will result in immediate termination of account access and removal from the platform.
                </p>
              </section>

              <section className="space-y-2.5 sm:space-y-3">
                <h2 className="font-serif font-bold text-xl sm:text-2xl text-primary">
                  4. Limitation of Liability
                </h2>
                <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                  EventSphere provides discovery and scheduling tools. We are not directly liable for cancellations, venue disputes, or alterations made by third-party event organizers. Attendees are encouraged to verify details with hosts.
                </p>
              </section>

              <section className="space-y-2.5 sm:space-y-3">
                <h2 className="font-serif font-bold text-xl sm:text-2xl text-primary">
                  5. Contact Information
                </h2>
                <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
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
