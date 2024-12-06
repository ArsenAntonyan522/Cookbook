import RecipeCard from '../RecipeCard/RecipeCard';
import styles from './RecipeList.module.css'

export default function RecipeList({ recipes }) {
  return (
    <div className={styles.container}>
      {recipes?.length > 0 ? (  
        recipes?.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} /> 
        ))
      ) : (
        <span className={styles.notFound} >Recipes not found</span>  
      )}
    </div>
  );
}