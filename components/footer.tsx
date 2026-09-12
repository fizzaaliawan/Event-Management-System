import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-foreground rounded-full flex items-center justify-center shadow-xs">
                <span className="text-primary font-serif font-bold text-sm">E</span>
              </div>
              <span className="font-serif font-bold text-xl">EventSphere</span>
            </div>
            <p className="text-primary-foreground/80 text-pretty text-xs sm:text-sm leading-relaxed">
              Discover amazing events happening around you. From conferences to concerts, find your next unforgettable
              experience.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-serif font-bold text-base sm:text-lg">Quick Links</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link
                  href="/my-tickets"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  My Registered Tickets
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-serif font-bold text-base sm:text-lg">Contact Info</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="text-primary-foreground/80 truncate">hello@eventsphere.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="text-primary-foreground/80">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80 leading-snug">
                  123 Event Street, Suite 400<br />San Francisco, CA 94102
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-serif font-bold text-base sm:text-lg">Follow Us</h3>
            <div className="flex space-x-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center text-primary-foreground transition-all"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center text-primary-foreground transition-all"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center text-primary-foreground transition-all"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center text-primary-foreground transition-all"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
            <p className="text-primary-foreground/80 text-xs text-pretty leading-relaxed">
              Stay updated with curated events and upcoming gathering announcements.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 sm:mt-10 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-xs sm:text-sm">
          <p className="text-primary-foreground/80">© 2025 EventSphere. All rights reserved.</p>
          <div className="flex space-x-5">
            <Link
              href="/privacy"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
