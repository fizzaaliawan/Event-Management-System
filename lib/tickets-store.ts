export interface PurchasedTicket {
  id: string
  bookingReference: string
  eventId: string
  eventName: string
  eventImage: string
  eventDate: string
  eventTime: string
  eventVenue: string
  eventCategory: string
  attendeeName: string
  attendeeEmail: string
  attendeePhone?: string
  ticketCount: number
  unitPrice: number
  subtotal: number
  serviceFee: number
  totalPaid: number
  paymentMethod: string
  purchasedAt: string
  status: "Confirmed" | "Cancelled"
}

const STORAGE_KEY = "eventsphere_purchased_tickets"

export function getPurchasedTickets(): PurchasedTicket[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as PurchasedTicket[]
  } catch {
    return []
  }
}

export function savePurchasedTicket(ticket: PurchasedTicket): PurchasedTicket[] {
  if (typeof window === "undefined") return []
  try {
    const current = getPurchasedTickets()
    const updated = [ticket, ...current]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    window.dispatchEvent(new Event("tickets_updated"))
    return updated
  } catch {
    return []
  }
}

export function cancelPurchasedTicket(ticketId: string): PurchasedTicket[] {
  if (typeof window === "undefined") return []
  try {
    const current = getPurchasedTickets()
    const updated = current.map((t) =>
      t.id === ticketId ? { ...t, status: "Cancelled" as const } : t
    )
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    window.dispatchEvent(new Event("tickets_updated"))
    return updated
  } catch {
    return []
  }
}

export function removePurchasedTicket(ticketId: string): PurchasedTicket[] {
  if (typeof window === "undefined") return []
  try {
    const current = getPurchasedTickets()
    const updated = current.filter((t) => t.id !== ticketId)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    window.dispatchEvent(new Event("tickets_updated"))
    return updated
  } catch {
    return []
  }
}
