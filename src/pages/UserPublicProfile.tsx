import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon, CalendarIcon } from "lucide-react";
import RecentReviews from "@/components/DetailsItems/ProductDetailReview";
import AllCardsItems from "@/components/ItemsComponents/allCardsItems";
import { Badge } from "@/components/ui/badge";
import { Cuboid } from 'lucide-react';
import { CircularProgress } from "@mui/material";

const UserPublicProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<any>([]);
  const [reviews, setReviews] = useState([]);
  const [itemsForUser, setItemsForUser] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [rating, setRating] = useState(0);
  const [displayCount, setDisplayCount] = useState<number>(10); // État pour le nombre d'éléments à afficher
  const [totalItemsUser, setTotalItemsUser] = useState<number>(0);
  const [isLoadingReviews, setIsLoadingReviews] = useState<boolean>(false); // État pour le chargement des avis
  const [isLoadingItems, setIsLoadingItems] = useState<boolean>(false); // État pour le chargement des avis

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
      setIsLoadingReviews(true); // Début du chargement
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/reviews/user/${userId}?limit=${limit}`,
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
    } finally {
      setIsLoadingReviews(false); // Fin du chargement
    }
  };

  //Récupération des annonces de l'utilisateur
  const FetchItemsDataForUser = async () => {
    try {
      setIsLoadingItems(true); // Début du chargement
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
      setItemsForUser(data.items);
      setTotalItemsUser(data.totalItems);
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
    } finally {
      setIsLoadingItems(false); // Fin du chargement
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
            <h1 className="text-2xl font-bold mb-3">{user.username}</h1>
            <Badge variant="default">
              {user.isPro ? "Professionnel" : "Particulier"}
            </Badge>
          </div>
          <div className="flex gap-5 mb-3">
            <div className="flex items-center">
              <StarIcon className="text-yellow-400 mr-1" />
              <span className="font-semibold">{rating}</span>
              <span className="text-gray-500 ml-2">({totalReviews} avis)</span>
            </div>
            <div className="flex items-center">
              <Cuboid className="text-yellow-400 mr-1" />
              <span className="font-semibold">{totalItemsUser}</span>
              <span className="text-gray-500 ml-2">annonces</span>
            </div>
          </div>
          <div className="flex items-center text-gray-500">
            <CalendarIcon className="text-yellow-400 mr-2 w-6 h-6" />
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
      <div className="mt-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#22AFAF]">
          Annonces de {user.username}
        </h2>
        {isLoadingItems ? (
          <div className="mt-10 flex items-center justify-start">
            <CircularProgress color="inherit" />
          </div>
        ) : itemsForUser.length > 0 ? (
          <AllCardsItems filter={false} items={itemsForUser} />
        ) : (
          <div className="mt-10 flex items-center justify-start">
            L'utilisateur n'a pas encore publier d'annonce
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mb-4 mt-8">
        <h2 className="text-xl md:text-2xl font-bold text-[#22AFAF]">
          Avis Reçus
        </h2>
        <div>
          <select
            id="displayCount"
            className="border rounded p-2 w-24"
            value={displayCount}
            onChange={(e) => setDisplayCount(Number(e.target.value))}>
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={0}>Tous</option>
          </select>
        </div>
      </div>
        {isLoadingReviews ? (
          <div className="mt-10 flex items-center justify-start">
            <CircularProgress color="inherit" />
          </div>
        ) : reviews.length > 0 ? (
          <RecentReviews reviews={reviews} />
        ) : (
          <div className="mt-10">
            <p>Aucun avis pour le moment</p>
          </div>
        )}
    </div>
  );
};

export default UserPublicProfile;
