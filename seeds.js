var mongoose = require("mongoose");
var Carving = require("./models/carving");


var data = [
    { name: "carving1", image: "./img/carving-samples.jpg", description: "blabla" },
    { name: "carving2", image: "./img/F520DOEJDF2JWC3.LARGE.jpg", description: "blabla2" },
    { name: "carving3", image: "./img/FTS7ILLJDF2JW47.LARGE.jpg", description: "blabla3" }
];



function seedDB() {
    //Remove all carving
    Carving.deleteMany({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("removed carvings!");
        //add a few carving
        data.forEach(function(seed) {
            Carving.create(seed, function(err, campground) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("added a carving");
                }
            });
        });
    });
}

module.exports = seedDB;