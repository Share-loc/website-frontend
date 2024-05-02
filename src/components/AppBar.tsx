import AddAdButton from "./AddAdButton"
import SearchBar from "./SearchBar/SearchBar"
import Logo from "/logo.svg"
import NavButton from "./NavButton"
import { FaUser } from "react-icons/fa"

const AppBar = () => {
  return (
    <header className="bg-white flex justify-around items-center h-16 shadow-lg">
        <a href="/">
            <img src={Logo} alt="logo" className="lg:h-10 h-7" />
        </a>
        <AddAdButton />
        <SearchBar />
        <nav className="">
            <ul className="flex gap-4 text-blue">
                <NavButton href="/login" text="connexion">
                  <FaUser />
                </NavButton>
            </ul>
        </nav>
    </header>
  )
}

export default AppBar