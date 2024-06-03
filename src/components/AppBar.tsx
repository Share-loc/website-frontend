import { useContext } from "react"
import AuthContext from "./context/AuthContext"
import AddAdButton from "./AddAdButton"
import SearchBar from "./SearchBar/SearchBar"
import Logo from "/logo.svg"
import NavButton from "./NavButton"
import ActionButton from "./ActionButton"
import { FaUser } from "react-icons/fa"
import { MdOutlineLogout } from "react-icons/md";

const AppBar = () => {

  const { userState, setUserState } = useContext(AuthContext)

  const handleLogout = () => {
    // set user state to logged out
    setUserState(
      {
        isLogged: false,
        username: ""
      }
    )
    // delete token from local storage
    localStorage.removeItem("token")
  }

  return (
    <header className="bg-white flex justify-around items-center h-16 shadow-lg">
        <a href="/">
            <img src={Logo} alt="logo" className="lg:h-10 h-7" />
        </a>
        <AddAdButton />
        <SearchBar />
        <nav className="">
            <ul className="flex gap-4 text-blue">
                { userState.isLogged ? 
                  <ActionButton onClick={handleLogout} text="deconnexion">
                    <MdOutlineLogout />
                  </ActionButton>
                  :
                  <NavButton href="/login" text="connexion">
                    <FaUser />
                  </NavButton>
                }
            </ul>
        </nav>
    </header>
  )
}

export default AppBar