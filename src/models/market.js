'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class market extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      market.hasMany(models.product, {
        foreignKey: 'marketId',
        as: 'product'
      })
      // define association here
    }
  }
  market.init({
    logo: DataTypes.STRING,
    nama: DataTypes.STRING,
    banner: DataTypes.STRING,
    address: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    userId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'market',
  });
  return market;
};