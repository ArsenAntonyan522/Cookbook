 
import React from 'react';
import RecipeCard from '../../RecipeCard/RecipeCard';

export default function RecipeList({ recipes, setRecipes }) {
  return (
    <div>
      {recipes.length > 0 ? (  
        recipes.map((recipe) => (
          <div key={recipe.id}>
            <RecipeCard recipe={recipe} /> 
          </div>
        ))
      ) : (
        <p>Рецепты не найдены</p>  
      )}
    </div>
  );
}