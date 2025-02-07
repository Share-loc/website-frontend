import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { ReactNode, useState } from "react";

interface SendMessageModalProps {
  trigger: ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSend: (message: string) => void;
  recipientName: string;
}

function SendMessageModal({
  trigger,
  isOpen,
  onOpenChange,
  onSend,
  recipientName,
}: SendMessageModalProps) {
    const [message, setMessage] = useState('')

    const handleSend = () => {
        if (!message.trim()) return
        onSend(message)
        setMessage('')
    }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Envoyer un message à {recipientName}</DialogTitle>
          <DialogDescription>
            Écrivez votre message ci-dessous. Soyez clair et concis pour une meilleure communication.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="message">Votre message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Écrivez votre message ici..."
              className="h-32"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button type="button" onClick={handleSend} disabled={!message.trim()}>
            Envoyer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SendMessageModal