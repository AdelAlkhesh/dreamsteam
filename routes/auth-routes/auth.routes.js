const passport = require("passport");

const { Router } = require("express");
const { serializeUser } = require("passport");
const router = new Router();

// User model

router.get("/auth/login", passport.authenticate("steam"), function (req, res) {
  // The request will be redirected to Steam for authentication, so
  // this function will not be called.
});

router.get(
  "/auth/login/return",
  passport.authenticate("steam", { failureRedirect: "/login" }),
  function (req, res) {
    console.log(req.steamid);
    // req.session.Userinfo =  
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

router.get("/", function (req, res) {
  res.render("index", { user: req.user });
});

router.get("/account", ensureAuthenticated, function (req, res) {
  res.render("account", { user: req.user });
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

