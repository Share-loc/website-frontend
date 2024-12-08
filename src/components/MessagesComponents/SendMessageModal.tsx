import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { useState } from "react"

interface SendMessageModalProps {
    isOpen: boolean
    onClose: () => void
    onSend: (message: string) => void
    recipientName: string
}

function SendMessageModal({
    isOpen,
    onClose,
    onSend,
    recipientName
}: SendMessageModalProps) {
    const [message, setMessage] = useState('')

    const handleSend = () => {
        if (!message.trim()) return
        onSend(message)
        setMessage('')
    }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
          <Button type="button" variant="secondary" onClick={onClose}>
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