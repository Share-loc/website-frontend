"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already made a cookie choice
    const cookieChoice = localStorage.getItem("cookieChoice")
    if (!cookieChoice) {
      setIsVisible(true)
    }
  }, [])

  const acceptAllCookies = () => {
    // Set cookie preference to "all"
    localStorage.setItem("cookieChoice", "all")
    // Here you would typically set your actual cookies
    console.log("All cookies accepted")
    setIsVisible(false)
  }

  const acceptNecessaryCookies = () => {
    // Set cookie preference to "necessary"
    localStorage.setItem("cookieChoice", "necessary")
    // Here you would typically set only necessary cookies
    console.log("Only necessary cookies accepted")
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Gestion des cookies</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsVisible(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
              <span className="sr-only">Fermer</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pb-2 text-sm text-muted-foreground">
          <p>
            Nous utilisons des cookies pour améliorer votre expérience sur notre site. Vous pouvez choisir d'accepter tous les cookies ou seulement ceux qui sont nécessaires au fonctionnement du site.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 pt-0 sm:flex-row sm:space-x-2 sm:space-y-0">
          <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={acceptNecessaryCookies}>
            Refuser
          </Button>
          <Button variant="default" size="sm" className="w-full sm:w-auto bg-primary" onClick={acceptAllCookies}>
            Accepter
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
