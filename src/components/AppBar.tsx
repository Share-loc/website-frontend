import { Link, Navigate } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "./context/AuthContext"
import Logo from "/Logo-share-loc.svg"
import { Input } from "./ui/input"
import { ChevronDown, Heart, LayoutList, LogOut, Menu, MessageCircle, PlusCircle, Search, Settings, User } from "lucide-react"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet"

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
    <header className="bg-white shadow-md">
      <div className="container px-4 py-3 mx-auto">
        <div className="flex items-center justify-between">
          <Link to={"/"}>
            <img src={Logo} alt="logo" className="h-12" />
          </Link>
          <div className="items-center hidden space-x-4 lg:flex">
            <Link to="/adpage">
              <Button className="flex items-center space-x-2">
                <PlusCircle size={18} />
                <span>Créer une annonce</span>
              </Button>
            </Link>
            <div className="relative">
              <Input
                type="search"
                placeholder="Rechercher..."
                className="w-64 py-2 pl-10 pr-4"
              />
              <Search
                className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2"
                size={18}
              />
            </div>
          </div>
          <nav className="items-center hidden space-x-4 lg:flex xl:space-x-8">
            <Link
              to="/annonces"
              className="flex flex-col items-center text-gray-600 hover:text-primary"
            >
              <LayoutList size={20} />
              <span className="mt-1 text-xs">Annonces</span>
            </Link>
            <Link
              to="/favoris"
              className="flex flex-col items-center text-gray-600 hover:text-primary"
            >
              <Heart size={20} />
              <span className="mt-1 text-xs">Favoris</span>
            </Link>
            <Link
              to="/messages"
              className="flex flex-col items-center text-gray-600 hover:text-primary"
            >
              <MessageCircle size={20} />
              <span className="mt-1 text-xs">Messagerie</span>
            </Link>
            {userState.isLogged ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="relative cursor-pointer">
                    <Avatar>
                      {/* todo : replace with user avatar */}
                      <AvatarImage src="/placeholder.svg" alt="Avatar" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <ChevronDown
                      size={16}
                      className="absolute text-gray-600 bg-white rounded-full -bottom-1 -right-1"
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Link to="/profile">
                    <DropdownMenuItem>
                      <User className="w-4 h-4 mr-2" />
                      <span>Mon profil</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    <span>Paramètres</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Déconnexion</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <span>Se connecter</span>
                </Button>
              </Link>
            )}
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetClose asChild>
                <Link to="/">
                  <img src={Logo} alt="logo" className="h-12" />
                </Link>
              </SheetClose>
              <nav className="flex flex-col space-y-4">
                <div className="relative mt-8">
                  <Input
                    type="search"
                    placeholder="Rechercher..."
                    className="w-full py-2 pl-10 pr-4"
                  />
                  <Search
                    className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                    size={18}
                  />
                </div>
                <SheetClose asChild>
                  <Button>lancer la recherche</Button>
                </SheetClose>

                <SheetClose asChild>
                  <Link to="/adpage">
                    <Button
                      variant="outline"
                      className="flex items-center justify-center w-full space-x-2"
                    >
                      <PlusCircle size={18} />
                      <span>Créer une annonce</span>
                    </Button>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    to="/annonces"
                    className="flex items-center p-2 space-x-2 text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-100"
                  >
                    <LayoutList size={24} />
                    <span>Annonces</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/favoris"
                    className="flex items-center p-2 space-x-2 text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-100"
                  >
                    <Heart size={24} />
                    <span>Favoris</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/messagerie"
                    className="flex items-center p-2 space-x-2 text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-100"
                  >
                    <MessageCircle size={24} />
                    <span>Messagerie</span>
                  </Link>
                </SheetClose>
                {userState.isLogged ? (
                  <>
                    <SheetClose asChild>
                      <Link
                        to="/profile"
                        className="flex items-center p-2 space-x-2 text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-100"
                      >
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="/placeholder.svg" alt="Avatar" />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <span>Mon profil</span>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center justify-start p-2 space-x-2 text-red-500 rounded-md hover:text-red-700 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      <LogOut size={24} />
                      <span>Déconnexion</span>
                    </Button>
                    </SheetClose>
                  </>
                ) : (
                  <SheetClose asChild>
                    <Link to="/login">
                      <Button 
                      variant={"outline"}
                      className="flex items-center justify-center w-full p-2 space-x-2 rounded-md hover:bg-gray-100">
                        <LogOut size={24} />
                        <span>Se connecter</span>
                      </Button>
                    </Link>
                  </SheetClose>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default AppBar;
