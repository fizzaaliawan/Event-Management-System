import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "700"],
})

export const viewport: Viewport = {
  themeColor: "#164e63",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: "EventSphere - Discover & Experience Top Upcoming Events",
    template: "%s | EventSphere",
  },
  description:
    "Explore, filter, and register for premier conferences, music festivals, summits, and cultural gatherings with EventSphere.",
  keywords: [
    "events",
    "conferences",
    "music festivals",
    "tech summits",
    "event discovery",
    "RSVP",
    "EventSphere",
  ],
  authors: [{ name: "EventSphere Team" }],
  creator: "EventSphere",
  metadataBase: new URL("https://eventsphere.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eventsphere.app",
    title: "EventSphere - Discover & Experience Top Upcoming Events",
    description:
      "A modern platform to explore and discover upcoming events with detailed venue maps, schedules, and instant RSVP.",
    siteName: "EventSphere",
  },
  twitter: {
    card: "summary_large_image",
    title: "EventSphere - Discover Upcoming Events",
    description: "Explore curated upcoming events and reserve your spot effortlessly.",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} ${playfair.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Toaster />
      </body>
    </html>
  )
}

