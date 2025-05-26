import { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import apiClient from "@/service/api/apiClient";
import { useAuth } from "./context/AuthContext";

interface PopupSignalementProps {
    trigger: ReactNode;
    idMessage?: string;
    idReview?: string;
    idItem?: string;
    idUser?: string;
}

function PopupSignalement({trigger, idMessage, idReview, idItem, idUser}: PopupSignalementProps) {
  const [motif, setMotif] = useState("");
  const [details, setDetails] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifier qu'au moins un des champs id est défini
    if (!idMessage && !idReview && !idUser && !idItem) {
      console.error("Au moins un identifiant doit être fourni.");
      return;
    }

    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }

    const reportData = {
      motif,
      reporter_message: details,
      message_id: idMessage,
      review_id: idReview,
      item_id: idItem,
      user_id: idUser,
    };

    try {
      await apiClient.post(`/report`, reportData);
      setOpen(false);
      setMotif("");
      setDetails("");
      toast({
        title: "Signalement envoyé",
        description: "Le signalement a bien été envoyé.",
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi du signalement", error);
      toast({
        title: "Erreur lors du signalement",
        description: "Une erreur est survenue lors de l'envoi du signalement.",
        variant: "destructive",
      });
    }
  };

  // Déterminer le titre en fonction de l'ID fourni
  let title = "Signaler un contenu";
  if (idMessage) title = "Signaler un message";
  else if (idReview) title = "Signaler un avis";
  else if (idItem) title = "Signaler un article";
  else if (idUser) title = "Signaler un utilisateur";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Veuillez choisir un motif de signalement et fournir des détails
            supplémentaires si nécessaire.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Select onValueChange={setMotif} required>
              <SelectTrigger>
                <SelectValue placeholder="Choisissez un motif" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spam">Spam</SelectItem>
                <SelectItem value="harcelement">Harcèlement</SelectItem>
                <SelectItem value="contenu_inapproprie">
                  Contenu inapproprié
                </SelectItem>
                <SelectItem value="fausse_information">
                  Fausse information
                </SelectItem>
                <SelectItem value="autre">Autre</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Détails supplémentaires (optionnel)"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button type="submit">Envoyer le signalement</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default PopupSignalement;
