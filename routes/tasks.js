const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.use(express.json());

router.post("/createTask", (req, res) => {
  Task.create(req.body)
    .then(() => {
      res.json("Task added successfully");
    })
    .catch((err) => {
      res.status(400).send("Unable to save to database");
    });
});

module.exports = router;
