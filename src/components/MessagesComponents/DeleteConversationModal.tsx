import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

interface DeleteConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  conversationUserName: string;
}

function DeleteConversationModal({
  isOpen,
  onClose,
  onConfirm,
  conversationUserName,
}: DeleteConversationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-8">
        <DialogHeader>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogDescription className="py-3">
            Êtes-vous sûr de vouloir supprimer la conversation avec "{conversationUserName}" ? Cette action est irréversible.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-3 sm:justify-start">
          <Button type="button" variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button type="button" variant="destructive" onClick={onConfirm}>
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteConversationModal