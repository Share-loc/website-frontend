import { Link } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "./context/AuthContext"
import AddAdButton from "./AddAdButton"
import SearchBar from "./SearchBar/SearchBar"
import Logo from "/logo.svg"
import NavButton from "./NavButton"
import ActionButton from "./ActionButton"
import { FaLock, FaUser } from "react-icons/fa"
import { MdOutlineLogout } from "react-icons/md";
import { HiTemplate } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6"

const AppBar = () => {
  const { userState, setUserState } = useContext(AuthContext);

  const handleLogout = () => {
    // set user state to logged out
    setUserState({
      isLogged: false,
    });
    // delete token from local storage
    localStorage.removeItem("token");
  };

  return (
    <header className="flex items-center justify-around h-16 bg-white shadow-lg">
      <Link to="/">
        <img src={Logo} alt="logo" className="lg:h-10 h-7" />
      </Link>
      <AddAdButton />
      <SearchBar />
      <nav className="">
        <ul className="flex gap-4 text-blue">
          <NavButton href="/annonces" text="Annonces">
            <HiTemplate />
          </NavButton>
          {userState.isLogged ? (
            <>
              <NavButton href="/favoris" text="Favoris">
                <FaHeart />
              </NavButton>
              <NavButton href="/messages" text="Messagerie">
                <FaMessage />
              </NavButton>
            </>
          ) : null}
          {userState.isLogged ? (
            <div className="flex gap-0 md:gap-10">
              <NavButton href="/profile" text="profil">
                <FaUser />
              </NavButton>
              <ActionButton onClick={handleLogout} text="Deconnexion">
                <MdOutlineLogout />
              </ActionButton>
            </div>
          ) : (
            <NavButton href="/profile" text="Connexion">
              <FaUser />
            </NavButton>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default AppBar;
