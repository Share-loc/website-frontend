import { formatDistanceToNow, setDefaultOptions } from "date-fns";
import { ScrollArea } from "../ui/scroll-area";
import { useCallback, useEffect, useRef, useState } from "react";
import { getToken } from "@/const/func";
import axios from "axios";
import { fr } from "date-fns/locale";
import { useWebSocket } from "../context/WebSocketContext";
import { Check, CheckCheck } from "lucide-react";

setDefaultOptions({ locale: fr });
interface Message {
  id: number;
  sender: {
    id: number;
    username: string;
    avatar?: string | null;
  };
  receiver: {
    id: number;
    username: string;
    avatar?: string | null;
  };
  content: string;
  created_at: string;
  is_read: boolean;
}

interface Conversation {
  user_id: number;
  user_avatar?: string | null;
  user_username: string;
  last_message: string;
  last_message_created_at: string;
}

interface MessagesListProps {
  selectedConversation: Conversation | null;
}

function MessagesList({
  selectedConversation,
}: MessagesListProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const messageListRef = useRef<HTMLDivElement | null>(null); // Référence pour la ScrollArea
  const { socket } = useWebSocket();

  const fetchMessages = useCallback(async () => {
    if (!selectedConversation) return;
    try {
      const token = getToken();
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/messages/conversation/${
          selectedConversation.user_id
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(response.data);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  }, [selectedConversation]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    if (!socket) return;

    socket.on('newMessage', () => {
      console.log('nouveau message dans MessagesList');
      fetchMessages();
    });

    return () => {
      socket.off('newMessage');
    };
  }, [socket, fetchMessages]);

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
