import { Outlet } from "react-router-dom";
import AdminMenu from "../AdminMenu";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <AdminMenu />
      <SidebarInset>
        <SidebarTrigger className="m-4" />
        <main className="pl-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;