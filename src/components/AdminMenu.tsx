import Logo from "/Logo-share-loc.svg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ArrowDownAZ, ChevronUp, Flag, Gauge, LogOut, Scroll, Settings, Star, User, Users } from "lucide-react";
import { useAdmin } from "./context/AdminContext";
import { Badge } from "./ui/badge";

const AdminMenu = () => {
  const navigate = useNavigate();

  const { pendingItems, pendingReports } = useAdmin();

  const { setUserState } = useContext(AuthContext)

  const handleLogout = () => {
    // set user state to logged out
    setUserState(
      {
        isLogged: false,
      }
    )
    // delete token from local storage
    localStorage.removeItem("token")
    navigate("/")
  }

  const links = [
    {
      name: "Tableau de bord",
      icon: Gauge,
      url: "/admin"
    },{
      name: "Utilisateurs",
      icon: Users,
      url: "/admin/users"
    },{
      name: "Annonces",
      icon: Scroll,
      url: "/admin/items",
      to_do: pendingItems
    },{
      name: "Catégories",
      icon: ArrowDownAZ,
      url: "/admin/categories"
    },{
      name: "Evaluations",
      icon: Star,
      url: "/admin/reviews"
    },{
      name: "Signalements",
      icon: Flag,
      url: "/admin/reports", 
      to_do: pendingReports
    },
  ]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center justify-center">
        <a href="/">
          <img className="w-auto h-10" src={Logo} alt="Share'Loc logo" />
        </a>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {links.map((link) => (
              <SidebarMenuItem key={link.url}>
                <SidebarMenuButton asChild>
                  <a href={link.url}>
                    <link.icon />
                    <span>{link.name}</span>
                  </a>
                </SidebarMenuButton>
                {link.to_do && (
                  <SidebarMenuBadge>
                    <Badge variant={"outline"}>{link.to_do}</Badge>
                  </SidebarMenuBadge>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size={"lg"}>
                  <Avatar className="rounded-lg size-8">
                    {/* !! TODO : Change with user avatar/fallback and username */}
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top">
                <DropdownMenuItem>
                  <Settings />
                  <span>Parametres</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User />
                  <span>Mon compte</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={handleLogout}
                >
                  <LogOut />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
export default AdminMenu;
