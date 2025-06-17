import { useEffect, useState } from "react";
import AllCardsItems from "../components/ItemsComponents/allCardsItems";
import apiClient from "@/service/api/apiClient";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RiMapPinAddFill } from "react-icons/ri";
import NoDataImage from "/no-data.jpg";
import SEO from "@/components/SEO/SEO";

const FavorisPage = () => {
    const [items, setItems] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);

    const favorisItems = async () => {
      try {
        const responseFavorites = await apiClient.get(`/items/favorites`);
        setItems(responseFavorites.data);
      } catch (error) {
        console.error("Erreur lors de l'appel API:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      favorisItems();
    }, []);

    //Composant pour liste vide
    const EmptyFavorites = () => (
      <div className="flex flex-col gap-6 justify-center items-center my-10">
        <img
          src={NoDataImage}
          alt="Illustration favoris vides"
          className="w-[500px]"
        />
        <h1 className="text-xl font-semibold text-center">
          Oups, il semblerait que vous n'ayez pas encore de favoris
        </h1>
        <p className="text-sm font-light text-slate-600 max-w-[700px] text-center">
          Découvrez les annonces disponibles sur Share'Loc et ajoutez vos objets préférés 
          à votre liste de favoris en cliquant sur le cœur. Vous pourrez ainsi les retrouver 
          facilement ici !
        </p>
        <Link to={"/annonces"}>
          <Button>
            <RiMapPinAddFill size={20} />
            Parcourir les annonces
          </Button>
        </Link>
      </div>
    );

    if (isLoading) {
      return <div>Chargement ...</div>
    }
  
    return (
        <>
          <SEO 
            title="Favoris"
            description="Retrouvez tous vos produits favoris sur ShareLoc"
            keywords="favoris, produits favoris, location, ShareLoc"
            canonicalUrl="/favoris"
          />
          {items.length === 0 ? (
            <EmptyFavorites />
          ) : (
            <div>
              <h1 className="mb-3 text-lg font-bold text-black uppercase">Vos annonces favorites</h1>
              <div className="w-3/6 h-0.5 bg-blue mb-10"></div>
              <AllCardsItems filter={false} items={items} />
            </div>
          )}
        </>
    );
};
    
export default FavorisPage;
    