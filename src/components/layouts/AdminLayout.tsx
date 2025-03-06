import { Outlet } from "react-router-dom";
import AdminMenu from "../AdminMenu";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AdminProvider } from "../context/AdminContext";

const AdminLayout = () => {
  return (
    <AdminProvider>
      <SidebarProvider>
        <AdminMenu />
        <SidebarInset>
          <div className="bg-gray-100 min-h-screen">
            <SidebarTrigger className="m-4" />
            <main className="px-6 pb-6">
              <Outlet />
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AdminProvider>
  );
};

export default AdminLayout;
