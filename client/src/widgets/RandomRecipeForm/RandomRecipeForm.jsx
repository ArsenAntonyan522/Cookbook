import React, { useEffect, useState } from 'react';
import RecipeForm from '../RecipeForm/RecipeForm';
import RecipeApi from '../../entities/recipe/RecipeApi';  
import RecipeCard from '../RecipeCard/RecipeCard';  

export default function RandomRecipeForm() {
  const [input, setInput] = useState('');
  const [recipes, setRecipes] = useState([]);  
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      try {
        const data = await RecipeApi.getRandom(); // Используйте правильный метод
        setRecipes(data); // Учитывайте структуру данных
      } catch (err) {
        console.error("Ошибка при получении рецептов:", err);
      } finally {
        setLoading(false); 
      }
    };

    fetchRandomRecipes();
  }, []);

  return (
    <div>
      <RecipeForm input={input} setInput={setInput} />
      <h2>pецептики</h2>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div>
          {recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}