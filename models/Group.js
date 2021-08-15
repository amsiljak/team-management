const { Sequelize } = require("sequelize");
const db = require(".././config/database");

const Group = db.define("group", {
  no: {
    type: Sequelize.INTEGER,
  },
  theme: {
    type: Sequelize.STRING,
  },
  tutorialday: {
    type: Sequelize.STRING,
  },
});

module.exports = Group;

//kreiranje tabele u bazi
// db.sync({ });
