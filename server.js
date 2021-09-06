const express = require("express");
const app = express();
const path = require("path");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "build")));
app.use("/users", require("./routes/users"));
app.use("/groups", require("./routes/groups"));
app.use("/tasks", require("./routes/tasks"));
app.use(express.json());

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log("Server started on port " + PORT);
});
