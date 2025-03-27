import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FavorisItems = ({ item }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(item.isFavorite || false);
  const handleFavoriteToggle = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/profile");
        return;
      }

      const method = isFavorite ? "DELETE" : "POST";
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/favorites/${item.id}`,
        {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setIsFavorite(!isFavorite);
      } else {
        console.error(
          "Erreur lors de la modification des favoris:",
          await response.text()
        );
      }
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
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