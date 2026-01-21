import { Link, useLocation } from "react-router-dom";

function Header() {
    const { pathname } = useLocation();

    const linkClass = (path) =>
        `px-4 py-2 rounded-lg font-medium ${pathname === path
            ? "bg-blue-600 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`;

    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-4">
                <h1 className="font-bold text-lg mr-6">📊 Qishloq Qurilish</h1>

                <Link to="/" className={linkClass("/")}>
                    Dashboard
                </Link>

                <Link to="/loyihalar" className={linkClass("/loyihalar")}>
                    Loyihalar
                </Link>
            </div>
        </header>
    );
}

export default Header;
