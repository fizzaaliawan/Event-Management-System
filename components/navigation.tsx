"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Ticket } from "lucide-react"
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

  return (
    <nav className="glass-card fixed top-0 left-0 right-0 z-50 mx-2 sm:mx-4 mt-2 sm:mt-4 rounded-xl shadow-md backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-3.5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 hover-lift">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-serif font-bold text-sm">E</span>
            </div>
            <span className="font-serif font-bold text-lg sm:text-xl text-primary">EventSphere</span>
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
            size="sm"
            className="md:hidden hover-lift"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5 text-primary" />}
          </Button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-border/60 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-2 pb-2">
              <Link
                href="/"
                className="text-foreground hover:text-primary font-semibold text-sm py-2 px-1"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/events"
                className="text-foreground hover:text-primary font-semibold text-sm py-2 px-1"
                onClick={() => setIsOpen(false)}
              >
                Upcoming Events
              </Link>
              <Link
                href="/about"
                className="text-foreground hover:text-primary font-semibold text-sm py-2 px-1"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-foreground hover:text-primary font-semibold text-sm py-2 px-1"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/my-tickets"
                className="inline-flex items-center justify-between bg-primary text-primary-foreground font-semibold text-sm py-2.5 px-3 rounded-xl shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <Ticket className="h-4 w-4" />
                  <span>My Tickets</span>
                </div>
                {ticketCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-white text-primary text-xs font-bold">
                    {ticketCount} Active
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

