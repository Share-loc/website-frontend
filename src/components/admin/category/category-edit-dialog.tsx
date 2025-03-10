import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getToken } from "@/const/func";
import { toast } from "@/hooks/use-toast";
import { Category } from "@/types/admin/category-types";
import { Pen, Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface CategoryEditDialogProps {
  category?: Category | null;
  onCategoryEdited: () => void;
}

function CategoryEditDialog({
  category,
  onCategoryEdited,
}: CategoryEditDialogProps) {
  const [open, setOpen] = useState(false);
  const [libelle, setLibelle] = useState(category?.name);

  useEffect(() => {
    setLibelle(category?.name);
  }, [category, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = `${import.meta.env.VITE_API_URL}/categories${
      category ? `/${category.id}` : ""
    }`;
    const method = category ? "PATCH" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ name: libelle }),
    });

    if (!response.ok) {
      console.error(
        "Erreur lors de la soumission de la catégorie : ",
        response.status
      );
    } else {
      onCategoryEdited();
      setOpen(false);
      category
        ? toast({
            title: "Catégorie modifiée avec succès",
            content: "La catégorie a été modifiée avec succès",
            variant: "success",
          })
        : toast({
            title: "Catégorie ajoutée avec succès",
            content: "La catégorie a été ajoutée avec succès",
            variant: "success",
          });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {category ? (<Button variant="outline" size="sm">
          <Pen />
        </Button>) : (
            <Button>
               <Plus /> Ajouter une catégorie
            </Button>
        )}

      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{category ? "Edition de la catégorie" : "Création d'une catégorie" }</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="libelle">Libelle</Label>
            <Input
              id="libelle"
              value={libelle}
              onChange={(e) => setLibelle(e.target.value)}
            />
          </div>
          <Button type="submit">{category ? "Sauvegarder les changements" : "Enregistrer la catégorie" }</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CategoryEditDialog;
