import EmptyConversations from "@/components/MessagesComponents/EmptyConversations";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, Flag, Trash } from "lucide-react";
import { format, setDefaultOptions } from "date-fns";
import { fr } from "date-fns/locale";
import FormMessageSend from "@/components/MessagesComponents/FormMessageSend";
import MessagesList from "@/components/MessagesComponents/MessagesList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useWebSocket } from "@/components/context/WebSocketContext";
import DeleteConversationModal from "@/components/MessagesComponents/DeleteConversationModal";
import { Conversation, Message } from "@/types/MessageTypes";
import PopupSignalement from "@/components/PopupSignalement";
import apiClient from "@/service/api/apiClient";
import { useAuth } from "@/components/context/AuthContext";

setDefaultOptions({ locale: fr });

function MessagePage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [conversationToDelete, setConversationToDelete] = useState<Conversation | null>(null);
  const { socket } = useWebSocket();
  const [activeView, setActiveView] = useState('conversations');
  const { user } = useAuth();

  // Récupération des conversations
  const fetchConversations = async () => {
    try {
      const response = await apiClient.get('/messages/conversations')
      setConversations(response.data);
    } catch (err) {
      console.error("Failed to fetch conversations", err);
    } finally {
      setLoadingConversations(false);
    }
  };

  const fetchMessages = useCallback(async () => {
    if (!selectedConversation) return;
    try {
      const response = await apiClient.get(`/messages/conversation/${selectedConversation.user_id}`);
      setMessages(response.data);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  }, [selectedConversation]);

  const handleSendMessage = async (content: string) => {
    if (!selectedConversation) return;

    try {
      await apiClient.post(`/messages/send`,
        {
          content: content,
          receiver_id: selectedConversation.user_id,
        },
      );
      fetchMessages();
      fetchConversations();
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
    }
  }

  // Récupération des conversations au chargement de la page
  useEffect(() => {
    fetchConversations();
    fetchMessages();
  }, [fetchMessages]);

  // Connexion au serveur temps réel
  useEffect(() => {
    if (!socket) return;

    const registerUser = async () => {
      socket.emit('register', user?.id);
    };

    registerUser();

    // Ecoute des nouveaux messages
    socket.on('newMessage', () => {
      console.log('nouveau message');
      fetchConversations();
      fetchMessages();
    });

    // Retourner une fonction de nettoyage pour fermer la connexion proprement
    return () => {
      socket.off('newMessage');
    };
  }, [socket, fetchMessages]);

  const handleConversationClick = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setActiveView('messages');
  }

  const handleBackClick = () => {
    setSelectedConversation(null);
    setActiveView('conversations');
  }

  const handleDeleteClick = (conversation: Conversation) => {
    setConversationToDelete(conversation);
    setIsDeleteModalOpen(true);
  }

  const handleConfirmDelete = async () => {
    if (!conversationToDelete) return;

    try {
      await apiClient.delete(`/messages/conversations/${conversationToDelete.user_id}/delete`);
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
          <div
            className={`w-full lg:w-1/3 bg-white border-r border-gray-200 ${
              activeView === "messages" ? "hidden lg:block" : ""
            }`}
          >
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Conversations</h2>
            </div>
            <ScrollArea className="h-[calc(100%-73px)]">
              {conversations
                .sort((a, b) => b.last_message_created_at.localeCompare(a.last_message_created_at))
                .map((conversation) => (
                <div
                  key={conversation.user_id}
                  className={`flex items-center p-4 hover:bg-gray-50 ${
                    conversation.user_id === selectedConversation?.user_id
                      ? "bg-gray-200"
                      : ""
                  } cursor-pointer`}
                  onClick={() => handleConversationClick(conversation)}
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
                  <span className="text-xs text-gray-400 truncate">
                    {format(
                      new Date(conversation.last_message_created_at),
                      "dd/MM"
                    )}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(conversation);
                    }}
                  >
                    <Trash className="size-4" />
                  </Button>
                </div>
              ))}
              <DeleteConversationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                conversationUserName={conversationToDelete?.user_username ?? ""}
              />
            </ScrollArea>
          </div>

          {/* Right column - Chat interface */}
          <div
            className={`flex flex-col flex-1 ${
              activeView === "conversations" ? "hidden lg:flex" : ""
            }`}
          >
            {selectedConversation ? (
              <>
                {/* Chat header */}
                <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mr-4 lg:hidden"
                      onClick={handleBackClick}
                    >
                      <ArrowLeft className="size-4" />
                      <span>Retour</span>
                    </Button>
                    <Avatar className="hidden sm:block w-10 h-10 mr-3 rounded-full">
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
                  
                  <PopupSignalement
                    trigger={
                      <Button variant={"ghost"}>
                        <Flag className="w-4 h-4 mr-2" />
                        <span className="hidden sm:block">Signaler</span>
                      </Button>
                    }
                    idUser={selectedConversation.user_id.toString()}
                  />
                </div>

                {/* Chat messages */}
                <MessagesList
                  selectedConversation={selectedConversation}
                  messages={messages}
                />

                {/* Message input */}
                <FormMessageSend onSendMessage={handleSendMessage} />
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
