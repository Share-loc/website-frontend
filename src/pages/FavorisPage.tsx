import { useEffect, useState } from "react";
import AllCardsItems from "../components/ItemsComponents/allCardsItems";
import apiClient from "@/service/api/apiClient";

const FavorisPage = () => {
    const [items, setItems] = useState<any>([]);

    const favorisItems = async () => {
      try {
        const responseFavorites = await apiClient.get(`/items/favorites`);
        setItems(responseFavorites.data);
      } catch (error) {
        console.error("Erreur lors de l'appel API:", error);
      }
    };
  
    useEffect(() => {
      favorisItems();
    }, []);
  
    return (
        <div>
            <h1 className="text-black text-lg font-bold mb-3 uppercase">Vos annonces favorites</h1>
            <div className="w-3/6 h-0.5 bg-blue mb-10"></div>
            <AllCardsItems filter={false} items={items} />
        </div>
    );
};
    
export default FavorisPage;
    