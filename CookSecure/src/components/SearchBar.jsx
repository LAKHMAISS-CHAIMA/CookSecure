import React from 'react';

const SearchBar = ({ onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value); 
  };

  return (
    <div className="mb-6 flex justify-center">
      <input
        type="text"
        placeholder="Rechercher des recettes..."
        onChange={handleInputChange}
        className="w-full max-w-md p-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-md"
      />
    </div>
  );
};

export default SearchBar;
