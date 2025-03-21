import ReservationDetails from "@/components/ReservationDetails";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getToken } from "@/const/func";
import {  
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isWeekend,
  startOfMonth,
} from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Reservation {
  id: number;
  tenant: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
  };
  item: {
    id: number;
    user: {
      id: number;
      username: string;
      first_name: string;
      last_name: string;
    };
    category: {
      id: number;
      name: string;
    };
    title: string;
  };
  start_at: string;
  end_at: string;
  price: number;
  state:  "pending" | "accepted" | "canceled" | "refused";
  created_at: string;
  canceled_at: string | null;
  reviews: [
    {
      reviewer: {
        id: number;
      };
      reviewed: {
        id: number;
      };
    }
  ];
}

interface ReservationList {
  asRenter: Reservation[];
  asOwner: Reservation[];
}

function ReservationsListPage() {
  const [reservations, setReservations] = useState<ReservationList>();


  const fetchReservations = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/reservations`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error("An error occurred while fetching reservations data", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);


  const [selectedMonth, setSelectedMonth] = useState(new Date());

  // Date actuelle pour le calendrier
  const today = new Date();
  const firstDayCurrentMonth = startOfMonth(selectedMonth);
  const lastDayCurrentMonth = endOfMonth(selectedMonth);

  // Jours du mois actuel
  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: lastDayCurrentMonth,
  });

  const handleMonthChange = (direction: "next" | "previous") => {
    setSelectedMonth((prevMonth) =>
      direction === "next"
        ? addMonths(prevMonth, 1)
        : addMonths(prevMonth, -1)
    );
  };

// Fonctions helpers pour les dates
const isToday = (date: Date) => {
  const today = new Date();
  return isSameDay(new Date(date), today);
};

const isTomorrow = (date: Date) => {
  const tomorrow = addDays(new Date(), 1);
  return isSameDay(new Date(date), tomorrow);
};

const isThisWeek = (date: Date) => {
  const today = new Date();
  const endOfWeek = addDays(today, 7);
  const checkDate = new Date(date);
  return checkDate > today && checkDate <= endOfWeek;
};

// Fonction pour obtenir les réservations par période
const getReservationsByPeriod = () => {
  if (!reservations) return { todayReservations: [], tomorrowReservations: [], thisWeekReservations: [], laterReservations: [] };

  const allReservations = [...reservations.asOwner, ...reservations.asRenter];
  
  const sortedReservations = allReservations.sort((a, b) => 
    new Date(a.start_at).getTime() - new Date(b.start_at).getTime()
  );

  return {
    todayReservations: sortedReservations.filter(res => isToday(new Date(res.start_at))),
    tomorrowReservations: sortedReservations.filter(res => isTomorrow(new Date(res.start_at))),
    thisWeekReservations: sortedReservations.filter(res => isThisWeek(new Date(res.start_at))),
    laterReservations: sortedReservations.filter(res => 
      new Date(res.start_at) > addDays(new Date(), 7)
    ),
  };
};

const { todayReservations, tomorrowReservations, thisWeekReservations, laterReservations } = getReservationsByPeriod();

  // Fonction pour déterminer la couleur d'une date en fonction des réservations
  const getDateStatus = (date: any) => {
    if (!reservations) return null;

    // Parcours des réservations en tant que propriétaire
    for (const reservation of reservations.asOwner) {
      const start = new Date(reservation.start_at);
      const end = new Date(reservation.end_at);

      // Si la date est dans la période de réservation
      if (date >= start && date <= end) {
        return reservation.state;
      }
    }

    // Parcours des réservations en tant que locataire
    for (const reservation of reservations.asRenter) {
      const start = new Date(reservation.start_at);
      const end = new Date(reservation.end_at);

      // Si la date est dans la période de réservation
      if (date >= start && date <= end) {
        return reservation.state;
      }
    }
    return null;
  };

  // Fonction pour obtenir les réservations d'une date spécifique
  const getReservationsForDate = (date: Date) => {
    if (!reservations) return [];
  
    const reservationsForDate: Reservation[] = [];
  
    // Vérifier les réservations en tant que propriétaire
    reservations.asOwner.forEach(reservation => {
      const start = new Date(reservation.start_at);
      const end = new Date(reservation.end_at);
      if (date >= start && date <= end) {
        reservationsForDate.push(reservation);
      }
    });
  
    // Vérifier les réservations en tant que locataire
    reservations.asRenter.forEach(reservation => {
      const start = new Date(reservation.start_at);
      const end = new Date(reservation.end_at);
      if (date >= start && date <= end) {
        reservationsForDate.push(reservation);
      }
    });
  
    return reservationsForDate;
  };

  return (
    <>
      <Link
        to="/"
        className="inline-flex items-center text-sm mb-6 hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour à l'accueil
      </Link>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Calendrier des réservations</CardTitle>
                  <CardDescription>
                    Visualisez toutes vos réservations
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleMonthChange("previous")}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium">
                    {format(firstDayCurrentMonth, "MMMM yyyy", { locale: fr })}
                  </span>
                  <Button variant="outline" size="icon" onClick={() => handleMonthChange("next")}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Jours de la semaine */}
              <div className="grid grid-cols-7 mb-2">
                {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(
                  (day, i) => (
                    <div
                      key={i}
                      className="text-center text-sm font-medium py-2"
                    >
                      {day}
                    </div>
                  )
                )}
              </div>

              {/* Grille du calendrier */}
              <div className="grid grid-cols-7 gap-1">
                {/* Jours vides avant le début du mois */}
                {Array.from({
                  length: (firstDayCurrentMonth.getDay() + 6) % 7,
                }).map((_, i) => (
                  <div
                    key={`empty-start-${i}`}
                    className="h-24 p-1 border border-transparent"
                  ></div>
                ))}

                {/* Jours du mois */}
                {days.map((day) => {
                  const dateStatus = getDateStatus(day);
                  const reservationsForDay = getReservationsForDate(day);

                  return (
                    <div
                      key={day.toString()}
                      className={`h-24 p-1 border rounded-md relative ${
                        isWeekend(day) ? "bg-gray-50" : ""
                      } ${
                        isSameDay(day, today)
                          ? "border-primary"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span
                          className={`text-sm ${
                            isSameDay(day, today)
                              ? "font-bold text-primary"
                              : ""
                          }`}
                        >
                          {format(day, "d")}
                        </span>

                        {dateStatus && (
                          <span
                            className={`w-3 h-3 rounded-full ${
                              dateStatus === "accepted"
                                ? "bg-green-500"
                                : dateStatus === "pending"
                                ? "bg-yellow-500"
                                : dateStatus === "canceled"
                                ? "bg-red-500"
                                : "bg-gray-500"
                            }`}
                          ></span>
                        )}
                      </div>

                      {/* Affichage des réservations du jour */}
                      <div className="mt-1 space-y-1 overflow-hidden max-h-[80%]">
                        {reservationsForDay.map((reservation) => (
                          <Link
                            key={reservation.id}
                            to={`#reservation-${reservation.id}`}
                            className={`block text-xs truncate px-1 py-0.5 rounded ${
                              reservation.state === "accepted"
                                ? "bg-green-100 text-green-800"
                                : reservation.state === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : reservation.state === "canceled"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              const element = document.getElementById(`reservation-${reservation.id}`);
                              if (element) {
                                element.scrollIntoView({ behavior: "smooth" });
                              }
                            }}
                          >
                            {reservation.item.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {/* Jours vides après la fin du mois */}
                {Array.from({
                  length:
                    (7 -
                      ((days.length +
                        ((firstDayCurrentMonth.getDay() + 6) % 7)) %
                        7)) %
                    7,
                }).map((_, i) => (
                  <div
                    key={`empty-end-${i}`}
                    className="h-24 p-1 border border-transparent"
                  ></div>
                ))}
              </div>

              {/* Légende */}
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Confirmé</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">En attente</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Terminé</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm">Annulé</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Détails des réservations</CardTitle>
                <CardDescription>
                  Gérez vos demandes de location et vos réservations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="requests">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="requests">Demandes reçues</TabsTrigger>
                    <TabsTrigger value="bookings">Mes réservations</TabsTrigger>
                  </TabsList>

                  <TabsContent value="requests" className="space-y-4">
                    {reservations?.asOwner.map((reservation) => (
                        <ReservationDetails
                          key={reservation.id}
                          reservation={reservation}
                          id={`reservation-${reservation.id}`}
                          isOwner={true}
                          onChangeState={fetchReservations}
                        />
                      ))}
                  </TabsContent>

                  <TabsContent value="bookings" className="space-y-4">
                    {reservations?.asRenter.map((reservation) => (
                        <ReservationDetails
                          key={reservation.id}
                          reservation={reservation}
                          id={`reservation-${reservation.id}`}
                          isOwner={false}
                          onChangeState={fetchReservations}
                        />
                      ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <div className="sticky top-24">
            <Card>
              <CardHeader>
                <CardTitle>Prochaines réservations</CardTitle>
                <CardDescription>Aperçu de votre planning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm">Aujourd'hui</h3>
                    {todayReservations && todayReservations.length > 0 ? (
                      todayReservations.map((reservation: Reservation) => (
                        <ReservationCard reservation={reservation} />
                      ))
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        Aucune réservation aujourd'hui
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-sm">Demain</h3>
                    {tomorrowReservations && tomorrowReservations.length > 0 ? (
                      tomorrowReservations.map((reservation: Reservation) => (
                        <ReservationCard reservation={reservation} />
                      ))
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        Aucune réservation demain
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-sm">Cette semaine</h3>
                    {thisWeekReservations && thisWeekReservations.length > 0 ? (
                      thisWeekReservations.map((reservation: Reservation) => (
                        <ReservationCard reservation={reservation} />
                      ))
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        Aucune réservation cette semaine
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium text-sm">Plus tard</h3>
                    {laterReservations && laterReservations.length > 0 ? (
                      laterReservations.map((reservation: Reservation) => (
                        <ReservationCard reservation={reservation} />
                      ))
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        Aucune réservation prévue
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <Link to="/create-item">
                    <Button className="w-full bg-primary hover:shadow">
                      Ajouter une nouvelle annonce
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

const ReservationCard = ({ reservation }: { reservation: Reservation }) => {
  return (
    <div key={reservation.id} className="rounded-lg border p-3">
      <div className="font-medium">{reservation.item.title}</div>
      <div className="text-sm text-muted-foreground">
        {reservation.tenant.first_name} {reservation.tenant.last_name}
      </div>
      <div className="text-sm flex items-center mt-1">
        <span
          className={`px-2 py-0.5 text-xs rounded-full ${
            reservation.state === "accepted"
              ? "bg-green-100 text-green-800"
              : reservation.state === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : reservation.state === "canceled"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {reservation.state === "accepted"
            ? "Confirmée"
            : reservation.state === "pending"
            ? "En attente"
            : reservation.state === "canceled"
            ? "Annulée"
            : "Terminée"}
        </span>
      </div>
    </div>
  );
};

export default ReservationsListPage;
