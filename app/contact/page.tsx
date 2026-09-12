import { Navigation } from "@/components/navigation"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Contact Us - EventSphere",
  description:
    "Get in touch with EventSphere. We'd love to hear from you about events, partnerships, or any questions you may have.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Contact Hero Section */}
      <section className="pt-28 sm:pt-36 pb-10 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif font-bold text-3xl sm:text-5xl md:text-6xl text-primary mb-4 sm:mb-6 text-balance leading-tight">
            Get in Touch
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Have questions about an event? Want to partner with us? We'd love to hear from you. Send us a message and
            we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8">
              <div className="glass-card p-5 sm:p-8 rounded-2xl border border-border/50 shadow-md">
                <h2 className="font-serif font-bold text-xl sm:text-2xl text-foreground mb-4 sm:mb-6">Contact Information</h2>
                <div className="space-y-4 text-sm sm:text-base">
                  <div>
                    <h3 className="font-semibold text-foreground mb-0.5">Email</h3>
                    <p className="text-muted-foreground">hello@eventsphere.com</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-0.5">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-0.5">Office Hours</h3>
                    <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-5 sm:p-8 rounded-2xl border border-border/50 shadow-md">
                <h2 className="font-serif font-bold text-xl sm:text-2xl text-foreground mb-3 sm:mb-4">Event Organizers</h2>
                <p className="text-muted-foreground mb-3 text-pretty text-xs sm:text-sm leading-relaxed">
                  Are you organizing an event and want to feature it on EventSphere? We'd love to help you reach more
                  attendees.
                </p>
                <p className="text-muted-foreground text-pretty text-xs sm:text-sm">
                  Contact us at <span className="text-primary font-bold">organizers@eventsphere.com</span>{" "}
                  or use the form to get started.
                </p>
              </div>

              <div className="glass-card p-5 sm:p-8 rounded-2xl border border-border/50 shadow-md">
                <h2 className="font-serif font-bold text-xl sm:text-2xl text-foreground mb-3 sm:mb-4">Partnerships</h2>
                <p className="text-muted-foreground text-pretty text-xs sm:text-sm leading-relaxed">
                  Interested in partnering with EventSphere? We're always looking for collaborations that can enhance
                  the event discovery experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
