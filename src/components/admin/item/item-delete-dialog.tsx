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
import { Item } from "@/types/admin/item-types";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface ItemDeleteDialogProps {
  item: Item;
  onDeleted: () => void;
}

function ItemDeleteDialog({ item, onDeleted }: ItemDeleteDialogProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    fetch(`${import.meta.env.VITE_API_URL}/items/${item.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.error(
            "Erreur lors de la suppression de l'annonce : ",
            response.status
          );
        } else {
          onDeleted();
          setOpen(false);
          toast({
            title: "L'annonce a été supprimée avec succès",
            content: "L'annonce a été supprimée avec succès",
            variant: "success",
          });
        }
        return response;
      })
      .catch((error) =>
        console.error("Erreur lors de la suppression de l'annonce : ", error)
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
            définitivement l'annonce "{item.title}" de {item.user.username}.
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

export default ItemDeleteDialog;
