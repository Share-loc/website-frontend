import { Input } from "../ui/input";
import { FaSearch } from "react-icons/fa";

const MainBanner = () => {
    return (
      <div className="bg-cover bg-center py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundImage: "url('public/pexel-hero.jpg')" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between md:gap-10">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-xl md:text-2xl font-bold text-white mb-4">
              Partagez, Louez, Économisez avec Share Loc
            </h1>
            <p className="text-lg md:text-xl text-white mb-6">
              La plateforme qui vous permet de louer des objets près de chez vous et de rentabiliser vos biens inutilisés.
            </p>
            <button className="bg-white text-[#3AAFAF] font-bold py-3 px-6 text-md rounded-lg shadow-lg hover:bg-gray-50 transition duration-300">
              Déposer une annonce
            </button>
          </div>
          <div className="md:w-1/2 max-w-md">
            <div className="shadow-lg">
              <div className="relative">
                <Input
                    type="text"
                    placeholder="Que recherchez-vous ?"
                    className="w-full px-4 py-3 pr-12 focus:outline-none"
                />
                <button className="absolute right-0 top-0 h-full text-[#F8B24E] px-4 py-3">
                    <FaSearch />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};
  
export default MainBanner;