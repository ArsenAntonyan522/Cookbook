const router = require('express').Router(); // новая строчечка
const RecipeController = require("../controllers/Recipe.controller")

router.get('/', RecipeController.getAllRecipes)
.get('/:id', RecipeController.getRecipeById)
 
module.exports = router