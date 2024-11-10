import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { getToken } from "@/const/func";
import axios from "axios";

interface FormMessageSendProps {
  receiver_id: number
}

function FormMessageSend({ receiver_id }: FormMessageSendProps) {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ne rien faire si le message est vide
    if (!message.trim()) return;

    try {
      const token = getToken();
      await axios.post(
        `${import.meta.env.VITE_API_URL}/messages/send`,
        {
          content: message,
          receiver_id: receiver_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Réinitialiser l'input après l'envoi
      setMessage("");
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
    }
  };
  return (
    <form className="flex items-center" onSubmit={handleSubmit}>
      <Input
        className="flex-1 mr-2"
        placeholder="Saisissez votre message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit" disabled={!message.trim()}>
        Envoyer
        <Send className="h-5 w-5 mr-1" />
      </Button>
    </form>
  );
}

export default FormMessageSend;
