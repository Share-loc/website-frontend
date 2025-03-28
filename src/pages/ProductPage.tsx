import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductGallery from "@/components/DetailsItems/ProductDetailGallery";
import { FiMapPin } from "react-icons/fi";
import RecentReviews from "@/components/DetailsItems/ProductDetailReview";
import SellerCard from "@/components/DetailsItems/ProductDetailSeller";
import ReservationForm from "@/components/DetailsItems/ReservationForm";
import AllCardsItems from "@/components/ItemsComponents/allCardsItems";
import { CircularProgress } from "@mui/material";
import { Button } from "@/components/ui/button";
import { ThumbsDown } from "lucide-react";
import { getToken } from "@/const/func";
import ExistingReservationsCard from "@/components/DetailsItems/ExistingReservationsCard";

const ProductPage = () => {
  const { id } = useParams();
  const [items, setItems] = useState<any>([]);
  const [reviews, setReviews] = useState<any>([]);
  const [userInfo, setUserInfo] = useState<any>([]);
  const [itemsUser, setItemsUser] = useState<any>([]);
  const [allItems, setAllItems] = useState<any>([]);
  const [itemPictures, setItemPictures] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rating, setRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [totalItemsUser, setTotalItemsUser] = useState<number>(0);
  const [user, setUser] = useState<any>()

  const [userReservations, setUserReservations] = useState<any>();
  const reservationsList = userReservations?.asRenter?.filter((reservation: any) => reservation.item.id === Number(id)) || null;

  //Récupération de l'utilisateur connecté
  const FetchUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/personal-data`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      const data = await response.json();
      setUser(data)
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
    }
  };

  // Récupération des données de l'item
  const FetchItemDataInfo = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/items/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setItems(data);
      setItemPictures(data.itemPictures || []);
      setUserInfo(data.user);
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Récupération des avis de l'utilisateur de l'item
  const FetchReviewsUser = async (userId: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/reviews/user/${userId}?limit=3`,
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
      setReviews(data.reviews);
      setRating(data.averageRate);
      setTotalReviews(data.totalReviews);
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
    }
  };

  // Récupération des items de l'utilisateur de l'item
  const FetchItemsDataForUser = async (userId: number) => {
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
      const currentItemId = items.id;
      const filteredItems = data.items.filter(
        (items) => items.id !== currentItemId
      );
      setItemsUser(filteredItems);
      setTotalItemsUser(data.totalItems);
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
    }
  };

  // Récupération des items pour en afficher 4 aléatoirement
  const FetchAllItems = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/items/itemsProductDetailsPage?&categoryId=${
          items.category.id
        }&excludedUserId=${userInfo.id}`,
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
      setAllItems(data);
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
    }
  };

    // Récupération des réservations
    const FetchReservations = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/users/reservations`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Erreur lors de l'appel API");
        }
        const data = await response.json();
        setUserReservations(data)
      } catch (error) {
        console.error("Erreur lors de l'appel API:", error);
      }
    };

  
    const IsActualUserItemOwner = () =>{
      console.log(user)
      console.log(items)
      if(!user || !items) return false
      return user.id === items.user.id
    }

  useEffect(() => {
    FetchItemDataInfo();
    FetchReservations();
    FetchUser();
  }, [id]);

  useEffect(() => {
    if (items?.user?.id) {
      FetchReviewsUser(items.user.id);
      FetchItemsDataForUser(items.user.id);
      FetchAllItems();
    }
  }, [items]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-5 grid-rows-1 xl:gap-10">
        <div className="col-span-4 lg:col-span-4 xl:col-span-3 3xl:col-span-2 4xl:col-span-2">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <CircularProgress color="inherit" />
            </div>
          ) : itemPictures.length > 0 ? (
            <ProductGallery images={itemPictures} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <ThumbsDown />
            </div>
          )}
        </div>
        <div className="hidden xl:block xl:col-span-2 2xl:col-span-2 3xl:col-span-2 4xl:col-span-1 xl:flex gap-5 flex-col">
          <div>
            <SellerCard
              userInfo={userInfo}
              items={items}
              rating={rating}
              totalReviews={totalReviews}
              totalItemsUser={totalItemsUser}
            />
          </div>
          {reservationsList && reservationsList.length > 0 && (
            <ExistingReservationsCard
              reservations={reservationsList}
              item={items}
              onChange={FetchReservations}
            />
          )}
          {/* Partie Réservation à changer plus tard et enlèver composant calendar de shacdn */}
          {/* <ReservationForm productId={items.id} pricePerDay={50} /> */}
          {!IsActualUserItemOwner() && (
            <ReservationForm
              item={items}
              onNewReservation={FetchReservations}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col mt-8">
        <h1 className="text-xl md:text-3xl font-bold mb-4">{items.title}</h1>
        <p className="text-gray-600 mb-4">{items.body}</p>
        <div className="flex items-center mb-4">
          <FiMapPin className="w-5 h-5 mr-2 text-gray-500" />
          <span>{items.location}</span>
        </div>
        <p className="text-xl md:text-2xl font-bold">{items.price}€ / Jour</p>
      </div>
      <div className="xl:hidden flex gap-8 mt-8 flex-col lg:flex-row">
        <div className="w-6/6 h-fit">
          <SellerCard
            userInfo={userInfo}
            items={items}
            rating={rating}
            totalReviews={totalReviews}
            totalItemsUser={totalItemsUser}
          />
        </div>
        <div className="w-6/6 flex flex-col gap-8">
          {reservationsList && reservationsList.length > 0 && (
            <ExistingReservationsCard
              reservations={reservationsList}
              item={items}
              onChange={FetchReservations}
            />
          )}
          {/* Partie Réservation à changer plus tard et enlèver composant calendar de shacdn */}
          {/* <ReservationForm productId={items.id} pricePerDay={50} /> */}
          {!IsActualUserItemOwner() && (
            <ReservationForm
              item={items}
              onNewReservation={FetchReservations}
            />
          )}
        </div>
      </div>
      {reviews.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Récent avis de{" "}
            <span className="text-[#FEB24D]">{userInfo.username}</span>
          </h2>
          <RecentReviews reviews={reviews} />
          <a href={`/userProfile/${userInfo.id}`}>
            <Button variant="outline" className="mt-4 flex mx-auto">
              Voir tous les avis
            </Button>
          </a>
        </div>
      ) : (
        <div className="mt-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Récent avis de{" "}
            <span className="text-[#FEB24D]">{userInfo.username}</span>
          </h2>
          <div className="border rounded-lg p-4">
            <div className="flex items-center space-x-4 mb-2">
              Aucun avis pour le moment
            </div>
          </div>
        </div>
      )}
      {itemsUser.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Parcourez les annonces du loueur
          </h2>
          <AllCardsItems filter={false} items={itemsUser} />
        </div>
      ) : null}
      <div className="mt-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          D'autres annonces sélectionnées pour vous
        </h2>
        <AllCardsItems filter={false} items={allItems} />
      </div>
    </>
  );
};

export default ProductPage;
