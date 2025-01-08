import React, { useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FavorisItems = ({ item }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const FavorieItemsUser = async () => {
    const token = localStorage.getItem("token");
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
      const isFav = favorites.some((favItem) => favItem.id === item.id);
      setIsFavorite(isFav);
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      FavorieItemsUser();
    }
  }, []);

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
