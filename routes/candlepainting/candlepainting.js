const express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    product = require("../../models/product"),
    middleware = require("../../middleware");
// seedDB = require("../../seeds");


// ROOT ROUTE

//INDEX - show all space posts
router.get("/", function(req, res) {
    //get space posts from DB
    product.find({}, function(err, allProducts) {
        if (err) {
            console.log(err);
        } else {
            res.render("candlepainting/candlepainting", { products: allProducts });

        }
    });
});

// CREATE POST 

router.post("/", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var text = req.body.text;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newPost = {
        name: name,
        image: image,
        description: description,
        text: text,
        author: author
    }
    product.create(newPost, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/candlepainting")

        }
    })
});

//FORM FOR NEW POST

router.get("/newProduct", middleware.isLoggedIn, function(req, res) {
    res.render("candlepainting/newProduct");
});

// GET COMPLETE POST

router.get("/:id", function(req, res) {
    product.findById(req.params.id).populate("comments").exec(function(err, foundProduct) {
        if (err || !foundProduct) {
            req.flash("error", "Product not found");
            res.redirect("back");
        } else {
            console.log(foundProduct)
            res.render("candlepainting/showCandlePost", { product: foundProduct });
        }
    });
});

// EDIT POST ROUTE

router.get("/:id/edit", middleware.checkProductOwnership, function(req, res) {
    product.findById(req.params.id, function(err, foundProduct) {
        res.render("candlepainting/edit", { product: foundProduct });
    })
})

// UPDATE POST ROUTE

router.put("/:id", middleware.checkProductOwnership, function(req, res) {
    product.findByIdAndUpdate(req.params.id, req.body.product, function(err, updatedProduct) {
        if (err) {
            res.redirect("/candlepainting");
        } else {
            res.redirect("/candlepainting/" + req.params.id);
        }
    });
});

// DESTROY POST ROUTE

router.delete("/:id", middleware.checkProductOwnership, function(req, res) {
    product.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/candlepainting");
        } else {
            req.flash("success", "Post deleted");
            res.redirect("/candlepainting");
        }
    })
})





module.exports = router;