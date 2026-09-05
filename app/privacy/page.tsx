import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lock, Eye, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read about how EventSphere collects, protects, and manages your personal information.",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              <Shield className="h-4 w-4" />
              <span>Your Privacy Matters</span>
            </div>
            <h1 className="font-serif font-bold text-4xl sm:text-5xl text-primary mb-4 text-balance">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-sm">
              Last updated: September 2025 • Effective date: September 1, 2025
            </p>
          </div>

          <Card className="glass-card mb-8">
            <CardContent className="p-8 sm:p-12 space-y-8 text-foreground/90">
              <section className="space-y-3">
                <h2 className="font-serif font-bold text-2xl text-primary flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-secondary" />
                  1. Information We Collect
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  When you visit EventSphere, register for an event, or contact our team, we may collect information including your name, email address, contact preferences, and event attendance history. We do not sell your personal details to third parties.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-serif font-bold text-2xl text-primary flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-secondary" />
                  2. How We Use Your Information
                </h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
                  <li>To process and confirm your event RSVPs and ticket reservations.</li>
                  <li>To provide event notifications, schedule changes, and venue updates.</li>
                  <li>To respond to your inquiries submitted through our contact forms.</li>
                  <li>To maintain the security and operational integrity of our platform.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="font-serif font-bold text-2xl text-primary flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-secondary" />
                  3. Cookies and Analytics
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and basic analytics to understand website performance and improve user experience. You can adjust cookie preferences through your web browser settings at any time.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-serif font-bold text-2xl text-primary">
                  4. Data Security & Retention
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement industry-standard encryption protocols and safeguards to protect your personal data from unauthorized access, alteration, or disclosure. Data is retained only as long as necessary to provide our services.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-serif font-bold text-2xl text-primary">
                  5. Contact Our Privacy Team
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions or requests regarding your personal information, please reach out to us at{" "}
                  <a href="mailto:privacy@eventsphere.com" className="text-primary font-semibold hover:underline">
                    privacy@eventsphere.com
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
