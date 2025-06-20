import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { differenceInDays, format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar } from "../ui/calendar";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/hooks/use-toast";
import apiClient from "@/service/api/apiClient";

interface ReservationFormProps {
  item: any;
  onNewReservation: () => void;
}

function ReservationForm({ item, onNewReservation }: ReservationFormProps) {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [message, setMessage] = useState<string>("");
  const [isLoadingSendReservation, setIsLoadingSendReservation] =
    useState(false);
  const isMobile = useIsMobile();

  const calculateTotal = () => {
    if (!dateRange.from) return 0;
    const endDate = dateRange.to || dateRange.from
    const days = differenceInDays(endDate, dateRange.from) + 1;
    return (item.price * days).toFixed(2);
  };

  const handleSubmitReservation = async () => {
    if (!dateRange.from) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une période de location",
        variant: "destructive",
      });
      return;
    }

    const formattedStartDate = format(dateRange.from, "yyyy-MM-dd");
    const formattedEndDate = dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : formattedStartDate;

    setIsLoadingSendReservation(true);
    try {
      await apiClient.post("/reservations", {
        item: item.id,
        start_at: formattedStartDate,
        end_at: formattedEndDate,
      });

      toast({
        title: "Réservation confirmée",
        description: "Votre demande de réservation a été envoyée au propriétaire",
        variant: "success",
      });
      setMessage("");
      setDateRange({ from: undefined, to: undefined });
      onNewReservation();
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        "Une erreur est survenue lors de la demande de réservation";
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      });
    }
    setIsLoadingSendReservation(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Réserver cet objet</CardTitle>
        <CardDescription>{item.price}€ par jour</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Période de location</label>
          <div className="grid gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dateRange.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "dd MMMM yyyy", { locale: fr })}{" "}
                        - {format(dateRange.to, "dd MMMM yyyy", { locale: fr })}
                      </>
                    ) : (
                      format(dateRange.from, "dd MMMM yyyy", { locale: fr })
                    )
                  ) : (
                    "Sélectionnez les dates"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={dateRange}
                  onSelect={(range) =>
                    setDateRange({ from: range?.from, to: range?.to })
                  }
                  numberOfMonths={isMobile ? 1 : 2}
                  locale={fr}
                  disabled={(date) => date < new Date()}
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        {dateRange.from && (
          <div className="bg-muted p-3 rounded-md space-y-2">
            <div className="flex justify-between py-1">
              <span className="text-sm">
                {item.price}€ ×{" "}
                {differenceInDays(dateRange.to || dateRange.from, dateRange.from) + 1} jours
              </span>
              <span className="text-sm font-medium">{calculateTotal()}€</span>
            </div>
            <Separator />
            <div className="flex justify-between py-1">
              <span className="text-sm font-medium">Total</span>
              <span className="text-lg font-bold">{calculateTotal()}€</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmitReservation}
          className="w-full"
          disabled={isLoadingSendReservation}
        >
          Envoyer une demande de réservation
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ReservationForm;
