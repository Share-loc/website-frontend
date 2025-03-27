import { differenceInDays, format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { fr } from "date-fns/locale";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { AlertTriangle } from "lucide-react";
import { getToken } from "@/const/func";
import { toast } from "@/hooks/use-toast";

interface ExistingReservationsCardProps {
  reservations: any;
  item: any;
  onChange: () => void;
}

function ExistingReservationsCard({
  reservations,
  item,
  onChange,
}: ExistingReservationsCardProps) {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState<any | null>(
    null
  );

  const getStateColor = (state: string) => {
    switch (state) {
      case "accepted":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "refused":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "canceled":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "pending":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const getState = (state : string): string => {
    switch (state) {
        case "accepted":
          return "Accepté";
        case "refused":
          return "Refusé";
        case "canceled":
          return "annulé";
        case "pending":
          return "En attente";
        default:
            return "-"
      }
  }

  const handleCancelReservation = (reservation: any) => {
    setReservationToCancel(reservation);
    setShowCancelDialog(true);
  };

  const confirmCancel = async () => {
    if (!reservationToCancel) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/reservations/${
          reservationToCancel.id
        }`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({ state: "canceled" }),
        }
      );
      if (!response.ok) {
        console.error(
          "An error occurred while changing reservation state",
          response.status
        );
      }
      toast({
        title: "Réservation annulée",
        content: "La réservation a bien été annulée",
        variant: "success",
      });

      // refetch reservations
      onChange();
    } catch (error) {
      console.error(
        "An error occurred while fetching reservations data",
        error
      );
      toast({
        title: "Erreur",
        description: "Impossible d'annuler la réservation",
        variant: "destructive",
      });
    }
    setShowCancelDialog(false);
    setReservationToCancel(null);
  };

  return (
    <>
      <Card className="">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Vos réservations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {reservations.map((reservation: any) => (
            <div key={reservation.id} className="space-y-3 pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Réservation #{reservation.id}</h3>
                  <p className="text-sm text-muted-foreground">
                    Créée le{" "}
                    {format(reservation.created_at, "dd MMMM yyyy", {
                      locale: fr,
                    })}
                  </p>
                </div>
                <Badge
                  className={cn(
                    "font-normal",
                    getStateColor(reservation.state)
                  )}
                >
                  {getState(reservation.state)}
                </Badge>
              </div>

              <div className="bg-background p-3 rounded-md space-y-3 border">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Période</div>
                  <div>
                    {format(reservation.start_at, "dd MMMM yyyy", {
                      locale: fr,
                    })}{" "}
                    -{" "}
                    {format(reservation.end_at, "dd MMMM yyyy", { locale: fr })}
                  </div>

                  <div className="font-medium">Durée</div>
                  <div>
                    {differenceInDays(
                      reservation.end_at,
                      reservation.start_at
                    ) + 1}{" "}
                    jours
                  </div>

                  <div className="font-medium">Prix total</div>
                  <div className="font-bold">
                    {item.price *
                      (differenceInDays(
                        reservation.end_at,
                        reservation.start_at
                      ) +
                        1)}{" "}
                    €
                  </div>
                </div>

                {reservation.message && (
                  <div className="pt-2 border-t border-border">
                    <div className="font-medium text-sm mb-1">
                      Votre message
                    </div>
                    <p className="text-sm">{reservation.message}</p>
                  </div>
                )}
              </div>

              {reservation.state === "pending" && (
                <div className="flex gap-2">
                  <Button variant="outline" className="w-full">
                    Modifier
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => handleCancelReservation(reservation)}
                  >
                    Annuler
                  </Button>
                </div>
              )}

              {reservation !== reservations[reservations.length - 1] && (
                <Separator className="mt-3" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
     {/* Dialogue de confirmation d'annulation */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Confirmer l'annulation
            </DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir annuler cette réservation ?
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <p className="text-sm mb-4">
              L'annulation de votre réservation est définitive et ne pourra pas
              être rétablie.
            </p>

            {reservationToCancel && (
              <div className="bg-muted p-3 rounded-md space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-medium">Réservation</div>
                  <div>#{reservationToCancel.id}</div>

                  <div className="font-medium">Période</div>
                  <div>
                    {format(reservationToCancel.start_at, "dd MMMM yyyy", {
                      locale: fr,
                    })}{" "}
                    -{" "}
                    {format(reservationToCancel.end_at, "dd MMMM yyyy", {
                      locale: fr,
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCancelDialog(false)}
            >
              Retour
            </Button>
            <Button variant="destructive" onClick={confirmCancel}>Confirmer l'annulation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ExistingReservationsCard;
