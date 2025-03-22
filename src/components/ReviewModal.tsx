import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { getToken } from "@/const/func";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";

function ReviewModal({ children, reservationId, userReviewedId, onReviewSubmitted} : { children: ReactNode, reservationId: number, userReviewedId: number, onReviewSubmitted: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

  const handleSendReview = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            reviewed: userReviewedId,
            rate: rating,
            content: message,
            reservation: reservationId,
          }),
        }
      );
      setIsOpen(false);

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi de l'évaluation");
      }
      toast({
        title: "Message envoyé",
        description: "Votre évaluation a été envoyé avec succès",
        variant: "success",
      });
      onReviewSubmitted();
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
      toast({
        title: "Erreur lors de l'envoie",
        description: "Votre évaluation n'a pas pu être envoyé",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Laisser un avis</DialogTitle>
          <DialogDescription>
            {/* Partagez votre expérience avec {reservation.userName} pour la
            location de "{reservation.itemName}". */}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-4">
            <div className="text-sm font-medium mb-2">Note</div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={cn(
                    "text-2xl focus:outline-none transition-colors",
                    hoveredRating >= star || rating >= star
                      ? "text-primary"
                      : "text-gray-300 hover:text-primary"
                  )}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Commentaire</div>
            <Textarea
              placeholder="Partagez votre expérience..."
              className="min-h-[100px]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Annuler
          </Button>
          <Button onClick={handleSendReview}>Publier l'avis</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ReviewModal;
