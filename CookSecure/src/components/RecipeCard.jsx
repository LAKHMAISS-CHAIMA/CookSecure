import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe, onDelete }) => {
  return (
    <div className="hover:scale-102 transition duration-500 rounded-lg shadow-lg overflow-hidden mainDiv flex flex-col">
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-48 w-full object-cover"
        />
      )}

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>

        <p className="text-gray-600 text-sm mb-4">
          Category: <span className="font-medium">{recipe.category}</span>
        </p>

        <div className="mt-auto">
          <Link to={`/recipes/${recipe.id}`}>
            <button className="bg-green-500 text-white px-4 py-2 rounded">View Details</button>
          </Link>

          <div className="flex space-x-2 mt-2">
            <Link to={`/edit-recipe/${recipe.id}`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Edit
              </button>
            </Link>
            <button
              onClick={() => onDelete(recipe.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;