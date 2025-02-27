import Logo from "/Logo-share-loc.svg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ArrowDownAZ, ChevronUp, Flag, Gauge, LogOut, Scroll, Settings, Star, User, Users } from "lucide-react";

const AdminMenu = () => {
  const navigate = useNavigate();

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
      to_do: 13
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
      to_do: 23
    },
  ]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center justify-center">
        <a href="/">
          <img
            className="w-auto h-10"
            src={Logo}
            alt="Share'Loc logo"
          />
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
                {link.to_do && <SidebarMenuBadge>{link.to_do}</SidebarMenuBadge>}
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
                  <Avatar className="size-8 rounded-lg">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
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
                <DropdownMenuItem className="text-red-500" onClick={handleLogout}>
                  <LogOut />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
      // <div className="hidden md:flex md:w-64 md:flex-col">
      //   <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white">
      //     <div className="flex items-center justify-center flex-shrink-0 px-4">
      //       <a href="/">
      //         <img
      //           className="w-auto h-8"
      //           src={Logo}
      //           alt="Share'Loc logo"
      //         />
      //       </a>
      //     </div>

      //     <div className="px-4 mt-6">
      //       <hr className="border-slate-300" />
      //     </div>

      //     <div className="flex flex-col flex-1 justify-between px-3 mt-6">
      //       <div className="space-y-4">
      //         <nav className="flex-1 space-y-2">
      //           <a
      //             href="/admin/dashboard"
      //             title=""
      //             className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 ${isActive('/admin/dashboard') ? 'text-white bg-blue' : 'text-gray-900 hover:text-white hover:bg-blue' } rounded-lg group gap-2`}
      //           >
      //             <FaHome className="w-5 h-5" />
      //             Accueil
      //           </a>

      //           <a
      //             href="/admin/users"
      //             className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 ${isActive('/admin/users') ? 'text-white bg-blue' : 'text-gray-900 hover:text-white hover:bg-blue' } rounded-lg group gap-2`}
      //           >
      //             <FaUsers className="w-5 h-5" />
      //             Utilisateurs
      //           </a>

      //           <a
      //             href="/admin/items"
      //             className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg ${isActive('/admin/items') ? 'text-white bg-blue' : 'text-gray-900 hover:text-white hover:bg-blue' } group gap-2`}
      //           >
      //             <FaNewspaper className="w-5 h-5" />
      //             Annonces
      //           </a>

      //           <a
      //             href="/admin/categories"
      //             className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg ${isActive('/admin/categories') ? 'text-white bg-blue' : 'text-gray-900 hover:text-white hover:bg-blue' } group gap-2`}
      //           >
      //             <FaList className="w-5 h-5" />
      //             Catégories
      //           </a>

      //           <a
      //             href="/admin/reviews"
      //             className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg ${isActive('/admin/reviews') ? 'text-white bg-blue' : 'text-gray-900 hover:text-white hover:bg-blue' } group gap-2`}
      //           >
      //             <FaStar className="w-5 h-5" />
      //             Evaluations
      //           </a>

      //           <a
      //             href="/admin/reports"
      //             className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg ${isActive('/admin/reports') ? 'text-white bg-blue' : 'text-gray-900 hover:text-white hover:bg-blue' } group gap-2`}
      //           >
      //             <FaFlag className="w-5 h-5" />
      //             Signalements
      //           </a>
      //         </nav>
      //       </div>

      //       <div className="pb-4 mt-20">
      //         <div
      //           className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-900 transition-all duration-200 rounded-lg hover:bg-gray-100"
      //         >
      //           <img
      //             className="flex-shrink-0 object-cover w-6 h-6 mr-3 rounded-full"
      //             src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/vertical-menu/2/avatar-male.png"
      //             alt=""
      //           />
      //           {/* <!-- User name --> */}
      //           username
      //           <FaRightFromBracket onClick={handleLogout} className="w-5 h-5 text-red-500 hover:text-red-300" />

      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
  );
};
export default AdminMenu;
