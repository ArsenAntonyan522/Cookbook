const router = require("express").Router()
const FavController = require("../controllers/Fav.controller")
const verifyAccessToken = require('../middleware/verifyAccessToken');


router
.get('/fav', verifyAccessToken, FavController.getAllFav) // покажет карточки, добавленные в избранное

.post('/:recipeId/fav', verifyAccessToken, FavController.createFav)
.delete('/recipeId/', verifyAccessToken, FavController.deleteFav)







module.exports = router;