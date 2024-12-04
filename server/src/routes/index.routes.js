const router = require("express").Router();
const recipeRoutes = require("./recipe.routes");
const authRoutes = require("./auth.routes");
const formatResponse = require("../utils/formatResponse");

router
.use("/recipes", recipeRoutes)
.use("/auth", authRoutes);

router.use("*", (req, res) => {
  res
    .status(404)
    .json(formatResponse(404, "Not found", null, "Resource not found"));
});

module.exports = router;
