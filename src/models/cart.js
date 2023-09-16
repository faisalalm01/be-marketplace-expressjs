'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      cart.belongsTo(models.product, { foreignKey: 'productId', as: 'products' });
    }
  }
  cart.init({
    userId: DataTypes.STRING,
    productId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cart',
  });
  return cart;
};