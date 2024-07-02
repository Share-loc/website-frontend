import "./SearchBar.scss"

import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchBar = () => {
  return (
    <div className="wrapper text-blue">
        <FaMagnifyingGlass className="icon" size={25} />
        <input
          type="text" 
          id="search" 
          placeholder="" 
          className="h-10 lg:w-72 sm:w-52 w-16 border-blue placeholder-blue pl-2 border-2 rounded-lg input"
        />
    </div>
  )
}

export default SearchBar;