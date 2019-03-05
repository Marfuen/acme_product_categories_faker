const Sequelize = require("sequelize");
const DATABASE_URL = "postgres://localhost/acmeprodcatfaker"

module.exports = new Sequelize(process.env.DATABASE_URL || DATABASE_URL, {
  dialect: 'postgres'
})
