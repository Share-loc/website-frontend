import AddAdButton from "./AddAdButton"
import SearchBar from "./SearchBar/SearchBar"
import Logo from "/logo.svg"

const AppBar = () => {
  return (
    <header className="bg-white flex justify-around items-center h-16 shadow-lg">
        <h1>
            <img src={Logo} alt="logo" className="h-12" />
        </h1>
        <AddAdButton />
        <SearchBar />
        <nav>
            <ul className="flex gap-4 text-blue">
                <li><a href="/">Mes favoris</a></li>
                <li><a href="/">Messagerie</a></li>
                <li><a href="/">Mon compte</a></li>
            </ul>
        </nav>
    </header>
  )
}

export default AppBar