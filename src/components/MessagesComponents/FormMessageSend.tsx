import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

interface FormMessageSendProps {
  onSendMessage: (message: string) => void;
}

function FormMessageSend({ onSendMessage }: FormMessageSendProps) {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage("");
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
        <Send className="w-5 h-5 mr-1" />
      </Button>
    </form>
  );
}

export default FormMessageSend;
