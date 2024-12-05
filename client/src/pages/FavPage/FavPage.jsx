import { useEffect, useState } from "react";
import { axiosInstance } from "../../shared/lib/axiosInstance";
import { message as antMessage } from 'antd';

function FavPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);


  async function favoritesList(){
    try {
      const response = await axiosInstance.get("/fav");
      setFavorites(response.data.data); 
    } catch (err) {
      antMessage.error(err.message)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    favoritesList();
  }, []);

  if (loading) return <p>Загружается, давай подождем...</p>;

  return (
    <div>
      <h2>Избранное</h2>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((recipe) => (
            <li key={recipe.id}>
              <h3>{recipe.name}</h3>
              <a href={`https://spoonacular.com/recipes/${recipeId}`} target="_blank" rel="noopener noreferrer">
                <img src={recipe.image} alt={recipe.name} width="200" />
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Лайкни, и приготовь уже что-нибудь</p>
      )}
    </div>
  );
}

export default FavPage;
