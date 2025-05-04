import axios from "axios";

const API_URL = "http://localhost:3000";

export const getRecipes = async () => {
  const response = await axios.get(`${API_URL}/recipes`);
  return response.data;
};

export const getRecipeById = async (id) => {
  const response = await axios.get(`${API_URL}/recipes/${id}`);
  return response.data;
};

export const deleteRecipe = async (id) => {
  await axios.delete(`${API_URL}/recipes/${id}`);
};

export const createRecipe = async (data) => {
  const response = await axios.post(`${API_URL}/recipes`, data);
  return response.data;
};

export const updateRecipe = async (id, data) => {
  const response = await axios.put(`${API_URL}/recipes/${id}`, data);
  return response.data;
};
