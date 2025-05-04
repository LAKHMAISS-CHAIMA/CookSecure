import React, { useState, useEffect } from 'react';
import { getRecipes } from '../services/api'; 
import RecipeCard from '../components/RecipeCard'; 
import SearchBar from '../components/SearchBar'; 
import CategoryFilter from '../components/CategoryFilter'; 

const Home = () => {
  const [recipes, setRecipes] = useState([]); 
  const [filteredRecipes, setFilteredRecipes] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [selectedCategory, setSelectedCategory] = useState(''); 

  const categories = ["Marrocain", "Italien", "Indian", "Asian"]; 

  const fetchRecipes = async () => {
    try {
      const res = await getRecipes();
      console.log("Réponse de l'API:", res);
      if (Array.isArray(res) && res.length > 0) {
        setRecipes(res);
        setFilteredRecipes(res); 
      } else {
        throw new Error("Données de recette invalides");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des recettes :", error);
      setError("Une erreur est survenue lors du chargement des recettes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterRecipes(query, selectedCategory);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    filterRecipes(searchQuery, category);
  };

  const filterRecipes = (query, category) => {
    let filtered = recipes;

    if (query) {
      filtered = filtered.filter((recipe) =>
        recipe.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((recipe) =>
        recipe.category.toLowerCase() === category.toLowerCase()
      );
    }

    setFilteredRecipes(filtered);
  };

  return (
    <div className="home-container ">
      {loading ? (
        <p>Chargement des recettes...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <><div className="flex justify-between mt-2">
          <SearchBar onSearch={handleSearch} />
          <CategoryFilter onCategorySelect={handleCategoryFilter} categories={categories} />
          </div >
          <div className="recipes-list flex justify-between">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))
            ) : (
              <p>Aucune recette trouvée</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
