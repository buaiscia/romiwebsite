//REQUIREMENTS

var express = require("express"),
    app = express();

// SETTING ROUTES

var indexRoute = require("./routes/index"),
    carvingRoute = require("./routes/carving"),
    burningRoute = require("./routes/woodburning"),
    candleRoute = require("./routes/candlepainting");


// SETTING OTHER STUFF
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));



// USING ROUTES

app.use('/', indexRoute);
app.use('/carving', carvingRoute);
app.use('/woodburning', burningRoute);
app.use('/candlepainting', candleRoute);



// SERVER

app.listen(3000, function() {
    console.log("server started on port 3000");
});