//REQUIREMENTS

const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Product = require("./models/product"),
    Comment = require("./models/comment"),
    User = require("./models/user");
// seedDB = require("./seeds");


// SETTING OTHER STUFF

mongoose.connect("mongodb://localhost:27017/romiDB", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));


app.use(flash());



// SETTING ROUTES

const indexRoute = require("./routes/index"),
    carvingRoute = require("./routes/carving/carving"),
    burningRoute = require("./routes/woodburning/woodburning"),
    candleRoute = require("./routes/candlepainting/candlepainting");


// PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret: "Sahaja yoga is supporting this",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success")
    next();
});


// USING ROUTES

app.use('/', indexRoute);
app.use('/carving', carvingRoute);
app.use('/woodburning', burningRoute);
app.use('/candlepainting', candleRoute);



// app.get('*', function(req, res) {
//     res.status(404).send('what are you doing here???');
// });

// SERVER

app.listen(5000, function() {
    console.log("server started on port 5000");
});