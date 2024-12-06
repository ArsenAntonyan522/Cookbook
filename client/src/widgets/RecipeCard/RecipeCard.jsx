
 


 

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeApi from '../../entities/recipe/RecipeApi';



export default function RecipeCard({ recipe }) {
  const [isFav, setIsFav] = useState(false);

  const navigate = useNavigate()


  const handleToggleFav = async () => {
   
    try {
      if (isFav) {
        await RecipeApi.deleteFromFav(recipe.id);
      } else {
        await RecipeApi.addToFav(recipe.id, recipe.title, recipe.image); // recipe.title
      }
      setIsFav((prev) => !prev);
    } catch (error) {
      console.error(error);
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
      <button onClick={handleToggleFav}>{isFav ? "❤️" : "🤍"}</button>
    </div>
  );
}
