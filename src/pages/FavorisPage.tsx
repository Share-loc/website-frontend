import { useEffect, useState } from "react";
import AllCardsItems from "../components/ItemsComponents/allCardsItems";

const FavorisPage = () => {
    const [items, setItems] = useState<any>([]);

    const favorisItems = async () => {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/users/personal-data`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const data = await response.json();
            const userId = data.id;
    
            const responseFavorites = await fetch(
              `${import.meta.env.VITE_API_URL}/items/favorites-items/${userId}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const favorites = await responseFavorites.json();
            setItems(favorites);
          } catch (error) {
            console.error("Erreur lors de l'appel API:", error);
          }
        }
    };
    
    useEffect(() => {
        favorisItems();
    });

    return (
        <div>
            <h1 className="text-black text-lg font-bold mb-3 uppercase">Vos annonces favorites</h1>
            <div className="w-3/6 h-0.5 bg-blue mb-10"></div>
            <AllCardsItems items={items} />
        </div>
    );
};
    
export default FavorisPage;
    