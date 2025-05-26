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
import { AlertTriangle, CalendarIcon } from "lucide-react";
import { getToken } from "@/const/func";
import { toast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Textarea } from "../ui/textarea";
import apiClient from "@/service/api/apiClient";

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

  const isMobile = useIsMobile();

  const [selectedReservation, setSelectedReservation] = useState<any | null>(
    null
  );
  const [modifyMessage, setModifyMessage] = useState("");
  const [modifyDateRange, setModifyDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [showModifyDialog, setShowModifyDialog] = useState(false);

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

  const getState = (state: string): string => {
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
        return "-";
    }
  };

  const handleModifyReservation = (reservation: any) => {
    setSelectedReservation(reservation);
    
    setModifyDateRange({
      from: reservation.start_at,
      to: reservation.end_at,
    });
    setModifyMessage(reservation.message || "");
    setShowModifyDialog(true);
  };

  const confirmModify = async () => {
    if (!selectedReservation) return;
    if (!modifyDateRange.from) return;

    const formattedStartDate = format(modifyDateRange.from, "yyyy-MM-dd");
    const formattedEndDate = modifyDateRange.to
      ? format(modifyDateRange.to, "yyyy-MM-dd")
      : formattedStartDate;

    try {
      const response = await apiClient.put(
        `/reservations/${selectedReservation.id}`,
        {
          item: item.id,
          start_at: formattedStartDate,
          end_at: formattedEndDate,
        }
      );

      if (response.status !== 200) {
        toast({
          title: "Erreur",
          description:
            response.data?.message ||
            "Une erreur est survenue lors de la modification de la réservation",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Modification confirmée",
        description:
          "Votre demande de modification a été envoyée au propriétaire",
        variant: "success",
      });
      setModifyMessage("");
      setModifyDateRange({ from: undefined, to: undefined });
      onChange();
      setSelectedReservation(null);
      setShowModifyDialog(false);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description:
          error?.response?.data?.message ||
          "Une erreur est survenue lors de la demande de modification",
        variant: "destructive",
      });
    }
  };

  const handleCancelReservation = (reservation: any) => {
    setReservationToCancel(reservation);
    setShowCancelDialog(true);
  };

  const confirmCancel = async () => {
    if (!reservationToCancel) return;

    try {
      const response = await apiClient.put(
        `/reservations/${reservationToCancel.id}`,
        { state: "canceled" }
      );
      if (response.status !== 200) {
        console.error(
          "An error occurred while changing reservation state",
          response.status
        );
      }
      toast({
        title: "Réservation annulée",
        description: "La réservation a bien été annulée",
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

  const calculateTotal = (item: any, from: Date|undefined, to: Date|undefined) => {
    if (!from) return 0;
    const endDate = to || from
    const days = differenceInDays(endDate, from) + 1;
    return (item.price * days).toFixed(2);
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
                    {calculateTotal(reservation.item, modifyDateRange.from || reservation.start_at, modifyDateRange.to)}
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
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleModifyReservation(reservation)}
                  >
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
            <Button variant="destructive" onClick={confirmCancel}>
              Confirmer l'annulation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue de modification de réservation */}
      <Dialog open={showModifyDialog} onOpenChange={setShowModifyDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier votre réservation</DialogTitle>
            <DialogDescription>
              Vous pouvez modifier les dates et le message de votre réservation
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Période de location</label>
              <div className="grid gap-2">
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !modifyDateRange.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {modifyDateRange.from ? (
                        modifyDateRange.to ? (
                          <>
                            {format(modifyDateRange.from, "dd MMMM yyyy", {
                              locale: fr,
                            })}{" "}
                            -{" "}
                            {format(modifyDateRange.to, "dd MMMM yyyy", {
                              locale: fr,
                            })}
                          </>
                        ) : (
                          format(modifyDateRange.from, "dd MMMM yyyy", {
                            locale: fr,
                          })
                        )
                      ) : (
                        "Sélectionnez les dates"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      defaultMonth={modifyDateRange.from}
                      selected={modifyDateRange}
                      onSelect={(range) =>
                        setModifyDateRange({ from: range?.from, to: range?.to })
                      }
                      numberOfMonths={isMobile ? 1 : 2}
                      locale={fr}
                      disabled={(date) => date < new Date()}
                      showOutsideDays={true}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Message au propriétaire (optionnel)
              </label>
              <Textarea
                placeholder="Présentez-vous et expliquez pourquoi vous souhaitez louer cet objet..."
                value={modifyMessage}
                onChange={(e) => setModifyMessage(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            {modifyDateRange.from && (
              <div className="bg-muted p-3 rounded-md space-y-2">
                <div className="flex justify-between py-1">
                  <span className="text-sm">
                    {item.price}€ ×{" "}
                    {differenceInDays(
                      modifyDateRange.to || modifyDateRange.from,
                      modifyDateRange.from
                    ) + 1}{" "}
                    jours
                  </span>
                  <span className="text-sm font-medium">
                    {calculateTotal(selectedReservation.item, modifyDateRange.from, modifyDateRange.to)}€
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between py-1">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-lg font-bold">{calculateTotal(selectedReservation.item, modifyDateRange.from, modifyDateRange.to)}€</span>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowModifyDialog(false)}
            >
              Annuler
            </Button>
            <Button onClick={confirmModify}>Confirmer les modifications</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ExistingReservationsCard;
