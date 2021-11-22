const passport = require("passport");

const { Router } = require("express");
const { serializeUser } = require("passport");
const router = new Router();
const UserInfo = require("../../models/UserInfo.model");
const User = require("../../models/User.model");
const axios = require("axios");

// User model

router.get("/auth/login", passport.authenticate("steam"), function (req, res) {
  // The request will be redirected to Steam for authentication, so
  // this function will not be called.
});

router.get(
  "/auth/login/return",
  passport.authenticate("steam", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/account");
  }
);

router.get("/", function (req, res) {
  res.render("index", { user: req.user });
});

router.get("/account", ensureAuthenticated, function (req, res) {
  axios
    .get(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.API_KEY}&steamids=${req.user.steamid}`
    )
    .then(async (userinfo) => {
      let userStats = userinfo?.data?.response?.players[0];
      let usersteamid = userinfo?.data?.response?.players[0].steamid;

      let check = await UserInfo.findOne({
        "players.steamid": `${usersteamid}`,
      });

      if (check != null) {
        console.log("found it");
        res.render("account", { user: userStats });
      } else {
        UserInfo.create({ players: userStats })
          .then(() => {
            console.log(userStats);
            res.render("account", { user: userStats });
          })
          .catch((err) => {});
      }
    })
    .catch((err) => {});
});

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
module.exports = router;
