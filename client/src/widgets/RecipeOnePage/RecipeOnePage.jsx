import React, { useEffect, useState } from 'react';
import RecipeApi from '../../entities/recipe/RecipeApi';
import axios from "axios";
import { useParams } from 'react-router-dom';

export default function RecipeDetailPage({ recipeId }) {
  const [recipe, setRecipe] = useState(false);
  const {id} = useParams()

  const fetchRecipe = async (recipeId) => {
    try {
      const response = await RecipeApi.getRecipeById(recipeId);
      setRecipe(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRecipe(id);
  }, []);


  if (!recipe) {
    return <div>Loading...</div>;
  }

    
  return (
    <div>
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} width="200" />
      <h3>Ингредиенты</h3>
      <ul>
        {recipe?.extendedIngredients?.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}<img width="50" height={50} src={`https://img.spoonacular.com/ingredients_100x100/${ingredient.image}`}/></li>  
        ))}
      </ul>
      <h3>Рецепт</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
}