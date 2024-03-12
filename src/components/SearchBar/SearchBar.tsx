import "./SearchBar.scss"

import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchBar = () => {
  return (
    <div className="wrapper text-blue">
        <FaMagnifyingGlass className="icon" size={25} />
        <input 
        type="text" 
        id="search" 
        placeholder="Rechercher sur ..." 
        className="h-10 w-72 border-blue placeholder-blue pl-2 border-2 rounded-lg input"
        >

        </input>
    </div>
  )
}

export default SearchBar