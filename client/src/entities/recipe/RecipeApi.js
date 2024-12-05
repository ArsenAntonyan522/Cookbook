import axios from "axios";
import { axiosInstance } from "../../shared/lib/axiosInstance";

class RecipeApi {
  static async getRecipes(input) {
    const API_KEY = import.meta.env.VITE_RECIPES_API_KEY;

    

    try {
      
    //   const { data: test } = await axios.get(
    //     `https://api.spoonacular.com/recipes/631902/information`,
    //     {
    //       params: {
    //         apiKey: API_KEY,
    //       },
    //     }
    //   );

    //   console.log(test);

      const { data } = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch`,
        {
          params: {
            query: input,
            number: 100,
            apiKey: API_KEY,
          },
        }
      );
      return data;
    } catch (error) {
      return error.response.data;
    }
  
  }
 static async getRandom() {
  const API_KEY = import.meta.env.VITE_RECIPES_API_KEY;

  try {
    const { data } = await axios.get(
      `https://api.spoonacular.com/recipes/random`,
      {
        params: {
          number: 10, 
          apiKey: API_KEY,
        },
      }
    );
    return data.recipes; 
  } catch (error) {
    return error.response.data;
  }
}




  static async addToFav(recipeId) {
    try {
      const { data } = await axiosInstance.post("/fav", { recipeId });
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async deleteFromFav(recipeId) {
    try {
      const { data } = await axiosInstance.delete(`/fav/${recipeId} `);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
}
export default RecipeApi;

// fetch('https://api.spoonacular.com/recipes/631902').then(res => res.json()).catch(console.log)
