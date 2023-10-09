"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("orders", "status_bayar", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("orders", "status_kirim", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("orders", "token_transaction", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orders");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
