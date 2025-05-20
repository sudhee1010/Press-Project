import { sidebars } from "../config/SidebarConfig.js";
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  //   const { user } = useAuth();
  //   const role = user?.role;

  //   const items = sidebars[role] || [];
  const items = sidebars["admin"] || [];

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <ul>
          {items.map((item) => (
            <li key={item.path} className="mb-2">
              <Link to={item.path} className="hover:underline">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
