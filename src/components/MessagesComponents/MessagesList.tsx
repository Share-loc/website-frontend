import { formatDistanceToNow, setDefaultOptions } from "date-fns";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useRef } from "react";
import { fr } from "date-fns/locale";
import { Check, CheckCheck } from "lucide-react";
import { Conversation, Message } from "@/types/MessageTypes";

setDefaultOptions({ locale: fr });

interface MessagesListProps {
  selectedConversation: Conversation | null;
  messages: Message[];
}

function MessagesList({
  selectedConversation,
  messages,
}: MessagesListProps) {
  const messageListRef = useRef<HTMLDivElement | null>(null); // Référence pour la ScrollArea

  useEffect(() => {
    console.log("scroll to bottom");
    messageListRef.current?.scrollIntoView(false);
  }, [selectedConversation, messages]);

  return (
    <ScrollArea className="flex-1">
      <div className="flex-1 h-full p-4" ref={messageListRef}>
        {/* <Button>scroll to bottom</Button> */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.receiver.id === selectedConversation?.user_id
                ? "justify-end"
                : "justify-start"
            } mb-4`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.receiver.id === selectedConversation?.user_id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              <p>{message.content}</p>
              <span
                className={`text-xs ${
                  message.receiver.id === selectedConversation?.user_id
                    ? "text-blue-100"
                    : "text-gray-500"
                } block mt-1`}
              >
                {formatDistanceToNow(new Date(message.created_at), {
                  addSuffix: true,
                })}
              {message.receiver.id === selectedConversation?.user_id && (
                message.is_read ? <CheckCheck className="inline-block ml-1 size-4" /> : <Check className="inline-block ml-1 size-4" />
              )} 
              </span>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export default MessagesList;
