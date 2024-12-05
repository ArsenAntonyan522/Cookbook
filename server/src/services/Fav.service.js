const { Fav } = require("../db/models");

class FavService {
  static async getById(id) {
    return await Fav.findByPk(id);
  }

  static async getByRecipeId(recipeId, userId) {
    return await Fav.findOne({ where: { recipeId, userId } });
  }

  static async getAllFav(userId) {
    return await Fav.findAll({
      where: { userId },
    });
  }
  static async createFav(userId, recipeId) {
    const newFav = await Fav.create({ userId, recipeId });
    return newFav;
  }
  static async deleteFav(recipeId, userId) {
    const deleteFavCount = await this.getByRecipeId(recipeId, userId);
    if (deleteFavCount) {
      await deleteFavCount.destroy();
    }
    return deleteFavCount;
  }
}

module.exports = FavService;
