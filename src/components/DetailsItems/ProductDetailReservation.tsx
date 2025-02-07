'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

interface ReservationFormProps {
  productId: string
  pricePerDay: number
}

export default function ReservationForm({ productId, pricePerDay }: ReservationFormProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const handleReservation = () => {
    // Logique de réservation à implémenter
    console.log('Réservation pour le produit', productId, 'à la date', date)
  }

  return (
    <Card className="">
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="flex justify-center"
        />
      </CardContent>
      <CardFooter>
        <Button onClick={handleReservation} className="w-full">
          Réserver pour {pricePerDay}€
        </Button>
      </CardFooter>
    </Card>
  )
}

