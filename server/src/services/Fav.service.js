const {Fav, Recipe } = require("../db/models")

class FavService {
    static async getFav(userId, recipeId) {
        return await Fav.findOne({
            where: { userId, recipeId }
        })
    }

    static async getAllFav(userId) {
        return await Fav.findAll({
            where: { userId },
            include: [{ model: Recipe }],
        })
    }
    static async createFav(userId, recipeId) {
        const newFav = await Fav.create({ userId, recipeId })
        return newFav
    }
    static async deleteFav(userId, recipeId) {
        const deleteFavCount = await this.getFav(userId, recipeId)
        if(deleteFavCount) {
            await deleteFavCount.destroy({ where: { userId, recipeId }})
        }
        return deleteFavCount
    }
}

module.exports = FavService