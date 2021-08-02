const express = require("express");
const router = express.Router();
const db = require("../config/database");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { response } = require("express");
const saltRounds = 10;

router.use(express.json());

router.get("/", (req, res) => {
  User.findAll().then((users) => console.log(users));
});

router.post("/createUser", (req, res) => {
  console.log(req.body);
  console.log(req.body.password);
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    const user = {
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hash,
    };
    User.create(user)
      .then(() => {
        res.json("User added successfully");
      })
      .catch((err) => {
        res.status(400).send("unable to save to database");
      });
  });
});

router.post("/login", (req, res) => {
  User.findAll({
    where: { email: req.body.email },
  })
    .then((result) => {
      if (result.length > 0) {
        bcrypt.compare(
          req.body.password,
          result[0].password,
          (error, response) => {
            if (response) res.send({ message: "Success!" });
            else
              res.send({
                message: "Email or password isn't correct!",
              });
          }
        );
      } else res.send({ message: "Email or password isn't correct!" });
    })
    .catch((err) => {
      res.status(400).send({ message: "User not found" });
    });
});
module.exports = router;
