import { Link } from "react-router-dom";

const ServicesBanner = () => {
    return (
      <div className="bg-gray-50 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#3AAFAF] to-[#3AAFAF]/80 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 md:p-12 text-center md:text-left md:flex md:items-center md:justify-between">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                  Vous avez des objets qui prennent la poussière ?
                </h2>
                <p className="text-md text-white/90 mb-0">
                  Déposez une annonce gratuitement et commencez à gagner de l'argent dès aujourd'hui !
                </p>
              </div>
              <div className="md:w-1/3 text-center">
                <Link to={"/create-item"}>
                  <button className="bg-[#F8B24E] text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-[#F8B24E]/90 transition duration-300 text-md">
                    Déposer une annonce
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};
export default ServicesBanner;