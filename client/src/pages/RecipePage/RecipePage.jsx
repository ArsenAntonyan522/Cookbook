
import { message as antMessage } from 'antd';

import RecipeList from '../../widgets/RecipeList/RecipeList';
import RecipeForm from '../../widgets/RecipeForm/RecipeForm';
import RecipeApi from '../../entities/recipe/RecipeApi';
import { useState } from 'react';


const RecipePage = () => {
    const [input, setInput] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    
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
            antMessage.info('ПуПуПу');
            setLoading(false);
        }
    };

    

    return (
        <div>
        <RecipeForm input={input} setInput={setInput}/>
            <button onClick={handleSearch} disabled={loading}>
                <span>Search</span>
            </button>
        <RecipeList recipes={recipes}/>
        </div>
    );
};

export default RecipePage;

