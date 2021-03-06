const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUserByEmail, getUserById) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        const user = await getUserByEmail(email);
        if (user == null) {
          return done(null, false, {
            message: "Email or password isn't correct!",
          });
        }
        try {
          if (await bcrypt.compare(password, user.password)) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: "Email or password isn't correct!",
            });
          }
        } catch (e) {
          return done(e);
        }
      }
    )
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => done(null, await getUserById(id)));
}

module.exports = initialize;
