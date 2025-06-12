import Logo from "/Logo-share-loc.svg";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ArrowDownAZ, ChevronUp, Flag, Gauge, LogOut, Scroll, Settings, Star, User, Users } from "lucide-react";
import { useAdmin } from "./context/AdminContext";
import { Badge } from "./ui/badge";
import { useAuth } from "./context/AuthContext";

const AdminMenu = () => {
  const { logout, user } = useAuth();

  const { pendingItems, pendingReports } = useAdmin();

  const handleLogout = () => {
    logout();
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
                {!!(link.to_do && link.to_do > 0) && (
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
                      src={user?.avatar}
                      alt="User profile picture"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  {`${user?.first_name} ${user?.last_name}`}
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
