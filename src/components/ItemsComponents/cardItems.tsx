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
  }
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
        className="rounded-2xl bg-white shadow-lg overflow-hidden cursor-pointer transition duration-300 transform hover:scale-[1.03] hover:shadow-xl "
        key={item.id}>
        <div className="px-2 pt-2 h-1/2 relative">
          <Link to={`/product/${item.id}`}>
            <img
              className="h-full w-full object-cover rounded-xl"
              src={ import.meta.env.VITE_DOMAIN + '/' + item.activeItemPictures[0].fullPath}
              alt={item.title}
            />
          </Link>
          <FavorisItems item={item}/>
        </div>
        <Link to={`/product/${item.id}`} className="p-3 flex flex-col justify-center">
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
        </Link>
      </div>
    </>
  );
};

export default CardItems;
