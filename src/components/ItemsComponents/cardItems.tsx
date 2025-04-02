import { IoMdPerson } from "react-icons/io";
import FavorisItems from "./favorisItems";
import { FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MdOutlineCategory } from "react-icons/md";


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
        className="rounded-xl overflow-hidden shadow-md w-full transition duration-300 transform hover:scale-[1.015]"
        key={item.id}>
        {/* Cœur en haut à gauche */}
        <div className="relative w-full h-[150px] md:h-[200px]">
          <div className="absolute p-3 right-0">
            <FavorisItems item={item} />
          </div>
          <a href={`/product/${item.id}`}>
            <img
              className="h-full w-full object-cover rounded-xl"
              src={
                item.activeItemPictures[0].fullPath
              }
              alt={item.title}
            />
          </a>
        </div>
        <a href={`/product/${item.id}`}>
          <div className="px-4 py-4 flex flex-col gap-2">
          <div
className="font-semibold text-md"
style={{
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  minHeight: "48px", // Hauteur de deux lignes
}}
>
              {item.title}
            </div>
            <div className="flex items-center gap-2">
              <MdOutlineCategory className="text-sm"/>
              <div className="text-xs">
                {item.category.name}
              </div>
            </div>
            <div className="flex items-center gap-2 my-auto">
            <FiMapPin className="text-sm"/>
              <div className="text-xs">
                {item.location}
              </div>
            </div>
          </div>

          <div className="w-6/6 h-[2px] bg-[#cbcbcb] mx-4"></div>
          <div className="px-4 py-4 flex flex-col gap-3 md:gap-3 xl:gap-0 sm:flex-row lg:flex-row xl:flex-row 2xl:flex-row justify-between items-center">
            <div className="text-[#FEB24D] font-bold text-xs lg:text-md">
              {item.price}€/Jour
            </div>
            <div className="flex items-center gap-1 border border-[#cbcbcb] p-[5px] rounded-md">
              <IoMdPerson className="text-[#00000] text-xs" />  
              <label className="text-[#00000] text-xs">
                {item.user.is_pro ? "Pro" : "Particulier"}
              </label>
            </div>
          </div>
        </a>
      </div>
    </>
  );
};

export default CardItems;
