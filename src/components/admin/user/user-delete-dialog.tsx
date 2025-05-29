"use client";

import { useState } from "react";
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
import { User } from "@/types/admin/user-types";
import { Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import apiClient from "@/service/api/apiClient";

interface UserDeleteDialogProps {
  user: User;
  onUserDeleted: () => void;
}

export function UserDeleteDialog({ user, onUserDeleted }: UserDeleteDialogProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/users/${user.id}`);
      onUserDeleted();
      toast({ title: "Utilisateur supprimé avec succès", description: "L'utilisateur a été supprimé avec succès" });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur : ", error);
    }
    setOpen(false);
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
            Voulez vous vraiment supprimer l'utilisateur{" "}
            <span className="font-bold">{user.username}</span> ?
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
