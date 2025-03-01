import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getToken } from "@/const/func";
import { toast } from "@/hooks/use-toast";
import { Review } from "@/types/admin/review-types";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface ReviewDeleteDialogProps {
  review: Review;
  onReviewDeleted: () => void;
}

function ReviewDeleteDialog({
  review,
  onReviewDeleted,
}: ReviewDeleteDialogProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    fetch(`${import.meta.env.VITE_API_URL}/reviews/${review.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          console.error(
            "Erreur lors de la suppression de l'évaluation : ",
            response.error
          );
        } else {
            onReviewDeleted();
            setOpen(false);
            toast({title: "Évaluation supprimée avec succès", content: "L'évaluation a été supprimée avec succès", variant: "success"});
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la suppression de l'évaluation : ", error)
      );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmation de suppression</DialogTitle>
          <DialogDescription>
            Cette action ne peut pas être annulée. Cela supprimera
            définitivement l'avis de {review.reviewer.username} pour{" "}
            {review.reviewed.username}.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ReviewDeleteDialog;
