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
import apiClient from "@/service/api/apiClient";
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

  const handleDelete = async () => {
    try {
      const response = await apiClient.delete(`/reviews/${review.id}`);
      if (response.data?.error) {
        console.error(
          "Erreur lors de la suppression de l'évaluation : ",
          response.data.error
        );
      } else {
        onReviewDeleted();
        setOpen(false);
        toast({
          title: "Évaluation supprimée avec succès",
          description: "L'évaluation a été supprimée avec succès",
          variant: "success",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'évaluation : ", error);
    }
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
