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
    <div className="p-4 bg-white border-t border-gray-200">
      <form className="flex items-center" onSubmit={handleSubmit}>
        <Input
          className="flex-1 mr-2 text-sm sm:text-base"
          placeholder="Saisissez votre message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          type="submit"
          size="sm"
          className="px-2 sm:px-4"
          disabled={!message.trim()}
        >
          <span className="hidden sm:inline">Envoyer</span>
          <Send className="w-4 h-4 mr-1 sm:h-5 sm:w-5" />
        </Button>
      </form>
    </div>
  );
}

export default FormMessageSend;
