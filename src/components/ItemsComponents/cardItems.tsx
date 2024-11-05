import { useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState } from "react";
import FavorisItems from "./favorisItems";
import { Link } from "react-router-dom";

interface CardItemsProps {
  item: {
    id: number;
    title: string;
    location: string;
    price: number;
    user: {
      is_pro: boolean;
    };
    activeItemPictures: {
      path: string;
      fullPath: string;
    }[];
  };
}

const CardItems = ({ item }: CardItemsProps) => {
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
        className="rounded-xl overflow-hidden shadow-lg w-full transition duration-300 transform hover:scale-[1.015] hover:shadow-xl"
        key={item.id}>
        {/* Cœur en haut à gauche */}
        <div className="relative w-full h-[150px] md:h-[200px]">
          <div className="absolute p-3 right-0">
            <FavorisItems item={item} />
          </div>
          <Link to={`/product/${item.id}`}>
            <img
              className="h-full w-full object-cover rounded-xl"
              src={
                import.meta.env.VITE_URL_BACK_END +
                "/" +
                item.activeItemPictures[0].fullPath
              }
              alt={item.title}
            />
          </Link>
        </div>
        <Link to={`/product/${item.id}`}>
          <div className="px-4 py-4">
            <div
              className="font-semibold text-lg mb-2"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                minHeight: "18px",
              }}>
              {item.title}
            </div>
            <div className="text-sm flex items-center gap-2">
              <FaMapMarkerAlt className="flex-shrink-0" />
              <div
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  minHeight: "18px",
                }}>
                {item.location}
              </div>
            </div>
          </div>
          <div className="w-6/6 h-[2px] bg-[#cbcbcb] mx-4"></div>
          <div className="px-4 py-4 flex flex-col md:flex-col lg:flex-col xl:flex-row 2xl:flex-row justify-between items-center gap-4">
            <div className="text-[#22AFAF] font-bold text-sm lg:text-md">
              {item.price}€/heure
            </div>
            <div className="flex items-center gap-2 border border-[#cbcbcb] p-[5px] rounded-md">
              <IoMdPerson className="text-[#cbcbcb] text-xs" />
              <label className="text-[#cbcbcb] text-xs">
                {item.user.is_pro ? "Professionnel" : "Particulier"}
              </label>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default CardItems;
