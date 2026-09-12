"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, CheckCircle } from "lucide-react"

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Card className="glass-card rounded-2xl border border-border/50 shadow-md">
        <CardContent className="p-6 sm:p-8 text-center">
          <CheckCircle className="h-14 w-14 sm:h-16 sm:w-16 text-green-500 mx-auto mb-4" />
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-foreground mb-2">Message Sent!</h3>
          <p className="text-muted-foreground mb-6 text-pretty text-xs sm:text-sm">
            Thank you for reaching out. We'll get back to you within 24 hours.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 py-2.5 rounded-xl shadow-sm hover-lift text-sm"
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="glass-card rounded-2xl border border-border/50 shadow-md">
      <CardHeader className="px-5 pt-6 pb-2 sm:px-8 sm:pt-8">
        <CardTitle className="font-serif font-bold text-xl sm:text-2xl text-foreground">Send us a Message</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-6 sm:px-8 sm:pb-8">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="firstName" className="text-foreground font-semibold text-xs sm:text-sm">
                First Name
              </Label>
              <Input id="firstName" name="firstName" placeholder="John" required className="h-11 rounded-xl text-base" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lastName" className="text-foreground font-semibold text-xs sm:text-sm">
                Last Name
              </Label>
              <Input id="lastName" name="lastName" placeholder="Doe" required className="h-11 rounded-xl text-base" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-foreground font-semibold text-xs sm:text-sm">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              required
              className="h-11 rounded-xl text-base"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="subject" className="text-foreground font-semibold text-xs sm:text-sm">
              Subject
            </Label>
            <Input id="subject" name="subject" placeholder="What's this about?" required className="h-11 rounded-xl text-base" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message" className="text-foreground font-semibold text-xs sm:text-sm">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us more about your inquiry..."
              rows={4}
              required
              className="rounded-xl text-base resize-none"
            />
          </div>

          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-12 rounded-xl shadow-md hover-lift text-sm sm:text-base" size="lg" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
