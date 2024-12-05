 


import React, { useState } from 'react';
import axios from 'axios';
import { message as antMessage } from 'antd';
import RecipeList from '../../widgets/Navigation/RecipeList/RecipeList';
import RecipeForm from '../../widgets/Navigation/RecipeForm/RecipeForm';


const RecipePage = () => {
    const [input, setInput] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    
    const API_KEY = `1c011d0e21394237ac3a9a48698e1f11`
    
    const handleSearch = async () => {
        setLoading(true);
        setError('');



        try {
            const { data } = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
                params: {
                    query: input,
                    number: 10, 
                    apiKey: API_KEY,
                },
            });
            antMessage.success(message);
            console.log(data.results);
            if (data.results && data.results.length > 0) {
                setRecipes(data.results);
            
            } else {
                setError('Рецепты не найдены');
             
            }
           
        } catch (err) {
            setError('Ошибка');
          
        } finally {
            antMessage.info('ПуПуПу');
            setLoading(false);
        }
    };

    return (
        <div>
        <RecipeForm input={input} setInput={setInput}/>
            <button onClick={handleSearch} disabled={loading}>
                <span>Заработай, пожалуйста</span>
            </button>
        <RecipeList recipes={recipes}/>
            
        </div>
    );
};

export default RecipePage;

