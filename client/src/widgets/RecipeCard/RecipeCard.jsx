 


 

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeApi from '../../entities/recipe/RecipeApi';

  // завести состояние, хранящее инфу о том, добавлен ли этот рецепт в избранное
  // запросить данные у бэка, есть ли запись в Fav с таким recipeId 
  // сделать кнопку для добавления/удаления из избранного (ручки на бэке готовы)


export default function RecipeCard({ recipe }) {
  const [isFav, setIsFav] = useState(false);
  const navigate = useNavigate()

  const handleToggleFav = async () => {
   
    try {
      if (isFav) {
        await RecipeApi.deleteFromFav(recipe.id);
      } else 
      {
        await RecipeApi.addToFav(recipe.id);
      }
      setIsFav(prev => !prev);     
    } catch (error) {
      console.error( error);
    }
  };

  const handleImageClick = () => {
    navigate(`/recipe/${recipe.id}`);  
  }
  
  return (
    <div>
      <h2>{recipe.title}</h2>
      <a onClick={handleImageClick} >
        <img src={recipe.image} alt={recipe.title} width="200" />
      </a>
      <button onClick={handleToggleFav}>
        {isFav ? '❤️' : '🤍'}
      </button>
    </div>
  );
}