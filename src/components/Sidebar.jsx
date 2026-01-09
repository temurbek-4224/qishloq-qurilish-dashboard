import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">Qurilish Loyiha</h2>

      <nav className="space-y-3">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${
              isActive ? "bg-blue-600 text-white" : "hover:bg-gray-100"
            }`
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${
              isActive ? "bg-blue-600 text-white" : "hover:bg-gray-100"
            }`
          }
        >
          📋 Loyihalar
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
