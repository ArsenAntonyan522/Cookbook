const router = require("express").Router();
const FavController = require("../controllers/Fav.controller");
const verifyAccessToken = require("../middleware/verifyAccessToken");

router
  .get("/", verifyAccessToken, FavController.getAllFav)
  .get("/:recipeId", verifyAccessToken, FavController.getOneFavItem) // покажет карточки, добавленные в избранное
  .post("/", verifyAccessToken, FavController.createFav)
  .delete("/:recipeId", verifyAccessToken, FavController.deleteFav);

module.exports = router;
