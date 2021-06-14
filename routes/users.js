const express = require("express");
const router = express.Router();
const db = require("../config/database");
const User = require("../models/User");

router.use(express.json());

router.get("/", (req, res) => {
  User.findAll().then((users) => console.log(users));
});

router.post("/createUser", (req, res) => {
  User.create(req.body)
    .then((user) => {
      res.json("User added successfully");
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
});

module.exports = router;
