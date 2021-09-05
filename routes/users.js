const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");
const initializePassport = require("../passport-config");

router.use(express.json());

initializePassport(
  passport,
  async (email) => {
    user = await User.findOne({ where: { email: email } });
    return user;
  },
  async (id) => {
    user = await User.findOne({ where: { id: id } });
    return user;
  }
);

router.get("/", (req, res) => {
  User.findAll({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send({ message: "No users" });
    });
});

router.get("/loggedInUser", (req, res) => {
  if(req.user) res.send(req.user);
  else res.send({message: "User not logged in"});
})

router.post("/createUser", (req, res) => {
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
      .then((result) => {
        res.json(result.id);
      })
      .catch((err) => {
        res.status(400).send("Unable to save to database");
      });
  });
});

router.post(
  "/login", 
  passport.authenticate("local"),
  (req, res) => {
    if (req.user) {
      res.send(req.user);
    } else res.status(400).send({ message: "Fail" });
  }
);

router.post("/setGroup", (req, res) => {
  User.update({ groupid: req.body.groupId }, { where: { id: req.body.userId } })
    .then(() => {
      res.json("Group set successfully");
    })
    .catch((err) => {
      res.status(400).send("Unable to save to database");
    });
});

router.post("/updateUser", (req, res) => {
  User.update({ name: req.body.name, lastname: req.body.lastname, email: req.body.email }, { where: { id: req.user.id } })
    .then(() => {
      res.json("User updated successfully");
    })
    .catch((err) => {
      res.status(400).send("Unable to save to database");
    });
});

router.delete("/", (req, res) => {
  User.destroy({ where: { } }).then();
});

router.post("/logout", (req, res) => {
  req.logOut();
  res.send({ message: "Success" });
});

module.exports = router;
