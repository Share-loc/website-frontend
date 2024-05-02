import { Link } from "react-router-dom";
import { RiMapPinAddFill } from "react-icons/ri";

const IconButton = () => {
  
  return (
    <Link to="/adpage" className="h-10 rounded-lg flex justify-between items-center bg-orange-100 hover:bg-orange-200 text-white hover:text-gray p-3 gap-3">
        <RiMapPinAddFill size={20} />
        <p className="font-semibold lg:block hidden">
            Déposer une annonce
        </p>
    </Link>
  )
}

export default IconButton