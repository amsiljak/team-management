const { Sequelize } = require("sequelize");
const db = require(".././config/database");

const Task = db.define("task", {
  title: {
    type: Sequelize.STRING,
  },
  category: {
    type: Sequelize.INTEGER,
  },
  description: {
    type: Sequelize.STRING,
  },
  groupid: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Task;