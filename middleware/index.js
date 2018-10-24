var product = require("../models/product");
var Comment = require("../models/comment");

// all the middlware goes here
var middlewareObj = {};

middlewareObj.checkProductOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        product.findById(req.params.id, function(err, foundProduct) {
            if (err || !foundProduct) {
                req.flash("error", "Post not found")
                res.redirect("back");
            } else {
                // does user own the post?
                if (foundProduct.author.id.equals(req.user._id) || req.user.username === "romana") {
                    next();
                } else {
                    req.flash("error", "You have no permissions");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err || !foundComment) {
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
                // does user own the comment?
                if (foundComment.author.id.equals(req.user._id) || req.user.username === "romana") {
                    next();
                } else {
                    req.flash("error", "You have no permissions");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in");
        res.redirect("back");
    }
}


middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in");
    res.redirect("/login");
}

module.exports = middlewareObj;