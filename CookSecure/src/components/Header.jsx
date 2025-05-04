import { Link } from "react-router-dom";
import { useAuth } from "../services/authService";
import { useTheme } from "../services/themeService";

const Header = () => {
  const { currentUser, logoutUser } = useAuth();
  const { dark, toggle } = useTheme();

  return (
    <header className="bg-slate-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Mon Application
        </Link>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggle}
            className="p-2 rounded-full bg-slate-700 hover:bg-slate-600"
          >
            {dark ? "☀️" : "🌙"}
          </button>
          
          {currentUser ? (
            <div className="flex items-center space-x-4">
              {currentUser.role === "admin" && (
                <Link to="/admin" className="hover:text-red-400">
                  Admin
                </Link>
              )}
              <button 
                onClick={logoutUser}
                className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <Link 
              to="/connect"
              className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Connexion
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;