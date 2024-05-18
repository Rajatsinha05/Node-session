const User = require("../models/user");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;

const localStrategyInitializer = (passport) => {
  passport.use(
    new localStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        let user = await User.findOne({ where: { email: email } });

        
        if (!user) {
          return done(null, false);
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false);
        }
        return done(null, user);
      }
    )
  );
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    let user = await User.findByPk(id);
    return done(null, user);
  });
};

module.exports = localStrategyInitializer;
