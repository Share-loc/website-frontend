import { Outlet } from "react-router-dom";
import AdminMenu from "../AdminMenu";

const AdminLayout = () => {
    return (
        <>
            <div className="flex flex-1 h-screen bg-gray-50">
                <AdminMenu />
                <div className="flex flex-col flex-1">
                    <main>
                    <div className="py-6">
                        <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
                        {/* <!-- ADD YOUR CONTENT HERE --> */}
                        <Outlet />
                        </div>
                    </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default AdminLayout;