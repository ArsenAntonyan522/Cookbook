/* eslint-disable no-unused-vars */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fav extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: "userId" });
    }
  }
  Fav.init({
    userId: DataTypes.INTEGER,
    recipeId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Fav',
  });
  return Fav;
};