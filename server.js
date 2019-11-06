const express = require('express');
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require('./config/passport');

const apiRoutes = require('./libs/api-routes');
const htmlRoutes = require('./libs/html-routes');
//
var PORT = process.env.PORT || 3000;
var db = require("./models");
//
const app = express();
app.use(bodyParser.urlencoded({ extended: false })); //For body parser
app.use(bodyParser.json());
app.use(express.static("public"));
//
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(apiRoutes);
app.use(htmlRoutes);


db.sequelize.sync().then(function(){
    app.listen(PORT, () => console.log('Passport app listening on port %s', PORT))
})

module.exports = app;