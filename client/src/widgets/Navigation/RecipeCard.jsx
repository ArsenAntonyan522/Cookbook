import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosInstance } from '../shared/lib/axiosInstance';

function RecipeCard({ recipe,onAddToFavorites  }) {

    const handleAddToFavorites = async () => {
        try {
          await axiosInstance.post(`/${recipe.id}/fav`);
          onAddToFavorites(recipe);
        } catch (error) {
          console.error("Failed to add to favorites:", error.message);
        }
      };
    
      return (
        <div className="recipe-card">
          <h3>{recipe.name}</h3>
          <p>{recipe.description}</p>
          <button onClick={handleAddToFavorites}>Add to Favorites</button>
        </div>
    );
}

export default RecipeCard;