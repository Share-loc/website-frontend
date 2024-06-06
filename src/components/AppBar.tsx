import { Link } from "react-router-dom"
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
        userid: null
      }
    )
    // delete token from local storage
    localStorage.removeItem("token")
    localStorage.removeItem("userid")
  }

  return (
    <header className="bg-white flex justify-around items-center h-16 shadow-lg">
        <Link to="/">
            <img src={Logo} alt="logo" className="lg:h-10 h-7" />
        </Link>
        <AddAdButton />
        <SearchBar />
        <nav className="">
            <ul className="flex gap-4 text-blue">
                { userState.isLogged ? 
                  <div className="flex md:gap-10 gap-0">
                    <NavButton href="/profile" text="profil">
                      <FaUser />
                    </NavButton>
                    <ActionButton onClick={handleLogout} text="deconnexion">
                      <MdOutlineLogout />
                    </ActionButton>
                  </div>
                  :
                  <NavButton href="/profile" text="connexion">
                    <FaUser />
                  </NavButton>
                }
            </ul>
        </nav>
    </header>
  )
}

export default AppBar