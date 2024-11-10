import EmptyConversations from "@/components/MessagesComponents/EmptyConversations";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getToken } from "@/const/func";
import axios from "axios";
import { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";
import { formatDistanceToNow, setDefaultOptions } from "date-fns";
import { fr } from "date-fns/locale";
import FormMessageSend from "@/components/MessagesComponents/FormMessageSend";
import MessagesList from "@/components/MessagesComponents/MessagesList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

setDefaultOptions({ locale: fr });

interface Conversation {
  user_id: number;
  user_avatar?: string | null;
  user_username: string;
  last_message: string;
  last_message_created_at: string;
}

function MessagePage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = getToken();
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/messages/conversations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setConversations(response.data);
      } catch (err) {
      } finally {
        setLoadingConversations(false);
      }
    };

    fetchConversations();
  }, []);

  if (loadingConversations) {
    return <Spinner />;
  }

  return (
    <>
      {conversations.length === 0 ? (
        <EmptyConversations />
      ) : (
        <div className="flex h-[calc(100vh-120px)] bg-gray-100 shadow">
          {/* Left column - Conversation list */}
          <div className="w-1/3 bg-white border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Conversations</h2>
            </div>
            <ScrollArea className="h-[calc(100vh-5rem)]">
              {conversations.map((conversation) => (
                <div
                  key={conversation.user_id}
                  className={`flex items-center p-4 hover:bg-gray-50 ${
                    conversation.user_id === selectedConversation?.user_id
                      ? "bg-gray-200"
                      : ""
                  } cursor-pointer`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <Avatar className="w-10 h-10 rounded-full mr-3">
                    <AvatarImage src={conversation.user_avatar ?? ""} />
                    <AvatarFallback>
                      {conversation.user_username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {conversation.user_username}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {conversation.last_message}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {formatDistanceToNow(
                      new Date(conversation.last_message_created_at),
                      { addSuffix: true }
                    )}
                  </span>
                </div>
              ))}
            </ScrollArea>
          </div>

          {/* Right column - Chat interface */}
          <div className="flex-1 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
                  <div className="flex items-center">
                    <Avatar className="w-10 h-10 rounded-full mr-3">
                      <AvatarImage
                        src={selectedConversation.user_avatar ?? ""}
                      />
                      <AvatarFallback>
                        {selectedConversation.user_username
                          .substring(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-lg font-semibold">
                      {selectedConversation.user_username}
                    </h2>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>

                {/* Chat messages */}
                <MessagesList selectedConversation={selectedConversation} />

                {/* Message input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <FormMessageSend receiver_id={selectedConversation.user_id} />
                </div>
              </>
            ) : (
              <div className="p-4 text-center h-full text-gray-500 flex items-center justify-center">
                Sélectionnez une conversation
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default MessagePage;
