import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRecipeById } from "../services/api";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

const RecipeDetails = () => {
  const { id } = useParams(); 
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("user")) || { id: "", name: "" };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await getRecipeById(id);
        setRecipe(res.data);
        setComments(res.data.comments || []);
      } catch (error) {
        console.error("Erreur lors du chargement de la recette :", error);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>Chargement...</p>;

  const handleAddComment = (comment) => {
    const newComment = {
      id: Date.now(),
      userId: currentUser.id,
      content: comment,
    };
    setComments([...comments, newComment]);
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter((c) => c.id !== commentId));
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{recipe.title}</h2>

      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      )}

      <p className="mb-4 text-lg">{recipe.description}</p>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">ingredients</h3>
        <ul className="list-disc list-inside">
          {recipe.ingredients?.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">instructions</h3>
        <p>{recipe.instructions}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Commentaires</h3>
        <CommentForm onSubmit={handleAddComment} />
        <CommentList
          comments={comments}
          onDelete={handleDeleteComment}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

export default RecipeDetails;
