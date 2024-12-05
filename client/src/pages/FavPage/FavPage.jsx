import { useEffect, useState } from 'react';
import { axiosInstance } from '../../shared/lib/axiosInstance';
import RecipeCard from '../../widgets/RecipeCard';

function FavPage() {
    const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axiosInstance.get("/fav");
        setFavorites(response.data.data);
      } catch (error) {
        console.error("Failed to fetch favorites:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <p>Loading...</p>;

    return (
        <div>
        <h2>Favorites</h2>
        {favorites.length > 0 ? (
          <ul>
            {/* {favorites.map((recipe) => (
              <li key={recipeId}>{recipe.name}</li>
            ))} */}
          </ul>
        ) : (
          <p>No favorites added yet.</p>
        )}
      </div>
    );
}

export default FavPage;