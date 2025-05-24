import { sidebars } from "../config/SidebarConfig.js";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

const DashboardLayout = () => {
  const items = sidebars["admin"] || [];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar items={items} />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
