import axios from "axios";
import { axiosInstance } from "../../shared/lib/axiosInstance";

class RecipeApi {
  static async getRecipes(input) {
    const API_KEY = import.meta.env.VITE_RECIPES_API_KEY;

    try {

      const { data } = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch`,
        {
          params: {
            query: input,
            number: 9,
            apiKey: API_KEY,
          },
        }
      );
      return data;
    } catch (error) {
      return error.response.data;
    }
  }


static async getRecipeById(recipeId) {
  const API_KEY = import.meta.env.VITE_RECIPES_API_KEY;
  const response= await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/information`,
      {
        params: {
          apiKey: API_KEY,
        },
      }
    );
    console.log(response.data.extendedIngredients);
    return response.data; 

  } catch (error) {
    return error.response.data;
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

  static async addToFav(recipeId, title, image) {
    //
    try {
      const { data } = await axiosInstance.post("/fav", {
        recipeId,
        title,
        image,
      }); //
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async deleteFromFav(recipeId) {
    try {
      const { data } = await axiosInstance.delete(`/fav/${recipeId}`);

      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  static async getFavoriteByRecipeId(recipeId) {
    try {
      const { data } = await axiosInstance.get(`/fav/${recipeId}`); 
      return data; 
    } catch (error) {
      console.error(error);
      return error.response.data;
    }
  }

  static async getAllFavorites() {
    try {
      const { data } = await axiosInstance.get("/fav"); 
      return data; 
    } catch (error) {
      console.error(error);
      return error.response.data;
    }
  }
}


console.log(RecipeApi.getRecipeById(715415));

export default RecipeApi;

// fetch('https://api.spoonacular.com/recipes/631902').then(res => res.json()).catch(console.log)
