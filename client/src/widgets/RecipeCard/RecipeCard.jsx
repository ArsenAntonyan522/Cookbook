import React from 'react';

export default function RecipeCard({ recipe }) {
  console.log(recipe.id);

  // завести состояние, хранящее инфу о том, добавлен ли этот рецепт в избранное
  // запросить данные у бэка, есть ли запись в Fav с таким recipeId 
  // сделать кнопку для добавления/удаления из избранного (ручки на бэке готовы)

  return (
    <div>
      <h2>{recipe.title}</h2>
      <a href={`https://spoonacular.com/recipes/${recipe.id}`} target="_blank" rel="noopener noreferrer">
        <img src={recipe.image} alt={recipe.title} width="200" />
      </a>
    </div>
  );
}