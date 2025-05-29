import apiClient from "@/service/api/apiClient";
import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const FavorisItems = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(item.isFavorite || false);
  const handleFavoriteToggle = async () => {
    try {
      if (isFavorite) {
        await apiClient.delete(`/favorites/${item.id}`);
      } else {
        await apiClient.post(`/favorites/${item.id}`);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Erreur lors de la modification des favoris:", error);
    }
  };

  return (
    <div
      className="icon-container p-1.5 bg-white/43 rounded-xl shadow-lg backdrop-blur-[6.6px] border border-white/10 bottom-1 right-3 cursor-pointer"
      onClick={handleFavoriteToggle}>
      {isFavorite ? (
        <FaHeart className="text-red-500 text-xl" />
      ) : (
        <FaRegHeart className="text-white text-xl" />
      )}
    </div>
  );
};

export default FavorisItems;