import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import recipeScheme from "../validators/recipeSchema";
import { useState } from "react";

const RecipeForm = ({ onSubmit, defaultValues = {} }) => {
  const [image, setImage] = useState(null); 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(recipeScheme),
    defaultValues,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleFormSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("description", data.description);
    if (image) {
      formData.append("image", image); 
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <input
        {...register("title")}
        placeholder="Title"
        className="border p-2 w-full"
      />
      <p className="text-red-700">{errors.title?.message}</p>

      <input
        {...register("category")}
        placeholder="Category"
        className="border p-2 w-full"
      />
      <p className="text-red-700">{errors.category?.message}</p>

      <textarea
        {...register("description")}
        placeholder="Description"
        className="border p-2 w-full"
      />
      <p className="text-red-700">{errors.description?.message}</p>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="border p-2 w-full"
      />
      {image && <p className="text-green-500">Image selected: {image.name}</p>}

      <button className="bg-red-700 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
};

export default RecipeForm;
