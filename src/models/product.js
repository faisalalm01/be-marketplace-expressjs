'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      product.belongsTo(models.market, {
        foreignKey: 'marketId',
        as: 'markets'
      })
      product.belongsTo(models.kategori, { foreignKey: 'kategori', as: 'kategoris' });

      
      // define association here
    }
  }
  product.init({
    image: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    marketId: DataTypes.STRING,
    userId: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    kategori: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};