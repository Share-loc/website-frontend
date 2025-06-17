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
import ExistingReservationsCard from "@/components/DetailsItems/ExistingReservationsCard";
import { useAuth } from "@/components/context/AuthContext";
import apiClient from "@/service/api/apiClient";
import SEO from "@/components/SEO/SEO";

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

  const [userReservations, setUserReservations] = useState<any>();
  const reservationsList = userReservations?.asRenter?.filter((reservation: any) => reservation.item.id === Number(id)) || null;
  const { user, isAuthenticated } = useAuth();

  // Récupération des données de l'item
  const FetchItemDataInfo = async () => {
    try {
      const response = await apiClient.get(`/items/${id}`);
      const data = response.data;
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
      const response = await apiClient.get(`/reviews/user/${userId}`, {
        params: { limit: 3 },
      });
      const data = response.data;
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
      const response = await apiClient.get(`/items/user/${userId}`);
      const data = response.data;
      const currentItemId = items.id;
      const filteredItems = data.items.filter(
        (item: any) => item.id !== currentItemId
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
      const response = await apiClient.get(
        `/items/itemsProductDetailsPage`,
        {
          params: {
            categoryId: items.category.id,
            excludedUserId: userInfo.id,
          },
        }
      );
      setAllItems(response.data);
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
    }
  };

    // Récupération des réservations
    const FetchReservations = async () => {
      try {
      const response = await apiClient.get("/users/reservations");
      setUserReservations(response.data);
      } catch (error: any) {
      console.error("Erreur lors de l'appel API:", error);
      }
    };

  
    const IsActualUserItemOwner = () =>{
      if(!user || !items.user?.id) return false
      return user.id === items.user.id
    }

  useEffect(() => {
    FetchItemDataInfo();

    if (!isAuthenticated) return;
    FetchReservations();
  }, [id, isAuthenticated]);

  useEffect(() => {
    if (items?.user?.id) {
      FetchReviewsUser(items.user.id);
      FetchItemsDataForUser(items.user.id);
      FetchAllItems();
    }
  }, [items]);

  return (
    <>
      <SEO 
        title={items?.title || "Produit"}
        description={items?.body || "Découvrez ce produit sur ShareLoc"}
        keywords={`location, ${items?.title}, ${items?.category?.name}, ShareLoc`}
        canonicalUrl={`/product/${id}`}
        ogType="article"
      />
      <div className="grid grid-cols-1 grid-rows-1 sm:grid-cols-5 xl:gap-10">
        <div className="col-span-4 lg:col-span-4 xl:col-span-3 3xl:col-span-2 4xl:col-span-2">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <CircularProgress color="inherit" />
            </div>
          ) : itemPictures.length > 0 ? (
            <ProductGallery images={itemPictures} />
          ) : (
            <div className="flex justify-center items-center h-full">
              <ThumbsDown />
            </div>
          )}
        </div>
        <div className="hidden flex-col gap-5 xl:block xl:col-span-2 2xl:col-span-2 3xl:col-span-2 4xl:col-span-1 xl:flex">
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
        <h1 className="mb-4 text-xl font-bold md:text-3xl">{items.title}</h1>
        <p className="mb-4 text-gray-600">{items.body}</p>
        <div className="flex items-center mb-4">
          <FiMapPin className="mr-2 w-5 h-5 text-gray-500" />
          <span>{items.location}</span>
        </div>
        <p className="text-xl font-bold md:text-2xl">{items.price}€ / Jour</p>
      </div>
      <div className="flex flex-col gap-8 mt-8 xl:hidden lg:flex-row">
        <div className="w-6/6 h-fit">
          <SellerCard
            userInfo={userInfo}
            items={items}
            rating={rating}
            totalReviews={totalReviews}
            totalItemsUser={totalItemsUser}
          />
        </div>
        <div className="flex flex-col gap-8 w-6/6">
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
          <h2 className="mb-4 text-xl font-bold md:text-2xl">
            Récent avis de{" "}
            <span className="text-[#FEB24D]">{userInfo.username}</span>
          </h2>
          <RecentReviews reviews={reviews} />
          <a href={`/userProfile/${userInfo.id}`}>
            <Button variant="outline" className="flex mx-auto mt-4">
              Voir tous les avis
            </Button>
          </a>
        </div>
      ) : (
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold md:text-2xl">
            Récent avis de{" "}
            <span className="text-[#FEB24D]">{userInfo.username}</span>
          </h2>
          <div className="p-4 rounded-lg border">
            <div className="flex items-center mb-2 space-x-4">
              Aucun avis pour le moment
            </div>
          </div>
        </div>
      )}
      {itemsUser.length > 0 ? (
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold md:text-2xl">
            Parcourez les annonces du loueur
          </h2>
          <AllCardsItems filter={false} items={itemsUser} />
        </div>
      ) : null}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-bold md:text-2xl">
          D'autres annonces sélectionnées pour vous
        </h2>
        <AllCardsItems filter={false} items={allItems} />
      </div>
    </>
  );
};

export default ProductPage;
