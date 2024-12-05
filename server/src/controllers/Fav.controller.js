const FavService = require("../services/Fav.service");
const formatResponse = require("../utils/formatResponse");

class FavController {
  static async getOneFavItem(req, res) {
    try {
      const { user } = res.locals;
      const userId = user.id;
      const { recipeId } = req.params;
      const favorite = await FavService.getByRecipeId(recipeId, userId);
      if (!favorite) {
       return  res
        .status(404)
        .json(formatResponse(404, "Not found", null,  "Not found"));
    }
      return res.status(200).json(formatResponse(200, "success", favorite));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async getAllFav(req, res) {
    try {
      const { user } = res.locals;
      const userId = user.id;
      const favorites = await FavService.getAllFav(userId);
      return res.status(200).json(formatResponse(200, "success", favorites));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async createFav(req, res) {
    try {
      const { user } = res.locals;
      const userId = user.id;
      const { recipeId } = req.body;
      const favorite = await FavService.createFav(userId, recipeId);
      return res.status(201).json(formatResponse(201, "success", favorite));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async deleteFav(req, res) {
    const { user } = res.locals;
    const userId = user.id;
    const { recipeId } = req.params;
    try {
      const favToDelete = await FavService.getByRecipeId(recipeId, userId);

      if (favToDelete && favToDelete.userId !== userId) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              "No rights to delete like",
              null,
              "No rights to delete like"
            )
          );
      }
      const deleteFav = await FavService.deleteFav(recipeId, userId);
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
}

module.exports = FavController;
