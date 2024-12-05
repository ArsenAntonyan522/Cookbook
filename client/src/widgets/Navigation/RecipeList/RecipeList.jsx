 
import React from 'react';
import RecipeCard from '../../RecipeCard/RecipeCard';

export default function RecipeList({ recipes }) {
  return (
    <div>
      {recipes?.length > 0 ? (  
        recipes?.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} /> 
        ))
      ) : (
        <p>Рецепты не найдены</p>  
      )}
    </div>
  );
}