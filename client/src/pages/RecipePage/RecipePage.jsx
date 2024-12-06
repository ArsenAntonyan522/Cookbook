
import {Button, message as antMessage } from 'antd';
import styles from './RecipePage.module.css'
import RecipeList from '../../widgets/RecipeList/RecipeList';
import RecipeForm from '../../widgets/RecipeForm/RecipeForm';
import RecipeApi from '../../entities/recipe/RecipeApi';
import { useState, useEffect } from 'react';


const RecipePage = () => {
    const [input, setInput] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

 
    const fetchRandomRecipes = async () => {
        try {
          const data = await RecipeApi.getRandom();
          setRecipes(data);  
        } catch (err) {
          console.error("Ошибка при получении рецептов:", err);
        } finally {
          setLoading(false); 
        }
      }

useEffect(()=> {
    fetchRandomRecipes()
},[]) 



    const handleSearch = async () => {
        setLoading(true);
        try {
            const data  = await RecipeApi.getRecipes(input);
            if (data.results && data.results.length > 0) {
                setRecipes(data.results);
                setInput('')
            } 
        } catch (err) {
            antMessage.error(err.message)
        } finally {
            antMessage.info('Error');
            setLoading(false);
        }
    };

    

    return (
        <div className={styles.container}>
        <RecipeForm input={input} setInput={setInput} />
        <Button
          type="primary"
          onClick={handleSearch}
          disabled={loading}
          className={styles.button}
        >
          <span><img src="../../../public/search.svg" alt="Search" /></span>
        </Button>
        <RecipeList recipes={recipes} />
      </div>
    );
};

export default RecipePage;

