var express = require("express"),
    router = express.Router(),
    Carving = require("../models/carving");




// ROOT ROUTE

//INDEX - show all carvings
router.get("/", function(req, res) {
    // Get all carvings from DB
    Carving.find({}, function(err, allCarvings) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { carving: allCarvings });
        }
    });
});

//CREATE - add new carving to DB
router.post("/", function(req, res) {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCarving = { name: name, image: image, description: description }
        // Create a new campground and save to DB
    Carving.create(newCarving, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("carving");
        }
    });
});


module.exports = router;