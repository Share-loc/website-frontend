import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import Logo from "/Logo-share-loc.svg";
import { Input } from "./ui/input";
import {
  Calendar,
  ChevronDown,
  Heart,
  HelpCircle,
  LayoutList,
  Lock,
  LogOut,
  Menu,
  MessageCircle,
  MessageSquare,
  PlusCircle,
  Search,
  Settings,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { Badge } from "./ui/badge";
import { useWebSocket } from "./context/WebSocketContext";
import { useAuth } from "./context/AuthContext";
import apiClient from "@/service/api/apiClient";

const AppBar = () => {
  const navigate = useNavigate();
  const { socket } = useWebSocket();
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { logout, isAuthenticated, user } = useAuth();

  const handleSearch = () => {
    if(!searchQuery.trim()) return
    navigate(`/annonces?title=${encodeURIComponent(searchQuery.trim())}`)
    setSearchQuery("")
  }

  const fetchUnreadMessages = useCallback(async () => {
    try {
      const response = await apiClient.get('/messages/unread')
      setUnreadMessages(response.data.unread_count);
    } catch (err) {
      console.error("Failed to fetch unread message count", err);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchUnreadMessages();
  }, [fetchUnreadMessages, isAuthenticated]);

  // Connexion au serveur temps réel
  useEffect(() => {
    if (!socket) return;

    const registerUser = async () => {
      socket.emit("register", user?.id);
    };

    registerUser();

    // Ecoute des nouveaux messages
    socket.on("newMessage", () => {
      console.log("nouveau message");
      fetchUnreadMessages();
    });

    // Retourner une fonction de nettoyage pour fermer la connexion proprement
    return () => {
      socket.off("newMessage");
    };
  }, [socket, fetchUnreadMessages, user]);

  const getUnreadMessages = (): number | string => {
    if (unreadMessages === 0) {
      return 0;
    }
    if (unreadMessages > 9) {
      return "9+";
    }
    return unreadMessages;
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container px-4 py-3 mx-auto">
        <div className="flex items-center justify-between">
          <Link to={"/"}>
            <img src={Logo} alt="logo" className="h-12" />
          </Link>
          <div className="items-center hidden space-x-4 lg:flex">
            <Link to="/create-item">
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
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
              className="relative flex flex-col items-center text-gray-600 hover:text-primary"
            >
              <MessageCircle size={20} />
              {getUnreadMessages() !== 0 && (
                <Badge className="absolute -top-1 right-4 size-4 rounded-full p-0 flex items-center justify-center bg-primary">
                  <span className="text-[9px]">{getUnreadMessages()}</span>
                </Badge>
              )}
              <span className="mt-1 text-xs">Messagerie</span>
            </Link>
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="relative cursor-pointer">
                    <Avatar>
                      {/* todo : replace with user avatar */}
                      <AvatarImage src={user?.avatar} alt="Avatar" className="object-cover" />
                      <AvatarFallback>
                        {user?.username?.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown
                      size={16}
                      className="absolute text-gray-600 bg-white rounded-full -bottom-1 -right-1"
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      {/* todo : replace with user data */}
                      <p className="text-sm font-medium leading-none">
                        {`${user?.first_name} ${user?.last_name}`}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Mon profil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/reservations")}>
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Mes réservations</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/messages")}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Messages</span>
                      {getUnreadMessages() !== 0 && (
                        <Badge className="ml-auto h-5 w-5 rounded-full p-0 flex items-center justify-center bg-primary">
                          {getUnreadMessages()}
                        </Badge>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/favoris")}>
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Favoris</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {user?.roles.includes("ROLE_ADMIN") && (
                      <DropdownMenuItem
                        onClick={() => navigate("/admin")}
                        className="text-orange-500"
                      >
                        <Lock className="mr-2 h-4 w-4" />
                        <span>Admin Panel</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => navigate("/settings")}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Paramètres</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/help")}>
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>Aide</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-500 focus:text-red-500"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Se déconnecter</span>
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search
                    className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                    size={18}
                  />
                </div>
                <SheetClose asChild>
                  <Button onClick={handleSearch}>lancer la recherche</Button>
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
                {isAuthenticated ? (
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
                        className="flex items-center justify-center w-full p-2 space-x-2 rounded-md hover:bg-gray-100"
                      >
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
