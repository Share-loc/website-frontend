import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import CardItems from "../ItemsComponents/cardItems";
import { AiFillProduct } from "react-icons/ai";
import { Link } from "react-router-dom";

// Composant pour le carrousel d'items
const ItemsCarousel = ({ items }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4);
    
  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth < 640) {
            setItemsPerSlide(2);
        } else if (window.innerWidth < 769) {
            setItemsPerSlide(2);
        } else if (window.innerWidth < 1024) {
            setItemsPerSlide(3);
        } else if (window.innerWidth < 1280) {
            setItemsPerSlide(3);
        } else {
            setItemsPerSlide(4);
        }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
    
  const totalSlides = Math.ceil(items.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-3">
          <div className="flex gap-5">
            <AiFillProduct className="text-[#F8B24E] text-2xl md:text-3xl" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Nos dernières annonces
            </h2>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
              disabled={currentSlide === 0}>
              <ChevronLeft size={24} className="text-gray-700" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
              disabled={currentSlide === totalSlides - 1}>
              <ChevronRight size={24} className="text-gray-700" />
            </button>
          </div>
        </div>
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="min-w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-5">
                {items.slice(slideIndex * itemsPerSlide, slideIndex * itemsPerSlide + itemsPerSlide).map((item : any) => (
                  <CardItems key={item.id} item={item} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to={"/annonces"}>
            <button className="bg-[#F8B24E] text-white font-semibold py-3 px-6 rounded-lg shadow text-md hover:bg-[#F8B24E]/90 transition duration-300">
              Consulter d'autres annonces
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemsCarousel;
