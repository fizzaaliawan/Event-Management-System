"use client"

import { useState } from "react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { savePurchasedTicket, PurchasedTicket } from "@/lib/tickets-store"
import {
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  User,
  ArrowLeft,
  ExternalLink,
  Share2,
  CheckCircle2,
  Sparkles,
  CreditCard,
  ShieldCheck,
  Ticket,
  QrCode,
  Lock,
  Phone,
  Mail,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Event } from "@/lib/events-data"

interface EventDetailContentProps {
  event: Event
}

export function EventDetailContent({ event }: EventDetailContentProps) {
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState<"details" | "payment" | "success">("details")
  const [isProcessing, setIsProcessing] = useState(false)

  // Customer Form Data
  const [attendeeName, setAttendeeName] = useState("")
  const [attendeeEmail, setAttendeeEmail] = useState("")
  const [attendeePhone, setAttendeePhone] = useState("")
  const [ticketCount, setTicketCount] = useState(1)

  // Payment Form Data
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")
  const [cardholderName, setCardholderName] = useState("")

  // Generated Ticket Result
  const [completedTicket, setCompletedTicket] = useState<PurchasedTicket | null>(null)

  // Price calculations
  const rawPriceNumber = event.price && event.price.toLowerCase() !== "free"
    ? parseFloat(event.price.replace(/[^0-9.]/g, "")) || 0
    : 0
  const isFree = rawPriceNumber === 0
  const unitPrice = rawPriceNumber
  const subtotal = unitPrice * ticketCount
  const serviceFee = isFree ? 0 : 4.5
  const totalAmount = subtotal + serviceFee

  // Phone auto-formatter: (XXX) XXX-XXXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 10)
    if (raw.length === 0) {
      setAttendeePhone("")
    } else if (raw.length <= 3) {
      setAttendeePhone(`(${raw}`)
    } else if (raw.length <= 6) {
      setAttendeePhone(`(${raw.slice(0, 3)}) ${raw.slice(3)}`)
    } else {
      setAttendeePhone(`(${raw.slice(0, 3)}) ${raw.slice(3, 6)}-${raw.slice(6)}`)
    }
  }

  // Card Number auto-formatter: XXXX XXXX XXXX XXXX
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16)
    const formatted = raw.replace(/(\d{4})(?=\d)/g, "$1 ")
    setCardNumber(formatted)
  }

  // Card Expiry auto-formatter: MM/YY
  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4)
    if (raw.length <= 2) {
      setCardExpiry(raw)
    } else {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`)
    }
  }

  // Card CVC auto-formatter: 3 or 4 digits
  const handleCardCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4)
    setCardCvc(raw)
  }

  // Detect card brand
  const getCardBrand = (number: string) => {
    const clean = number.replace(/\s/g, "")
    if (clean.startsWith("4")) return "Visa"
    if (clean.startsWith("51") || clean.startsWith("52") || clean.startsWith("53") || clean.startsWith("54") || clean.startsWith("55")) return "Mastercard"
    if (clean.startsWith("34") || clean.startsWith("37")) return "Amex"
    return "Card"
  }

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : ""
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.name,
          text: event.description,
          url: url,
        })
        return
      } catch {
        // Fallback
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url)
      toast({
        title: "Link Copied!",
        description: "Event URL has been copied to your clipboard.",
      })
    }
  }

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!cardholderName && attendeeName) {
      setCardholderName(attendeeName)
    }
    if (isFree) {
      completePurchase("Free RSVP")
    } else {
      setCheckoutStep("payment")
    }
  }

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    setTimeout(() => {
      const last4 = cardNumber ? cardNumber.replace(/\s/g, "").slice(-4) : "4242"
      const brand = getCardBrand(cardNumber)
      completePurchase(`${brand} (•••• ${last4})`)
      setIsProcessing(false)
    }, 1200)
  }

  const completePurchase = (paymentMethod: string) => {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000)
    const bookingRef = `ESP-${randomSuffix}`

    const newTicket: PurchasedTicket = {
      id: `tkt_${Date.now()}_${randomSuffix}`,
      bookingReference: bookingRef,
      eventId: event.id,
      eventName: event.name,
      eventImage: event.image,
      eventDate: event.date,
      eventTime: event.time,
      eventVenue: event.venue,
      eventCategory: event.category,
      attendeeName: attendeeName || "Attendee",
      attendeeEmail: attendeeEmail,
      attendeePhone: attendeePhone,
      ticketCount,
      unitPrice,
      subtotal,
      serviceFee,
      totalPaid: totalAmount,
      paymentMethod,
      purchasedAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: "Confirmed",
    }

    savePurchasedTicket(newTicket)
    setCompletedTicket(newTicket)
    setCheckoutStep("success")

    toast({
      title: "Order Confirmed! 🎉",
      description: `E-Tickets sent to ${attendeeEmail}. Reference: ${bookingRef}`,
    })
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setTimeout(() => {
      setCheckoutStep("details")
      setCompletedTicket(null)
    }, 300)
  }

  return (
    <div className="pt-28 pb-24 lg:pb-16">
      {/* Top Single Back Button */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 mb-4 sm:mb-6">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-xs sm:text-sm shadow-sm transition-all hover-lift"
        >
          <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span>Back to All Events</span>
        </Link>
      </div>

      {/* Hero Banner Container */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6">
        <section className="relative h-72 sm:h-96 md:h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-border/40">
          <Image
            src={event.image || "/tech-fest.jpeg"}
            alt={event.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />

          {/* Event Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 md:p-12 z-10">
            <div className="max-w-4xl">
              <Badge variant="secondary" className="bg-primary text-primary-foreground mb-2.5 sm:mb-4 px-3 sm:px-3.5 py-0.5 sm:py-1 text-xs sm:text-sm font-semibold shadow">
                {event.category}
              </Badge>
              <h1 className="font-serif font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-2 sm:mb-3 text-balance drop-shadow-md leading-tight">
                {event.name}
              </h1>
              <p className="text-xs sm:text-base md:text-lg text-white/90 max-w-2xl text-pretty drop-shadow line-clamp-2 sm:line-clamp-none">
                {event.description}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Event Details Grid */}
      <section className="py-6 sm:py-10 px-3.5 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Event Information */}
              <Card className="glass-card shadow-md rounded-2xl">
                <CardContent className="p-6 sm:p-8">
                  <h2 className="font-serif font-bold text-2xl text-foreground mb-4">About This Event</h2>
                  <p className="text-muted-foreground leading-relaxed text-pretty text-base sm:text-lg">
                    {event.fullDescription}
                  </p>
                </CardContent>
              </Card>

              {/* Location Map */}
              <Card className="glass-card shadow-md rounded-2xl">
                <CardContent className="p-6 sm:p-8">
                  <h2 className="font-serif font-bold text-2xl text-foreground mb-6">Event Location</h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground text-lg">{event.venue}</p>
                        <Button variant="link" className="p-0 h-auto text-primary hover:text-primary/80 font-semibold" asChild>
                          <a
                            href={`https://maps.google.com/?q=${encodeURIComponent(event.venue)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View on Google Maps
                            <ExternalLink className="h-3.5 w-3.5 ml-1" />
                          </a>
                        </Button>
                      </div>
                    </div>

                    {/* Embedded Map */}
                    <div className="rounded-xl overflow-hidden border border-border/80 shadow-inner">
                      <iframe
                        src={event.mapEmbedUrl}
                        width="100%"
                        height="320"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Map showing location of ${event.venue}`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Event Details Card */}
              <Card className="glass-card sticky top-24 shadow-md rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="font-serif font-bold text-xl text-foreground mb-6">Ticket & Booking Info</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">Date</p>
                        <p className="text-muted-foreground">{event.date}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">Time</p>
                        <p className="text-muted-foreground">{event.time}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">Venue</p>
                        <p className="text-muted-foreground text-pretty">{event.venue}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <User className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">Organizer</p>
                        <p className="text-muted-foreground">{event.organizer}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <DollarSign className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">Price per ticket</p>
                        <p className="text-primary font-bold text-2xl">{event.price || "Free"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Dialog Trigger */}
                  <div className="space-y-3">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-6 text-base rounded-xl shadow-md hover-lift">
                          <Ticket className="h-5 w-5 mr-2" />
                          {isFree ? "Register for Free" : `Buy Tickets • ${event.price}`}
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="w-[94vw] max-w-lg max-h-[90vh] overflow-y-auto p-4 sm:p-6 rounded-2xl">
                        {/* STEP 1: Attendee Info & Quantity */}
                        {checkoutStep === "details" && (
                          <form onSubmit={handleProceedToPayment} className="space-y-4">
                            <DialogHeader>
                              <div className="flex items-center space-x-2 text-primary">
                                <Ticket className="h-5 w-5" />
                                <span className="text-xs font-bold uppercase tracking-wider">Step 1 of 2: Attendee Information</span>
                              </div>
                              <DialogTitle className="font-serif text-2xl text-foreground">
                                {event.name}
                              </DialogTitle>
                              <DialogDescription>
                                Enter your details to reserve your tickets. Official passes will be sent to your email.
                              </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4 py-2">
                              <div className="space-y-1.5">
                                <Label htmlFor="checkout-name" className="font-semibold text-foreground text-sm flex items-center">
                                  <User className="h-4 w-4 mr-1.5 text-primary" />
                                  Full Name *
                                </Label>
                                <Input
                                  id="checkout-name"
                                  placeholder="John Doe"
                                  required
                                  value={attendeeName}
                                  onChange={(e) => setAttendeeName(e.target.value)}
                                  className="h-11 rounded-xl font-medium"
                                />
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                  <Label htmlFor="checkout-email" className="font-semibold text-foreground text-sm flex items-center">
                                    <Mail className="h-4 w-4 mr-1.5 text-primary" />
                                    Email Address *
                                  </Label>
                                  <Input
                                    id="checkout-email"
                                    type="email"
                                    placeholder="john.doe@example.com"
                                    required
                                    value={attendeeEmail}
                                    onChange={(e) => setAttendeeEmail(e.target.value)}
                                    className="h-11 rounded-xl font-medium"
                                  />
                                  <p className="text-[11px] text-muted-foreground">E-ticket & receipt sent here</p>
                                </div>
                                <div className="space-y-1.5">
                                  <Label htmlFor="checkout-phone" className="font-semibold text-foreground text-sm flex items-center">
                                    <Phone className="h-4 w-4 mr-1.5 text-primary" />
                                    Phone Number
                                  </Label>
                                  <Input
                                    id="checkout-phone"
                                    type="tel"
                                    placeholder="(555) 123-4567"
                                    value={attendeePhone}
                                    onChange={handlePhoneChange}
                                    className="h-11 rounded-xl font-medium"
                                  />
                                  <p className="text-[11px] text-muted-foreground">For SMS event updates</p>
                                </div>
                              </div>

                              <div className="space-y-1.5">
                                <Label htmlFor="checkout-quantity" className="font-semibold text-foreground text-sm flex items-center">
                                  <Ticket className="h-4 w-4 mr-1.5 text-primary" />
                                  Number of Tickets
                                </Label>
                                <select
                                  id="checkout-quantity"
                                  className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary font-medium"
                                  value={ticketCount}
                                  onChange={(e) => setTicketCount(parseInt(e.target.value) || 1)}
                                >
                                  <option value={1}>1 Ticket ({isFree ? "Free" : `$${(unitPrice * 1).toFixed(2)}`})</option>
                                  <option value={2}>2 Tickets ({isFree ? "Free" : `$${(unitPrice * 2).toFixed(2)}`})</option>
                                  <option value={3}>3 Tickets ({isFree ? "Free" : `$${(unitPrice * 3).toFixed(2)}`})</option>
                                  <option value={4}>4 Tickets ({isFree ? "Free" : `$${(unitPrice * 4).toFixed(2)}`})</option>
                                  <option value={5}>5 Tickets ({isFree ? "Free" : `$${(unitPrice * 5).toFixed(2)}`})</option>
                                </select>
                              </div>

                              {/* Price Summary Breakdown */}
                              <div className="bg-muted/60 p-4 rounded-2xl space-y-2 text-sm border border-border/60">
                                <div className="flex justify-between text-muted-foreground text-xs sm:text-sm">
                                  <span>Tickets ({ticketCount} × {isFree ? "Free" : `$${unitPrice}`})</span>
                                  <span className="font-semibold text-foreground">${subtotal.toFixed(2)}</span>
                                </div>
                                {!isFree && (
                                  <div className="flex justify-between text-muted-foreground text-xs sm:text-sm">
                                    <span>Processing & Service Fee</span>
                                    <span className="font-semibold text-foreground">${serviceFee.toFixed(2)}</span>
                                  </div>
                                )}
                                <div className="border-t border-border/80 pt-2 flex justify-between font-bold text-base text-primary">
                                  <span>Total Amount</span>
                                  <span>${totalAmount.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>

                            <DialogFooter>
                              <Button type="submit" className="w-full font-bold bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base rounded-xl shadow-md">
                                {isFree ? "Complete Free Registration" : `Continue to Payment ($${totalAmount.toFixed(2)}) →`}
                              </Button>
                            </DialogFooter>
                          </form>
                        )}

                        {/* STEP 2: Secure Card Payment */}
                        {checkoutStep === "payment" && (
                          <form onSubmit={handleCompletePayment} className="space-y-4">
                            <DialogHeader>
                              <div className="flex items-center space-x-2 text-primary">
                                <Lock className="h-4 w-4" />
                                <span className="text-xs font-bold uppercase tracking-wider">Step 2 of 2: Secure Payment</span>
                              </div>
                              <DialogTitle className="font-serif text-2xl text-foreground">
                                Payment Details
                              </DialogTitle>
                              <DialogDescription>
                                Total Due: <strong className="text-primary font-bold text-base">${totalAmount.toFixed(2)}</strong> for {ticketCount} ticket(s)
                              </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-3 py-2">
                              <div className="space-y-1.5">
                                <Label htmlFor="card-name" className="font-semibold text-foreground text-sm flex items-center">
                                  <User className="h-4 w-4 mr-1.5 text-primary" />
                                  Cardholder Name *
                                </Label>
                                <Input
                                  id="card-name"
                                  placeholder="John Doe"
                                  required
                                  value={cardholderName}
                                  onChange={(e) => setCardholderName(e.target.value)}
                                  className="h-11 rounded-xl font-medium tracking-wide"
                                />
                                <p className="text-[11px] text-muted-foreground">Name exactly as printed on card</p>
                              </div>

                              <div className="space-y-1.5">
                                <div className="flex justify-between items-center">
                                  <Label htmlFor="card-number" className="font-semibold text-foreground text-sm flex items-center">
                                    <CreditCard className="h-4 w-4 mr-1.5 text-primary" />
                                    Card Number *
                                  </Label>
                                  {cardNumber && (
                                    <span className="text-xs font-bold text-primary px-2 py-0.5 rounded bg-primary/10">
                                      {getCardBrand(cardNumber)}
                                    </span>
                                  )}
                                </div>
                                <div className="relative">
                                  <Input
                                    id="card-number"
                                    placeholder="4532 0123 4567 8910"
                                    required
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    className="pr-10 h-11 rounded-xl font-medium tracking-wider"
                                  />
                                  <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                  <Label htmlFor="card-expiry" className="font-semibold text-foreground text-sm">
                                    Expiry Date *
                                  </Label>
                                  <Input
                                    id="card-expiry"
                                    placeholder="MM/YY (e.g. 08/28)"
                                    required
                                    value={cardExpiry}
                                    onChange={handleCardExpiryChange}
                                    className="h-11 rounded-xl font-medium tracking-wider text-center"
                                  />
                                </div>
                                <div className="space-y-1.5">
                                  <Label htmlFor="card-cvc" className="font-semibold text-foreground text-sm">
                                    Security Code (CVV) *
                                  </Label>
                                  <Input
                                    id="card-cvc"
                                    placeholder="123"
                                    type="password"
                                    required
                                    value={cardCvc}
                                    onChange={handleCardCvcChange}
                                    className="h-11 rounded-xl font-medium tracking-wider text-center"
                                  />
                                </div>
                              </div>

                              <div className="flex items-center space-x-2 text-xs text-muted-foreground bg-muted/50 p-3.5 rounded-2xl border border-border/60">
                                <ShieldCheck className="h-4 w-4 text-green-600 flex-shrink-0" />
                                <span>256-bit encrypted simulated checkout. Your details are safe & protected.</span>
                              </div>
                            </div>

                            <DialogFooter className="gap-2 sm:gap-0">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setCheckoutStep("details")}
                                disabled={isProcessing}
                                className="rounded-xl px-5"
                              >
                                ← Back
                              </Button>
                              <Button
                                type="submit"
                                className="flex-1 font-bold bg-primary text-primary-foreground hover:bg-primary/90 py-6 rounded-xl shadow-md"
                                disabled={isProcessing}
                              >
                                {isProcessing ? (
                                  <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                                    Processing Payment...
                                  </>
                                ) : (
                                  `Pay $${totalAmount.toFixed(2)} & Complete Order`
                                )}
                              </Button>
                            </DialogFooter>
                          </form>
                        )}

                        {/* STEP 3: Success Confirmation & Pass */}
                        {checkoutStep === "success" && completedTicket && (
                          <div className="py-4 text-center space-y-5">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                              <CheckCircle2 className="h-10 w-10" />
                            </div>

                            <div>
                              <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1 bg-green-100 text-green-700 rounded-full">
                                Booking Confirmed
                              </span>
                              <h3 className="font-serif font-bold text-2xl text-foreground mt-2">
                                You're Ready to Go!
                              </h3>
                              <p className="text-xs text-muted-foreground mt-1">
                                Reference: <strong className="font-mono text-foreground">{completedTicket.bookingReference}</strong>
                              </p>
                            </div>

                            {/* Ticket Card Preview */}
                            <div className="glass-card p-4 rounded-2xl text-left border border-border/80 shadow-inner bg-background/80 space-y-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-serif font-bold text-lg text-foreground">{event.name}</h4>
                                  <p className="text-xs text-muted-foreground">{event.date} • {event.time}</p>
                                  <p className="text-xs text-muted-foreground">{event.venue}</p>
                                </div>
                                <div className="p-1.5 bg-white rounded-xl border border-border shadow-xs">
                                  <QrCode className="h-10 w-10 text-primary" />
                                </div>
                              </div>

                              <div className="border-t border-border/50 pt-2 flex justify-between text-xs">
                                <span>Attendee: <strong>{completedTicket.attendeeName}</strong></span>
                                <span>Tickets: <strong>{completedTicket.ticketCount}</strong></span>
                              </div>
                            </div>

                            <p className="text-xs text-muted-foreground bg-primary/5 p-3.5 rounded-2xl text-pretty border border-primary/10">
                              📧 <strong>Email Confirmation Sent:</strong> Official e-ticket pass & receipt sent to{" "}
                              <span className="text-primary font-bold">{completedTicket.attendeeEmail}</span>.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                              <Button
                                asChild
                                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-5 rounded-xl shadow-md"
                              >
                                <Link href="/my-tickets">
                                  <Ticket className="h-4 w-4 mr-2" />
                                  View in My Tickets
                                </Link>
                              </Button>
                              <Button
                                variant="outline"
                                onClick={handleCloseDialog}
                                className="sm:w-32 py-5 rounded-xl font-semibold"
                              >
                                Close
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="outline"
                      onClick={handleShare}
                      className="w-full glass-card bg-background border-border text-foreground hover:bg-primary/10 hover:text-primary font-semibold py-6 text-base rounded-xl hover-lift"
                    >
                      <Share2 className="h-4 w-4 mr-2 text-primary" />
                      Share Event
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Related Events with High Contrast Action Button */}
              <Card className="glass-card shadow-md rounded-2xl">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <h3 className="font-serif font-bold text-lg text-foreground">Explore More</h3>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Looking for other dates or categories? Browse our comprehensive upcoming event schedule.
                  </p>
                  <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-5 rounded-xl shadow-sm hover-lift">
                    <Link href="/events">Explore All Events</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Booking Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border/60 px-4 py-3 shadow-2xl">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Price per ticket</p>
            <p className="font-serif font-bold text-lg text-primary leading-none">{event.price || "Free"}</p>
          </div>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="flex-1 max-w-[220px] bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-11 rounded-xl shadow-md text-sm"
          >
            <Ticket className="h-4 w-4 mr-1.5" />
            {isFree ? "Register for Free" : `Get Tickets • ${event.price}`}
          </Button>
        </div>
      </div>
    </div>
  )
}




