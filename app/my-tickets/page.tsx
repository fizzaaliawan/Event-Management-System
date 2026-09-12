"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import {
  getPurchasedTickets,
  cancelPurchasedTicket,
  removePurchasedTicket,
  PurchasedTicket,
} from "@/lib/tickets-store"
import {
  Ticket,
  Calendar,
  Clock,
  MapPin,
  QrCode,
  Printer,
  Trash2,
  AlertTriangle,
  Mail,
  User,
  ArrowRight,
  ExternalLink,
  Sparkles,
  CreditCard,
} from "lucide-react"

export default function MyTicketsPage() {
  const { toast } = useToast()
  const [tickets, setTickets] = useState<PurchasedTicket[]>([])
  const [activeTab, setActiveTab] = useState<"all" | "active" | "cancelled">("all")
  const [selectedTicketForCancel, setSelectedTicketForCancel] = useState<PurchasedTicket | null>(null)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)

  const loadTickets = () => {
    setTickets(getPurchasedTickets())
  }

  useEffect(() => {
    loadTickets()
    const handleUpdate = () => loadTickets()
    window.addEventListener("tickets_updated", handleUpdate)
    return () => window.removeEventListener("tickets_updated", handleUpdate)
  }, [])

  const handlePrint = (ticketRef: string) => {
    toast({
      title: "Opening Print Preview",
      description: `Preparing ticket ${ticketRef} for download/printing.`,
    })
    window.print()
  }

  const confirmCancel = () => {
    if (!selectedTicketForCancel) return
    cancelPurchasedTicket(selectedTicketForCancel.id)
    setIsCancelDialogOpen(false)
    toast({
      title: "Booking Cancelled",
      description: `Reservation ${selectedTicketForCancel.bookingReference} has been cancelled.`,
    })
  }

  const handleDelete = (id: string, ref: string) => {
    removePurchasedTicket(id)
    toast({
      title: "Ticket Removed",
      description: `Ticket ${ref} removed from your dashboard.`,
    })
  }

  const filteredTickets = tickets.filter((t) => {
    if (activeTab === "active") return t.status === "Confirmed"
    if (activeTab === "cancelled") return t.status === "Cancelled"
    return true
  })

  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="pt-28 sm:pt-36 pb-16 sm:pb-20 px-3.5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2.5">
                <Ticket className="h-3.5 w-3.5" />
                <span>My Event Passes & Bookings</span>
              </div>
              <h1 className="font-serif font-bold text-2xl sm:text-4xl md:text-5xl text-primary leading-tight">
                My Registered Tickets
              </h1>
              <p className="text-muted-foreground text-xs sm:text-base mt-1.5 sm:mt-2">
                Manage your confirmed bookings, download official e-tickets, and view order receipts.
              </p>
            </div>

            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-xl shadow-sm hover-lift self-stretch sm:self-start md:self-auto text-sm">
              <Link href="/events" className="flex items-center justify-center">
                <span>Browse More Events</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Filter Tabs */}
          {tickets.length > 0 && (
            <div className="flex items-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 border-b border-border/70 pb-3 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === "all"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                All Tickets ({tickets.length})
              </button>
              <button
                onClick={() => setActiveTab("active")}
                className={`px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === "active"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Active ({tickets.filter((t) => t.status === "Confirmed").length})
              </button>
              <button
                onClick={() => setActiveTab("cancelled")}
                className={`px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === "cancelled"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                Cancelled ({tickets.filter((t) => t.status === "Cancelled").length})
              </button>
            </div>
          )}

          {/* Tickets List */}
          {filteredTickets.length > 0 ? (
            <div className="space-y-4 sm:space-y-6">
              {filteredTickets.map((ticket) => (
                <Card
                  key={ticket.id}
                  className={`glass-card overflow-hidden rounded-2xl border transition-all duration-300 shadow-md ${
                    ticket.status === "Cancelled"
                      ? "opacity-60 border-destructive/30"
                      : "border-primary/20 hover:border-primary/40 hover:shadow-xl"
                  }`}
                >
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                      {/* Left: Event Thumbnail & Header */}
                      <div className="lg:col-span-4 relative min-h-[200px] lg:min-h-[auto] overflow-hidden">
                        <Image
                          src={ticket.eventImage || "/tech-fest.jpeg"}
                          alt={ticket.eventName}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge
                            className={`font-semibold shadow ${
                              ticket.status === "Confirmed"
                                ? "bg-green-600 text-white"
                                : "bg-destructive text-white"
                            }`}
                          >
                            {ticket.status}
                          </Badge>
                          <Badge variant="outline" className="bg-black/60 text-white border-none">
                            {ticket.eventCategory}
                          </Badge>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <p className="text-xs text-white/80 font-mono">
                            Ref: {ticket.bookingReference}
                          </p>
                          <h3 className="font-serif font-bold text-xl leading-snug drop-shadow-md">
                            {ticket.eventName}
                          </h3>
                        </div>
                      </div>

                      {/* Middle: Details & Attendee Info */}
                      <div className="lg:col-span-5 p-6 space-y-4 border-b lg:border-b-0 lg:border-r border-border/60">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-start space-x-2">
                            <Calendar className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs text-muted-foreground">Date</p>
                              <p className="text-sm font-medium text-foreground">{ticket.eventDate}</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Clock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs text-muted-foreground">Time</p>
                              <p className="text-sm font-medium text-foreground">{ticket.eventTime}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground">Venue</p>
                            <p className="text-sm font-medium text-foreground">{ticket.eventVenue}</p>
                          </div>
                        </div>

                        <div className="border-t border-border/50 pt-3 grid grid-cols-2 gap-3 text-xs">
                          <div className="flex items-center space-x-2">
                            <User className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="truncate text-foreground font-medium">
                              {ticket.attendeeName}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="truncate text-foreground font-medium">
                              {ticket.attendeeEmail}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between bg-muted/60 p-3 rounded-xl text-xs">
                          <div className="flex items-center space-x-1.5">
                            <CreditCard className="h-3.5 w-3.5 text-primary" />
                            <span className="text-muted-foreground">
                              {ticket.ticketCount} Ticket(s) • {ticket.paymentMethod}
                            </span>
                          </div>
                          <span className="font-bold text-sm text-primary">
                            Total: ${ticket.totalPaid.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Right: QR Code Pass & Actions */}
                      <div className="lg:col-span-3 p-6 flex flex-col items-center justify-between text-center bg-muted/30">
                        <div className="space-y-2">
                          <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto bg-white p-2 rounded-xl shadow-inner border border-border flex items-center justify-center">
                            {/* Visual QR Code Representation */}
                            <div className="w-full h-full border-2 border-dashed border-primary/40 rounded-lg flex flex-col items-center justify-center text-primary">
                              <QrCode className="h-10 w-10 sm:h-12 sm:w-12" />
                              <span className="text-[10px] font-mono mt-1 font-semibold tracking-tighter">
                                SCAN PASS
                              </span>
                            </div>
                          </div>
                          <p className="text-[11px] font-mono text-muted-foreground">
                            {ticket.bookingReference}
                          </p>
                        </div>

                        <div className="w-full space-y-2 mt-4">
                          <Button
                            onClick={() => handlePrint(ticket.bookingReference)}
                            size="sm"
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-lg shadow-sm"
                          >
                            <Printer className="h-3.5 w-3.5 mr-1.5" />
                            Print / PDF Pass
                          </Button>

                          <div className="flex gap-2">
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="flex-1 bg-background text-xs"
                            >
                              <Link href={`/events/${ticket.eventId}`}>
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Details
                              </Link>
                            </Button>

                            {ticket.status === "Confirmed" ? (
                              <Button
                                onClick={() => {
                                  setSelectedTicketForCancel(ticket)
                                  setIsCancelDialogOpen(true)
                                }}
                                variant="outline"
                                size="sm"
                                className="flex-1 border-destructive/40 text-destructive hover:bg-destructive/10 text-xs"
                              >
                                Cancel
                              </Button>
                            ) : (
                              <Button
                                onClick={() => handleDelete(ticket.id, ticket.bookingReference)}
                                variant="outline"
                                size="sm"
                                className="flex-1 text-muted-foreground hover:text-destructive text-xs"
                              >
                                <Trash2 className="h-3 w-3 mr-1" />
                                Delete
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="glass-card max-w-lg mx-auto p-10 rounded-3xl text-center shadow-lg border border-primary/20">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <Ticket className="h-8 w-8" />
              </div>
              <h2 className="font-serif font-bold text-2xl text-foreground mb-2">
                No Tickets Found
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mb-6 text-pretty">
                You haven't purchased or registered for any events yet. Explore our upcoming events to get your e-tickets!
              </p>
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-6 rounded-xl shadow-md hover-lift">
                <Link href="/events">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Explore Upcoming Events
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-2">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <DialogTitle className="font-serif text-center text-xl">
              Cancel Event Registration?
            </DialogTitle>
            <DialogDescription className="text-center">
              Are you sure you want to cancel your tickets for{" "}
              <span className="font-semibold text-foreground">
                {selectedTicketForCancel?.eventName}
              </span>
              ? A cancellation confirmation will be sent to your email.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsCancelDialogOpen(false)}
              className="flex-1"
            >
              Keep My Tickets
            </Button>
            <Button
              variant="destructive"
              onClick={confirmCancel}
              className="flex-1 font-semibold"
            >
              Confirm Cancellation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  )
}
