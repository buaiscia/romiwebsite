const express = require("express"),
    router = express.Router({ mergeParams: true }),
    bodyParser = require("body-parser"),
    product = require("../../models/product"),
    Comment = require("../../models/comment"),
    middleware = require("../../middleware");



// ====================
// COMMENTS ROUTES
// ====================

router.get("/new", middleware.isLoggedIn, function(req, res) {
    product.findById(req.params.id, function(err, product) {
        if (err || !product) {
            req.flash("error", "Post not found")
            res.redirect("back");
        } else {
            res.render("comments/new", { product: product });
        }
    })
});

router.post("/", middleware.isLoggedIn, function(req, res) {
    product.findById(req.params.id, function(err, product) {
        if (err) {
            res.redirect("back");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    req.flash("error", "Something went wrong");
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    product.comments.push(comment);
                    product.save();
                    console.log(comment);
                    req.flash("success", "Successfully added comment");
                    res.redirect("/candlepainting/" + product._id);
                }
            });
        }
    });
});


// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    product.findById(req.params.id, function(err, foundProduct) {
        if (err || !foundProduct) {
            req.flash("error", "Post not found");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                res.redirect("back");
            } else {
                res.render("comments/editCandle", { product_id: req.params.id, comment: foundComment });
            }
        });
    });

});

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment updated");
            res.redirect("/candlepainting/" + req.params.id);
        }
    });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/candlepainting/" + req.params.id);
        }
    });
});


module.exports = router;