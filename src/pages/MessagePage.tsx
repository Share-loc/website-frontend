import EmptyConversations from "@/components/MessagesComponents/EmptyConversations";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getToken } from "@/const/func";
import axios from "axios";
import { useEffect, useState } from "react";
import { MoreVertical, Trash } from "lucide-react";
import { formatDistanceToNow, setDefaultOptions } from "date-fns";
import { fr } from "date-fns/locale";
import FormMessageSend from "@/components/MessagesComponents/FormMessageSend";
import MessagesList from "@/components/MessagesComponents/MessagesList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useWebSocket } from "@/components/context/WebSocketContext";
import DeleteConversationModal from "@/components/MessagesComponents/DeleteConversationModal";
import { Conversation } from "@/types/MessageTypes";

setDefaultOptions({ locale: fr });

function MessagePage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [conversationToDelete, setConversationToDelete] = useState<Conversation | null>(null);
  const { socket } = useWebSocket();

  // Récupération de l'identifiant de l'utilisateur
  // ! todo : Voir pour stocker l'identifiant de l'utilisateur dans le contexte (comme pour le token)
  const getUserId = async() => {
    const token = getToken();
    const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}/users/personal-data`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const userData = userResponse.data;
    return userData.id;
  }

  // Récupération des conversations
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
      console.error("Failed to fetch conversations", err);
    } finally {
      setLoadingConversations(false);
    }
  };

  // Récupération des conversations au chargement de la page
  useEffect(() => {
    fetchConversations();
  }, []);

  // Connexion au serveur temps réel
  useEffect(() => {
    if (!socket) return;

    const registerUser = async () => {
      const userId = await getUserId();
      socket.emit('register', userId);
    };

    registerUser();

    // Ecoute des nouveaux messages
    socket.on('newMessage', () => {
      console.log('nouveau message');
      fetchConversations();
    });

    // Retourner une fonction de nettoyage pour fermer la connexion proprement
    return () => {
      socket.off('newMessage');
    };
  }, [socket]);

  const handleDeleteClick = (conversation: Conversation) => {
    setConversationToDelete(conversation);
    setIsDeleteModalOpen(true);
  }

  const handleConfirmDelete = async () => {
    if (!conversationToDelete) return;

    try {
      const token = getToken();
      await axios.delete(`${import.meta.env.VITE_API_URL}/messages/conversations/${conversationToDelete.user_id}/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchConversations();
    } catch (err) {
      console.error("Failed to delete conversation", err);
    }
    console.log('delete conversation');
    setIsDeleteModalOpen(false);
    fetchConversations();
  }

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
                  {conversation.new_messages && (
                    <span className="mr-2 bg-blue-500 rounded-full size-2"></span>
                  )}
                  <Avatar className="w-10 h-10 mr-3 rounded-full">
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
                  <Trash className="w-4 h-4 ml-3 text-gray-400" onClick={() => handleDeleteClick(conversation)} />
                  <DeleteConversationModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                    conversationUserName={conversationToDelete?.user_username ?? ''}
                  />
                </div>
              ))}
            </ScrollArea>
          </div>

          {/* Right column - Chat interface */}
          <div className="flex flex-col flex-1">
            {selectedConversation ? (
              <>
                {/* Chat header */}
                <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
                  <div className="flex items-center">
                    <Avatar className="w-10 h-10 mr-3 rounded-full">
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
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </div>

                {/* Chat messages */}
                <MessagesList selectedConversation={selectedConversation} />

                {/* Message input */}
                <div className="p-4 bg-white border-t border-gray-200">
                  <FormMessageSend receiver_id={selectedConversation.user_id} />
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full p-4 text-center text-gray-500">
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
