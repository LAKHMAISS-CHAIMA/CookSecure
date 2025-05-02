import React, { useState, useEffect } from "react";
import { FaSearch, FaHeart, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../services/authService";

function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const current = getCurrentUser();
    setUser(current);
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm);
  };

  return (
    <header className="bg-red-900 text-white py-4 px-6 shadow-md flex justify-between items-center flex-wrap">
      <Link to="/home" className="text-2xl font-bold tracking-wide">
        🍔 CookSecure
      </Link>

      <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full px-3 py-1 w-full sm:w-72 mt-3 sm:mt-0">
        <input
          type="text"
          placeholder="Rechercher une recette..."
          className="flex-grow outline-none bg-transparent text-gray-800 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">
          <FaSearch className="text-red-600" />
        </button>
      </form>

      <div className="flex items-center gap-4 mt-3 sm:mt-0">
        <Link to="/favorites" title="Favoris">
          <FaHeart className="text-white text-xl hover:text-red-300" />
        </Link>

        {user && (
          <span className="text-sm">
            {user.username} ({user.role})
          </span>
        )}

        {user && (
          <button onClick={handleLogout} title="Déconnexion">
            <FaSignOutAlt className="text-white text-xl hover:text-red-300" />
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
