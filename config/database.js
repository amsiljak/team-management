const { Sequelize } = require("sequelize");

module.exports = new Sequelize("heroku_226895e87edce9d", "b513d934893deb", "b1ed542b", {
  host: "us-cdbr-east-04.cleardb.com",
  dialect: "mysql",
});