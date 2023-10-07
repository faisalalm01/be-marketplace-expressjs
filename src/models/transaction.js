"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.order);
      transaction.belongsTo(models.user);
    }
  }
  transaction.init(
    {
      userId: DataTypes.STRING,
      orderId: DataTypes.STRING,
      total: DataTypes.STRING,
      status: DataTypes.STRING,
      token_transaction: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "transaction",
    }
  );
  return transaction;
};
