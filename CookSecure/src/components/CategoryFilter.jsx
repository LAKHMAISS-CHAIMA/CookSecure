import React from 'react';

const CategoryFilter = ({ onCategorySelect, categories }) => {
  const handleCategoryChange = (e) => {
    onCategorySelect(e.target.value); 
  };

  return (
    <div className="mb-6 flex justify-center">
      <select
        onChange={handleCategoryChange}
        className="w-full max-w-md p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md"
      >
        <option value="">Toutes les catégories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
