import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "./ui/button";
import { MessageSquare, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import SendMessageModal from "./MessagesComponents/SendMessageModal";
import { useState } from "react";
import ReviewModal from "./ReviewModal";
import apiClient from "@/service/api/apiClient";

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
  state: "pending" | "accepted" | "canceled" | "refused";
  created_at: string;
  canceled_at: string | null;
  reviews: Array<{
    reviewer: {
      id: number;
    };
    reviewed: {
      id: number;
    };
  }>;
}

function ReservationDetails({
  id,
  reservation,
  isOwner,
  onChangeState,
}: {
  id: string;
  reservation: Reservation;
  isOwner: boolean;
  onChangeState: () => void;
}) {
  const [IsSendMessageModalOpen, setIsSendMessageModalOpen] = useState(false);

  const formatDateRange = (startStr: string, endStr: string) => {
    const start = new Date(startStr);
    const end = new Date(endStr);

    if (start.toDateString() === end.toDateString()) {
      return format(start, "dd MMMM yyyy", { locale: fr });
    }
    return `Du ${format(start, "dd")} au ${format(end, "dd MMMM yyyy", {
      locale: fr,
    })}`;
  };

  const handleChangeState = async (
    state: "accepted" | "refused" | "canceled"
  ) => {
    try {
      await apiClient.put(
        `/reservations/${reservation.id}`,
        { state }
      );
      onChangeState();
      toast({
        title: "Etat de la réservation modifié avec succès",
        description: "L'état de la réservation a été modifié avec succès",
        variant: "success",
      });
    } catch (error) {
      console.error(
        "An error occurred while fetching reservations data",
        error
      );
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la réservation",
        variant: "destructive",
      });
    }
  };

  const handleSendMessage = async (message: string) => {
    try {
      await apiClient.post("/messages/send", {
        receiver_id: isOwner
          ? reservation.tenant.id
          : reservation.item.user.id,
        content: message,
      });

      setIsSendMessageModalOpen(false);
      toast({
        title: "Message envoyé",
        description: "Votre message a été envoyé avec succès",
        variant: "success",
      });
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
      toast({
        title: "Erreur lors de l'envoi",
        description: "Votre message n'a pas pu être envoyé",
        variant: "destructive",
      });
    }
  };

  const hasAlreadyReviewed = () => {
    if (!reservation.reviews || reservation.reviews.length === 0) return false;

    return reservation.reviews.some(
      (review) =>
        review.reviewer.id === reservation.item.user.id ||
        review.reviewer.id === reservation.tenant.id
    );
  };

  return (
    <div
      id={id}
      className={`rounded-lg border p-4 ${
        reservation.state === "pending" || reservation.state === "accepted"
          ? "bg-muted/50"
          : ""
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-medium">{reservation.item.title}</h4>
          <div className="text-sm text-muted-foreground">
            {isOwner
              ? `Demande de ${reservation.tenant.username}`
              : `Loué à ${reservation.item.user.username}`}
          </div>
          <div className="text-sm">
            {formatDateRange(reservation.start_at, reservation.end_at)}
          </div>
        </div>
        <div>
          {reservation.state === "pending" && isOwner ? (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="text-red-500 border-red-500 hover:bg-red-50"
                onClick={() => handleChangeState("refused")}
              >
                Refuser
              </Button>
              <Button
                size="sm"
                className="bg-[#2e7d32] hover:bg-[#1b5e20]"
                onClick={() => handleChangeState("accepted")}
              >
                Accepter
              </Button>
            </div>
          ) : (
            <div
              className={`px-2 py-1 text-xs rounded-full ${
                reservation.state === "accepted"
                  ? "bg-green-100 text-green-800"
                  : reservation.state === "pending"
                  ? "bg-gray-100 text-gray-800"
                  : reservation.state === "canceled"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {reservation.state === "accepted"
                ? "Confirmé"
                : reservation.state === "pending"
                ? "En attente"
                : reservation.state === "canceled"
                ? "Annulé"
                : "Refusé"}
            </div>
          )}
        </div>
      </div>

      {/* <div className="text-sm text-muted-foreground mb-4">
        "{reservation.message}"
      </div> */}

      {reservation.state === "accepted" && (
        // || reservation.state === "completed"
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <span className="font-medium">Contact :</span>{" "}
              {isOwner
                ? reservation.tenant.username
                : reservation.item.user.username}
            </div>
            <div className="flex gap-2">
              <SendMessageModal
                isOpen={IsSendMessageModalOpen}
                onOpenChange={setIsSendMessageModalOpen}
                onSend={handleSendMessage}
                recipientName={
                  isOwner
                    ? reservation.tenant.username
                    : reservation.item.user.username
                }
                trigger={
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Contacter</span>
                  </Button>
                }
              ></SendMessageModal>

              {/* todo : add restriction if already reviewed  */}
              {reservation.state === "accepted" &&
                new Date(reservation.end_at) < new Date() && (
                  <ReviewModal
                    reservationId={reservation.id}
                    userReviewedId={
                      isOwner ? reservation.tenant.id : reservation.item.user.id
                    }
                    onReviewSubmitted={() => onChangeState()}
                  >
                    <Button
                      size="sm"
                      className="flex items-center gap-1"
                      disabled={hasAlreadyReviewed()}
                      title={
                        hasAlreadyReviewed()
                          ? "Vous avez déjà laissé un avis"
                          : ""
                      }
                    >
                      <Star className="h-4 w-4" />
                      <span>Laisser un avis</span>
                    </Button>
                  </ReviewModal>
                )}
            </div>
          </div>

          {/* {reservation.address && (
            <div className="mt-2 text-sm">
              <span className="font-medium">Adresse :</span>{" "}
              {reservation.address}
            </div>
          )} */}
        </div>
      )}

      {reservation.state === "pending" && !isOwner && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            size="sm"
            variant="outline"
            className="text-red-500 border-red-500 hover:bg-red-50"
            onClick={() => handleChangeState("canceled")}
          >
            Annuler la demande
          </Button>
        </div>
      )}
    </div>
  );
}

export default ReservationDetails;
