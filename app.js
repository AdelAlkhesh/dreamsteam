// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const session = require("express-session");
const MongoStore = require("connect-mongo");

const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const SteamStrategy = require("passport-steam").Strategy;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, // <== false if you don't want to save empty session object to the store
    cookie: {
      maxAge: 60000 * 1000, // 60 * 1000 ms === 1 min
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/dreamsteam",
    }),
  })
);
const User = require("./models/User.model.js");

// ...

passport.serializeUser((user, cb) => cb(null, user._id));

passport.deserializeUser((id, cb) => {
  User.findById(id)
    .then((user) => cb(null, user))
    .catch((err) => cb(err));
});

passport.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:3000/auth/login/return",
      realm: "http://localhost:3000/",
      apiKey: process.env.API_KEY,
    },
    async function (identifier, profile, done) {
      
        const steamidsplit = identifier.split("https://steamcommunity.com/openid/id/");
        const steamid = steamidsplit[1]
      try {
        let userResponse = await User.findOne({ steamid });
        if (userResponse) {
          done(null, userResponse);
        } else {
          let newUser = await User.create({ steamid });
          return done(null, newUser);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());




// default value for title local
const projectName = "dreamsteam";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const loginSteam = require("./routes/auth-routes/authSteam.routes");
app.use("/", loginSteam);

const login = require("./routes/auth-routes");
app.use("/", login);

const games = require("./routes/game-routes")
app.use("/", games)

module.exports = app;

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
