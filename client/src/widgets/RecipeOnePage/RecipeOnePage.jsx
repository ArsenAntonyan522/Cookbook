import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, List, Typography } from 'antd';
import RecipeApi from '../../entities/recipe/RecipeApi';
import styles from './RecipeOnePage.module.css';

const { Title } = Typography;

export default function RecipeDetailPage() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

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
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Title level={2} className={styles.title}>{recipe.title}</Title>
      <img src={recipe.image} alt={recipe.title} className={styles.image} />
      <div>
        <Title level={3} className={styles.sectionTitle}>Ingredients</Title>
        <List
          dataSource={recipe.extendedIngredients}
          renderItem={(ingredient) => (
            <List.Item className={styles.ingredientItem}>
              <img
                src={`https://img.spoonacular.com/ingredients_100x100/${ingredient.image}`}
                alt={ingredient.name}
                className={styles.ingredientImage}
              />
              <span>{ingredient.original}</span>
            </List.Item>
          )}
          className={styles.ingredientList}
        />
      </div>
      <div>
        <Title level={3} className={styles.sectionTitle}>Recipe</Title>
        <p className={styles.instructions}>{recipe.instructions}</p>
      </div>
    </div>
  );
}



// import React, { useEffect, useState } from 'react';
// import RecipeApi from '../../entities/recipe/RecipeApi';
// import axios from "axios";
// import { useParams } from 'react-router-dom';

// export default function RecipeDetailPage({ recipeId }) {
//   const [recipe, setRecipe] = useState(false);
//   const {id} = useParams()

//   const fetchRecipe = async (recipeId) => {
//     try {
//       const response = await RecipeApi.getRecipeById(recipeId);
//       setRecipe(response);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchRecipe(id);
//   }, []);


//   if (!recipe) {
//     return <div>Loading...</div>;
//   }

    
//   return (
//     <div>
//       <h2>{recipe.title}</h2>
//       <img src={recipe.image} alt={recipe.title} width="200" />
//       <h3>Ingredients</h3>
//       <ul>
//         {recipe?.extendedIngredients?.map((ingredient) => (
//           <li key={ingredient.id}>{ingredient.original}<img width="50" height={50} src={`https://img.spoonacular.com/ingredients_100x100/${ingredient.image}`}/></li>  
//         ))}
//       </ul>
//       <h3>Recipe</h3>
//       <p>{recipe.instructions}</p>
//     </div>
//   );
// }