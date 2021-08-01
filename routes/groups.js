const express = require("express");
const Group = require("../models/Group");
const router = express.Router();

router.use(express.json());

router.post("/createGroup", (req, res) => {
  Group.create(req.body)
    .then(() => {
      res.json("Group added successfully");
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
});

module.exports = router;