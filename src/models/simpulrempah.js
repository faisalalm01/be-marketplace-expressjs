"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class simpulRempah extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      simpulRempah.hasMany(models.market, {
        foreignKey: "simpulrempahId",
        as: "markets",
      });
    }
  }
  simpulRempah.init(
    {
      nama: DataTypes.STRING,
      alamat: DataTypes.STRING,
      logo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "simpulRempah",
    }
  );
  return simpulRempah;
};
