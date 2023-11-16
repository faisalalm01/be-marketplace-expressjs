const { withDatabase } = require("@railway/sequelize")
module.exports = withDatabase({
  dialect: "mysql",
  connection: process.env.MYSQL_URL,
})
// const { withDatabase } = require('@railway/sequelize')
