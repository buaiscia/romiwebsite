var mongoose = require("mongoose");

var carvingSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String

});

module.exports = mongoose.model("Carving", carvingSchema);