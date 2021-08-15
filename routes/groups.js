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
      res.status(400).send("Unable to save to database");
    });
});

router.get("/getAllGroups", (req, res) => {
  Group.findAll({})
    .then((result) => res.send(result))
    .catch(() => res.status(400));
});

module.exports = router;
