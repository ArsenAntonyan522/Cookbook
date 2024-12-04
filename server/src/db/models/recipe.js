"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    static associate({ User, Fav }) {
      this.belongsToMany(User, {

        foreignKey: "recipeId",

        through: Fav,
      });
    }
  }



  Recipe.init({
    title: DataTypes.STRING,
    ingredient: DataTypes.STRING,
    image: DataTypes.STRING,
    instruction: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Recipe',
  });

  return Recipe;
};
