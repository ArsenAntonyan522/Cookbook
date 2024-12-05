import { axiosInstance } from '../../shared/lib/axiosInstance';

class RecipeApi {
 
 
  static async getRecipes() {
    const API_KEY = `1c011d0e21394237ac3a9a48698e1f11`
    try {
      const { data } = await axiosInstance.get(`https://api.spoonacular.com/recipes/complexSearch`,   params: {
        query: data,
        number: 10, // количество возвращаемых рецептов
        apiKey: API_KEY,
    });
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
}
export default RecipeApi;