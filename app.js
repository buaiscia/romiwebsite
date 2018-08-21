//REQUIREMENTS

var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Carving = require("./models/carving"),
    seedDB = require("./seeds");


// SETTING OTHER STUFF

mongoose.connect("mongoDB://localhost:27017/romiDB", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();



// SETTING ROUTES

var indexRoute = require("./routes/index"),
    carvingRoute = require("./routes/carving"),
    burningRoute = require("./routes/woodburning"),
    candleRoute = require("./routes/candlepainting");


// USING ROUTES

app.use('/', indexRoute);
app.use('/carving', carvingRoute);
app.use('/woodburning', burningRoute);
app.use('/candlepainting', candleRoute);



// SERVER

app.listen(3000, function() {
    console.log("server started on port 3000");
});