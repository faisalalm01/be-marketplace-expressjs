"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.belongsTo(models.simpulRempah);
    }
  }
  user.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.STRING,
      simpulrempahId: DataTypes.STRING,
      provinsi: DataTypes.STRING,
      kota: DataTypes.STRING,
      kecamatan: DataTypes.STRING,
      kode_pos: DataTypes.STRING,
      nohp: DataTypes.STRING,
      verify: DataTypes.BOOLEAN,
      verifyToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
