const RecipeService = require('../services/Recipe.service'); // занимается бдешкой, crud
const isValidId = require('../utils/isValidId'); // валидация айдишника 
// const RecipeValidator = require('../utils/Recipe.validator'); // валидация значений класса, спика задач 
const formatResponse = require('../utils/formatResponse'); // в каком формате должен приходить запрос
// const reformatId = require('../utils/reformatId'); // из строки сразу в число 

class RecipeController {
  static async getAllRecipes(req, res) {
    try {
      //? За запросы в БД отвечает сервис
      const recipes = await RecipeService.getAll();

      //! Проверка на длину списка задач (обработка негативного кейса)
      if (recipes.length === 0) {
        return res.status(204).json(formatResponse(204, 'No tasks found', []));
      }

      //* Успешный кейс
      res.status(200).json(formatResponse(200, 'success', recipes));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async getRecipeById(req, res) {
    const { id } = req.params;

    //! Проверка на валидность ID (обработка негативного кейса) (можно делать и не внутри try/catch)
    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, 'Invalid task ID'));
    }

    try {
      //? За запросы в БД отвечает сервис (форматируем id под тип данных number)
      const recipe = await RecipeService.getById(+id);

      //! Проверка на существование такой задачи (обработка негативного кейса)
      if (!recipe) {
        return res
          .status(404)
          .json(formatResponse(404, `Recipe with id ${id} not found`));
      }

      //* Успешный кейс
      res.status(200).json(formatResponse(200, 'success', recipe));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  

  
  
  
}

module.exports = RecipeController;