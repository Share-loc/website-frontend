import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, User, Flag } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import PopupSignalement from "../PopupSignalement";
import SendMessageModal from "../MessagesComponents/SendMessageModal";
import { useToast } from "@/hooks/use-toast";
import { Cuboid } from 'lucide-react';
import { ToastAction } from "@/components/ui/toast";

interface SellerCardProps {
  userInfo: any;
  items: any;
  rating: number;
  totalReviews: number;
  totalItemsUser: number;
}

export default function SellerCard({ userInfo, items, rating, totalReviews, totalItemsUser }: SellerCardProps) {
  const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (message: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Connectez-vous",
        description: "Vous devez être connecté pour envoyé un message !",
        action: (
          <Link to={`/profile`}>
            <ToastAction altText="connexion">Connexion</ToastAction>
          </Link>
        ),
      });
      setIsSendMessageModalOpen(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/messages/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            receiver_id: userInfo.id,
            content: message,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du message");
      }

      setIsSendMessageModalOpen(false);
      toast({
        title: "Message envoyé",
        description: "Votre message a été envoyé avec succès",
      });
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
      toast({
        title: "Erreur lors de l'envoie",
        description: "Votre message n'a pas pu être envoyé",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="h-full flex flex-col justify-evenly">
      <CardHeader>
        <CardTitle className="flex gap-4">
          <Link to={`/userProfile/${userInfo.id}`}>
            <Avatar className="w-16 h-16">
              <AvatarImage
                src={userInfo.avatar || undefined} // Si l'avatar n'est pas défini, on ne l'affiche pas
                alt={userInfo.username + " avatar"}
              />
              <AvatarFallback>
                {userInfo.username
                  ? userInfo.username.charAt(0).toUpperCase()
                  : ""}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="w-full">
            <Link
              to={`/userProfile/${userInfo.id}`}
              className="hover:underline">
              <h2 className="text-2xl font-bold">{userInfo.username}</h2>
            </Link>
            <Badge variant="default">
              {userInfo.isPro ? "Professionnel" : "Particulier"}
            </Badge>
            <div className="w-full flex mt-3 gap-6 md:flex-col  md:gap-3 lg:gap-6 lg:flex-row">
              <div className="flex items-center">
                <Star className="w-6 h-6 text-yellow-400 mr-1" />
                <span className="ml-2 text-sm text-gray-600">
                  {rating} ({totalReviews} avis)
                </span>
              </div>
              <div className="flex items-center">
                <Cuboid className="w-6 h-6 text-yellow-400 mr-1" />
                <span className="ml-2 text-sm text-gray-600">
                  {totalItemsUser} annonces
                </span>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <SendMessageModal
          trigger={
            <Button className="w-full">
              <MessageSquare className="mr-2 h-4 w-4" /> Contacter le vendeur
            </Button>
          }
          isOpen={isSendMessageModalOpen}
          onOpenChange={(open) => {
            if (open) {
              // Vérification du token au moment de l'ouverture
              const token = localStorage.getItem("token");
              if (!token) {
                toast({
                  title: "Connectez-vous",
                  description:
                    "Vous devez être connecté pour envoyer un message !",
                  action: (
                    <Link to={`/profile`}>
                      <ToastAction altText="connexion">Connexion</ToastAction>
                    </Link>
                  ),
                });
                // Empêche l'ouverture de la modal
                setIsSendMessageModalOpen(false);
                return;
              }
            }
            // Met à jour l'état en fonction de la valeur reçue
            setIsSendMessageModalOpen(open);
          }}
          recipientName={userInfo.username}
          onSend={handleSendMessage}
        />
        <div className="w-full">
          <Link to={`/userProfile/${userInfo.id}`}>
            <Button variant="outline" className="w-full">
              <User className="mr-2 h-4 w-4" /> Voir le profil
            </Button>
          </Link>
        </div>
        <PopupSignalement
          trigger={
            <Button
              variant="ghost"
              className="text-red-500 hover:text-red-700 hover:bg-[#F4F4F5] w-full">
              <Flag className="mr-2 h-4 w-4" /> Signaler
            </Button>
          }
          idItem={items.id}
          idUser={userInfo.id}
        />
      </CardContent>
    </Card>
  );
}
