const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.use(express.json());

router.post("/createTask", (req, res) => {
  const task = {
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    groupid: req.user.groupid,
  };

  Task.create(task)
    .then(() => {
      res.json("Task added successfully");
    })
    .catch((err) => {
      res.status(400).send("Unable to save to database");
    });
});

router.get("/getAllTasks", (req, res) => {
  Task.findAll({where: {groupid: req.user.groupid}})
    .then((result) => res.send(result))
    .catch(() => res.status(400));
});

router.delete("/", (req, res) => {
  Task.destroy({ where: { title: "" } });
});

module.exports = router;
