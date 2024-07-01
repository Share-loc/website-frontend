import React, { useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assurez-vous d'importer useNavigate
import { jwtDecode } from "jwt-decode";

const CardItems = ({ item }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const FavorieItemsUser = async () => {
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
        const isFav = favorites.some((favItem) => favItem.id === item.id);
        setIsFavorite(isFav);
      } catch (error) {
        console.error("Erreur lors de l'appel API:", error);
      }
    }
  };

  useEffect(() => {
    FavorieItemsUser();
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

      console.log(response);
      if (response.ok) {
        setIsFavorite(!isFavorite);
      } else {
        console.error("Erreur lors de la modification des favoris:", await response.text());
      }
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
    }
  };
  // Fonction pour gérer l'ajout aux favoris
  // const handleFavoriteAdd = () => {
  //   setIsFavorite(!isFavorite); // Bascule l'état de favori
  //   console.log("Ajouté aux favoris");
  // };

  // const AddFavorie = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       // Si le token n'existe pas, rediriger l'utilisateur vers la page de connexion
  //       navigate("/profile"); // Remplacez '/login' par le chemin de votre page de connexion
  //       return; // Arrête l'exécution de la fonction ici
  //     }
  //     handleFavoriteAdd();
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/favorites/${item.id}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log(response);
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Erreur lors de l'appel API:", error);
  //   }
  // };

  // const RemoveFavorie = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       // Si le token n'existe pas, rediriger l'utilisateur vers la page de connexion
  //       navigate("/profile"); // Remplacez '/login' par le chemin de votre page de connexion
  //       return; // Arrête l'exécution de la fonction ici
  //     }
  //     handleFavoriteAdd();
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/favorites/${item.id}`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log(response);
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Erreur lors de l'appel API:", error);
  //   }
  // };

  return (
    <>
      <style>
        {`
          .icon-container:hover .text-white {
            color: red !important; /* Changez cette couleur selon vos besoins */
            transition: all 0.3s;  
          }
            .text-white {
              transition: all 0.3s;
            }
        `}
      </style>
      <div
        className="rounded-2xl bg-white shadow-lg overflow-hidden cursor-pointer transition duration-300 transform hover:scale-[1.03] hover:shadow-xl"
        key={item.id}>
        <div className="px-2 pt-2 h-1/2 relative">
          <img
            className="h-full w-full object-cover rounded-xl"
            src={item.itemPictures[0].path}
            alt={item.title}
          />
          <div
            className="icon-container absolute p-1.5 bg-white/43 rounded-xl shadow-lg backdrop-blur-[6.6px] border border-white/10 bottom-1 right-3 cursor-pointer"
            onClick={handleFavoriteToggle}>
            {isFavorite ? (
              <FaHeart className="text-red-500 text-xl" />
            ) : (
              <FaRegHeart className="text-white text-xl" />
            )}
          </div>
        </div>
        <div className="p-3 h-1/2 flex flex-col justify-center">
          <div className="">
            <div className="">
              <label
                className="text-black text-xs font-semibold mb-2"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  minHeight: "18px", // Exemple basé sur une taille de police de 16px et un espacement des lignes de 1.5
                }}>
                {item.title}
              </label>
            </div>
            <div className="flex items-center gap-1">
              <div
                className="text-black text-xs sm:text-xs"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  minHeight: "12px", // Exemple basé sur une taille de police de 16px et un espacement des lignes de 1.5
                }}>
                <FaMapMarkerAlt />
              </div>
              <p className="text-black text-xs sm:text-xs first-letter:uppercase">
                {item.location}
              </p>
            </div>
          </div>
          <div className="w-full bg-[#BABABA] h-[2px] my-2 sm:my-3"></div>
          <div className="flex items-center justify-between">
            <div className="mb-0">
              <p className="text-blue text-sm font-bold sm:text-md">
                {item.price}€/h
              </p>
            </div>
            {item.user.is_pro && (
              <div className="flex">
                <div className="flex items-center gap-1">
                  <div className="text-black text-[0.7rem] sm:text-xs">
                    <IoMdPerson />
                  </div>
                  <p className="text-[0.7rem] text-black font-bold first-letter:uppercase sm:text-xs">
                    pro
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItems;
