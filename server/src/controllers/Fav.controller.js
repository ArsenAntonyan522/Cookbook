const FavService = require("../services/Fav.service");
const formatResponse = require("../utils/formatResponse");

class FavController {
  //get - показать все лайки юзера
  static async getAllFav(req, res) {
    try {
      const { userId } = req.params;
      const favorites = await FavService.getAllFav(userId);
      return res.status(200).json(formatResponse(200, "success", favorites));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  // post recipe/:recipeId/ - добавить лайк на карточке
  static async createFav(req, res) {
    try {
      const userId = res.locals.user.id;
      const { recipeId } = req.params;
      const favorite = await FavService.createFav(userId, recipeId);
      return res.status(201).json(formatResponse(201, "success", favorite));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  // delete удаление лайка
  static async deleteFav(req, res) {
    const userId = res.locals.user.id;
    const { recipeId } = req.params;
    try {
      const deleteFav = await FavService.deleteFav(userId, recipeId);
      res
        .status(200)
        .json(formatResponse(200, `Favorite successfully deleted`, deleteFav));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  // /:recipeId/like
//   static async getRecipeFav(req, res) {
//     try {
//       const userId = res.locals.user.id;
//       const { recipeId } = req.params;
//       const recipe = await FavService.getFav(recipeId, userId);

//       if (recipe === null) {
//         res.status(404).json(null);
//         return;
//       }

//       res.status(200).json(recipe);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }
 }

module.exports = FavController;
