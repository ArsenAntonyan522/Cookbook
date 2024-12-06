import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from 'antd';
import RecipeApi from "../../entities/recipe/RecipeApi";
import styles from './RecipeCard.module.css';

const { Meta } = Card;

export default function RecipeCard({ recipe }) {
  const [isFav, setIsFav] = useState(false);

  const navigate = useNavigate();

  const handleToggleFav = async () => {
    try {
      if (isFav) {
        await RecipeApi.deleteFromFav(recipe.id);
      } else {
        await RecipeApi.addToFav(recipe.id, recipe.title, recipe.image);
      }
      setIsFav((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  useEffect(() => {
    RecipeApi.getFavoriteByRecipeId(recipe.id).then(({ statusCode }) => {
      if (statusCode === 200) {
        setIsFav(true);
      }
    });
  }, []);

  return (
    <Card
      className={styles.card}
      cover={
        <img
          alt={recipe.title}
          src={recipe.image}
          className={styles.cardImage}
          onClick={handleImageClick}
        />
      }
      actions={[
        <Button
          key="fav"
          className={styles.cardButton}
          onClick={handleToggleFav}
        >
          {isFav ? "❤️" : "🤍"}
        </Button>
      ]}
    >
      <Meta title={recipe.title} className={styles.cardTitle} />
    </Card>
  );
}















// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import RecipeApi from "../../entities/recipe/RecipeApi";
// import styles from './RecipeCard.module.css'

// export default function RecipeCard({ recipe }) {
//   const [isFav, setIsFav] = useState(false);

//   const navigate = useNavigate();

//   const handleToggleFav = async () => {
//     try {
//       if (isFav) {
//         await RecipeApi.deleteFromFav(recipe.id);
//       } else {
//         await RecipeApi.addToFav(recipe.id, recipe.title, recipe.image); // recipe.title
//       }
//       setIsFav((prev) => !prev);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleImageClick = () => {
//     navigate(`/recipe/${recipe.id}`);
//   };

//   useEffect(() => {
//     RecipeApi.getFavoriteByRecipeId(recipe.id).then(({ statusCode }) => {
//       if (statusCode === 200) {
//         setIsFav(true)
//       }
//     });
//   }, []);

//   return (
//     <div>
//       <h2>{recipe.title}</h2>
//       <a onClick={handleImageClick}>
//         <img src={recipe.image} alt={recipe.title} width="200" />
//       </a>
//       <button onClick={handleToggleFav}>{isFav ? "❤️" : "🤍"}</button>
//     </div>
//   );
// }
