import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ items }) => {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 shadow-md py-6 px-4 flex flex-col gap-6 text-gray-800">
      <Link to="/" className="text-indigo-500 text-2xl font-bold px-2">
        PrintPress
      </Link>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`block px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-indigo-100 hover:text-indigo-700 font-medium ${
                location.pathname === item.path
                  ? "bg-indigo-50 text-indigo-600"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
