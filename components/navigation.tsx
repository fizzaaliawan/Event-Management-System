"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Ticket, Home, Calendar, Info, MessageSquare } from "lucide-react"
import { getPurchasedTickets } from "@/lib/tickets-store"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [ticketCount, setTicketCount] = useState(0)
  const pathname = usePathname()

  const updateTicketCount = () => {
    const active = getPurchasedTickets().filter((t) => t.status === "Confirmed").length
    setTicketCount(active)
  }

  useEffect(() => {
    updateTicketCount()
    const handleUpdate = () => updateTicketCount()
    window.addEventListener("tickets_updated", handleUpdate)
    return () => window.removeEventListener("tickets_updated", handleUpdate)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <nav className="glass-card fixed top-0 left-0 right-0 z-50 mx-2 sm:mx-4 mt-2 sm:mt-4 rounded-2xl shadow-md backdrop-blur-xl bg-background/90 border border-border/50">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 py-2.5 sm:py-3.5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-2.5 hover-lift">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-serif font-bold text-sm">E</span>
            </div>
            <span className="font-serif font-bold text-lg sm:text-xl text-primary tracking-tight">EventSphere</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              href="/"
              className={`transition-colors font-semibold text-sm ${
                pathname === "/" ? "text-primary font-bold" : "text-foreground/80 hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link
              href="/events"
              className={`transition-colors font-semibold text-sm ${
                pathname.startsWith("/events") ? "text-primary font-bold" : "text-foreground/80 hover:text-primary"
              }`}
            >
              Upcoming Events
            </Link>
            <Link
              href="/about"
              className={`transition-colors font-semibold text-sm ${
                pathname === "/about" ? "text-primary font-bold" : "text-foreground/80 hover:text-primary"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`transition-colors font-semibold text-sm ${
                pathname === "/contact" ? "text-primary font-bold" : "text-foreground/80 hover:text-primary"
              }`}
            >
              Contact
            </Link>
            <Link
              href="/my-tickets"
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs ${
                pathname === "/my-tickets"
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              <Ticket className="h-3.5 w-3.5" />
              <span>My Tickets</span>
              {ticketCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-accent text-accent-foreground text-[10px] font-extrabold">
                  {ticketCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-10 w-10 rounded-xl hover:bg-primary/10 text-primary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-border/60 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1.5 pb-2">
              <Link
                href="/"
                className={`flex items-center gap-3 font-semibold text-sm py-2.5 px-3 rounded-xl transition-all ${
                  pathname === "/"
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-foreground hover:bg-muted hover:text-primary"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link
                href="/events"
                className={`flex items-center gap-3 font-semibold text-sm py-2.5 px-3 rounded-xl transition-all ${
                  pathname.startsWith("/events")
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-foreground hover:bg-muted hover:text-primary"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Calendar className="h-4 w-4" />
                <span>Upcoming Events</span>
              </Link>
              <Link
                href="/about"
                className={`flex items-center gap-3 font-semibold text-sm py-2.5 px-3 rounded-xl transition-all ${
                  pathname === "/about"
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-foreground hover:bg-muted hover:text-primary"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Info className="h-4 w-4" />
                <span>About Us</span>
              </Link>
              <Link
                href="/contact"
                className={`flex items-center gap-3 font-semibold text-sm py-2.5 px-3 rounded-xl transition-all ${
                  pathname === "/contact"
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-foreground hover:bg-muted hover:text-primary"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Contact</span>
              </Link>
              <div className="pt-1.5">
                <Link
                  href="/my-tickets"
                  className={`flex items-center justify-between font-semibold text-sm py-2.5 px-3.5 rounded-xl shadow-sm transition-all ${
                    pathname === "/my-tickets"
                      ? "bg-primary text-primary-foreground font-bold"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <Ticket className="h-4 w-4" />
                    <span>My Registered Tickets</span>
                  </div>
                  {ticketCount > 0 ? (
                    <span className="px-2 py-0.5 rounded-full bg-white text-primary text-xs font-extrabold shadow-xs">
                      {ticketCount} Active
                    </span>
                  ) : (
                    <span className="text-[11px] opacity-80">View</span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

