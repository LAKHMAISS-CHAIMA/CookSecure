import { useEffect, useState } from "react";
import { getRecipes, deleteRecipe, createRecipe, updateRecipe } from "../services/api";
import RecipeForm from "../components/RecipeForm";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const data = await getRecipes();
      setRecipes(data);
    } catch (error) {
      toast.error("Failed to fetch recipes");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRecipe(id);
      toast.success("Recipe deleted");
      fetchRecipes();
    } catch (error) {
      toast.error("Failed to delete recipe");
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      if (editing) {
        await updateRecipe(editing.id, data);
        toast.success("Recipe updated");
      } else {
        await createRecipe(data);
        toast.success("Recipe created");
      }
      setEditing(null);
      fetchRecipes();
    } catch (error) {
      toast.error("Failed to save recipe");
    }
  };

  const handleAddRecipe = () => {
    history.push('/add-recipe'); 
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      
      <button
        onClick={handleAddRecipe}
        className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 mb-6"
      >
        Ajouter une recette
      </button>

      <RecipeForm onSubmit={handleFormSubmit} defaultValues={editing || {}} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="border rounded p-4 shadow-sm">
            <h3 className="font-bold">{recipe.title}</h3>
            <p className="text-sm">{recipe.category}</p>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => setEditing(recipe)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(recipe.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
