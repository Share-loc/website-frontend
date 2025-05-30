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
import { toast } from "@/hooks/use-toast";
import apiClient from "@/service/api/apiClient";
import { Category } from "@/types/admin/category-types";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface CategoryDeleteDialogProps {
  category: Category;
  onCategoryDeleted: () => void;
}

function CategoryDeleteDialog({
  category,
  onCategoryDeleted,
}: CategoryDeleteDialogProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/categories/${category.id}`);
      onCategoryDeleted();
      toast({
        title: "Catégorie supprimée avec succès",
        description: "La catégorie a été supprimée avec succès",
        variant: "success",
      });
      setOpen(false);
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie : ", error);
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
            Voulez vous vraiment supprimer la catégorie{" "}
            <span className="font-bold">{category.name}</span> ?
            <br />
            Cette action est irréversible.
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

export default CategoryDeleteDialog;
