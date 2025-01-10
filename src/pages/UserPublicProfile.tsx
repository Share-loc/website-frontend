import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon, CalendarIcon } from "lucide-react";
import RecentReviews from "@/components/ProductDetailReview";
import AllCardsItems from "@/components/ItemsComponents/allCardsItems";
import { Badge } from "@/components/ui/badge";

const UserPublicProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<any>([]);
  const [reviews, setReviews] = useState([]);
  const [itemsForUser, setItemsForUser] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [rating, setRating] = useState(0);
  const [displayCount, setDisplayCount] = useState<number>(10); // État pour le nombre d'éléments à afficher

  //Récupération des données de l'utilisateur
  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
    }
  };

  //Récupération des avis de l'utilisateur
  const FetchReviews = async (limit: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/reviews/user/${userId}/all?limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de l'appel API");
      }
      const data = await response.json();
      console.log(data);
      setReviews(data.reviews);
      setTotalReviews(data.totalReviews);
      setRating(data.averageRate);
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
    }
  };

  //Récupération des annonces de l'utilisateur
  const FetchItemsDataForUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/items/user/${userId}`,
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
      setItemsForUser(data);
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    FetchReviews(displayCount);
    FetchItemsDataForUser();
  }, [userId, displayCount]);

  return (
    <div className="p-2 sm:p-4">
      <div className="flex items-start mb-4">
          <Avatar className="h-20 w-20 mr-4 my-auto">
            <AvatarImage
              src={user.avatar || undefined} // Si l'avatar n'est pas défini, on ne l'affiche pas
              alt={user.username + " avatar"}
            />
            <AvatarFallback>
              {user.username ? user.username.charAt(0).toUpperCase() : ""}
            </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <h1 className="text-2xl font-bold mb-2">{user.username}</h1>
            <Badge variant="default">
                {user.isPro ? "Professionnel" : "Particulier"}
              </Badge>
          </div>
          <div className="flex items-center mb-2">
            <StarIcon className="text-yellow-400 mr-1" />
            <span className="font-semibold">{rating}</span>
            <span className="text-gray-500 ml-2">({totalReviews} avis)</span>
          </div>
          <div className="flex items-center text-gray-500">
            <CalendarIcon className="mr-2" />
            <span>
              Membre depuis{" "}
              {new Date(user.created_at).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
      {reviews.length > 0 ? (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold">Avis Reçus</h2>
          <div>
            <select
              id="displayCount"
                className="border rounded p-2 w-24"
                value={displayCount}
                onChange={(e) => setDisplayCount(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={50}>50</option>
              <option value={0}>Tous</option>
            </select>
          </div>
          </div>
          <RecentReviews reviews={reviews} />
        </div>
      ) : null}
      {itemsForUser.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Annonces de {user.username}
          </h2>
          <AllCardsItems filter={false} items={itemsForUser} />
        </div>
      ) : (
        <div>L'utilisateur n'a pas encore publier d'annonce</div>
      )}
    </div>
  );
};

export default UserPublicProfile;
