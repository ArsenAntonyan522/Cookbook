import React from 'react';

export default function RecipeCard({ recipe }) {
  return (
    <div>
      <h2>{recipe.title}</h2>
      <a href={`https://spoonacular.com/recipes/${recipe.id}`} target="_blank" rel="noopener noreferrer">
        <img src={recipe.image} alt={recipe.title} width="200" />
      </a>
    </div>
  );
}