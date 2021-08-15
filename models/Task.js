const { Sequelize } = require("sequelize");
const db = require(".././config/database");

const Task = db.define("task", {
  title: {
    type: Sequelize.STRING,
  },
  category: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
});

module.exports = Task;