const { Recipe } = require('../db/models')

class RecipeService {
    //* Получить все задачи
    static async getAll() {
      return await Recipe.findAll();
    }
  
    //* Найти задачу по ID
    static async getById(id) {
      return await Recipe.findByPk(id);
    }
} 

module.exports = RecipeService