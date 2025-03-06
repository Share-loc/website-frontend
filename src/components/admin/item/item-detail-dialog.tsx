import { useAdmin } from "@/components/context/AdminContext";
import { Badge } from "@/components/ui/badge";
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
import { Label } from "@/components/ui/label";
import { getToken } from "@/const/func";
import { toast } from "@/hooks/use-toast";
import { Item } from "@/types/admin/item-types";
import { CheckCircle, ExternalLink, Eye } from "lucide-react";
import { useState } from "react";

interface ItemDetailDialogProps {
  item: Item;
  onItemValidated: () => void;
}

function ItemDetailDialog({ item, onItemValidated }: ItemDetailDialogProps) {
  const [open, setOpen] = useState(false);
  const [isConfirmingValidation, setIsConfirmingValidation] = useState(false);

  const { refreshItemsCounter } = useAdmin();

  const handleValidation = (item: Item) => {
    fetch(`${import.meta.env.VITE_API_URL}/items/${item.id}/validate`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.error(
            "Erreur lors de l'approbation de l'annonce : ",
            response.status
          );
        } else {
          setOpen(false);
          setIsConfirmingValidation(false);
          toast({title: "Annonce approuvée", content: "L'annonce a bien été approuvée" , variant: "success"});
          onItemValidated();
          refreshItemsCounter();
        }
        return response;
      })
      .catch((error) =>
        console.error("Erreur lors de l'approbation de l'annonce : ", error)
      );
  };

  const detailContent = (
    <>
      <DialogHeader>
        <DialogTitle>
          {isConfirmingValidation
            ? "Valider l'annonce ?"
            : "Détails de l'annonce"}{" "}
        </DialogTitle>
        <DialogDescription>ID de l'annonce: {item.id}</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium mb-1">Vendeur</Label>
            <div className="bg-slate-50 p-3 rounded-md">
              <p className="text-sm font-medium">{item.user.username}</p>
              <p className="text-xs text-slate-500">{item.user.email}</p>
              {item.user.is_verified && (
                <Badge variant="outline" className="mt-1">
                  Vérifié
                </Badge>
              )}
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium mb-1">Catégorie</Label>
            <div className="bg-slate-50 p-3 rounded-md">
              <p className="text-sm">{item.category.name}</p>
            </div>
          </div>
        </div>
        <div>
          <Label className="text-sm font-medium mb-1">Titre</Label>
          <div className="bg-slate-50 p-3 rounded-md">
            <p className="text-sm">{item.title}</p>
          </div>
        </div>
        <div>
          <Label className="text-sm font-medium mb-1">Description</Label>
          <div className="bg-slate-50 p-3 rounded-md">
            <p className="text-sm">{item.body}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label className="text-sm font-medium mb-1">Prix</Label>
            <div className="bg-slate-50 p-3 rounded-md">
              <p className="text-sm">{item.price} €</p>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium mb-1">Localisation</Label>
            <div className="bg-slate-50 p-3 rounded-md">
              <p className="text-sm">{item.location}</p>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium mb-1">Statut</Label>
            <div className="bg-slate-50 p-3 rounded-md">
              <Badge
                variant={item.status === "approved" ? "secondary" : "default"}
              >
                {item.status === "approved" ? "Approuvé" : "En attente"}
              </Badge>
            </div>
          </div>
        </div>
        {item.show_phone && (
          <div>
            <Label className="text-sm font-medium mb-1">
              Numéro de téléphone
            </Label>
            <div className="bg-slate-50 p-3 rounded-md">
              <p className="text-sm">{item.publicPhoneNumber}</p>
            </div>
          </div>
        )}
        <div>
          <Label className="text-sm font-medium mb-1">Images</Label>
          <div className="flex gap-2 overflow-x-auto">
            {item.activeItemPictures.map((pic) => (
              <img
                key={pic.id}
                src={pic.fullPath || "/placeholder.svg"}
                alt={`Image ${pic.id}`}
                className="w-24 h-24 object-cover rounded-md"
              />
            ))}
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => setOpen(false)}>
          Fermer
        </Button>
        {item.status === "waiting_for_approval" && (
          <Button
            onClick={() => {
              setIsConfirmingValidation(true);
            }}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Valider l'annonce
          </Button>
        )}
        <a
          href={`/product/${item.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline">
            <ExternalLink className="mr-2 h-4 w-4" />
            Voir l'annonce
          </Button>
        </a>
      </DialogFooter>
    </>
  );

  const validationContent = (
    <>
      <DialogHeader>
        <DialogTitle>Valider l'annonce ?</DialogTitle>
        <DialogDescription>
          Êtes-vous sûr de vouloir valider la publication de cette annonce ?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => setIsConfirmingValidation(false)}
        >
          Annuler
        </Button>
        <Button onClick={() => handleValidation(item)}>
          Valider l'annonce
        </Button>
      </DialogFooter>
    </>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        {isConfirmingValidation ? validationContent : detailContent}
      </DialogContent>
    </Dialog>
  );
}

export default ItemDetailDialog;
