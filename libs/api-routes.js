const express = require('express');
const router = express.Router();
var db = require("../models");
var passport = require("../config/passport");

router.post('/api/login', passport.authenticate("local"), function (req, res) {
    res.json("/members");
});
router.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.User.create({
        email: req.body.email,
        password: req.body.password
    }).then(function () {
        res.redirect(307, "/api/login");
    }).catch(function (err) {
        console.log(err);
        res.status(500).json(err);
        // res.status(422).json(err.errors[0].message);
    });
});
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect("/");
});

router.get("/api/user_data", function (req, res) {
    if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({});
    } else {
        // Otherwise send back the user's email and id
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({
            email: req.user.email,
            id: req.user.id
        });
    }
});

module.exports = router;