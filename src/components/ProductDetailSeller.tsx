import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, User, Flag } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import PopupSignalement from "./PopupSignalement";

interface SellerCardProps {
  userInfo: any;
  items: any;
}

export default function SellerCard({ userInfo, items }: SellerCardProps) {
  const [rating, setRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);

  // Récupération du total des avis ainsi que de la moyenne des avis du vendeur
  const FetchReviewData = async (userId: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/reviews/user/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de l'appel API");
      }
      const data = await response.json();
      setRating(data.averageRate);
      setTotalReviews(data.totalReviews);
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.id) {
      FetchReviewData(userInfo.id);
    }
  }, [userInfo]);

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
          <div>
            <Link
              to={`/userProfile/${userInfo.id}`}
              className="hover:underline">
              <h2 className="text-2xl font-bold">{userInfo.username}</h2>
            </Link>
            <Badge variant="default">
              {userInfo.isPro ? "Professionnel" : "Particulier"}
            </Badge>
            <div className="flex items-center mt-2">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="ml-2 text-sm text-gray-600">
                {rating} ({totalReviews} avis)
              </span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button className="w-full">
          <MessageSquare className="mr-2 h-4 w-4" /> Contacter le vendeur
        </Button>
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
