const Restaurant = require('../models/restaurant');
const Comment = require('../models/comment');

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Please login to proceed. 😬');
    res.redirect('/login');
};

const checkRestaurantOwnership = (req, res, next) => {
    const { id } = req.params;

    if (req.isAuthenticated()) {
        Restaurant.findById(id)
            .exec()
            .then(restaurant => {
                if (restaurant.author.id.equals(req.user._id)) {
                    res.locals.restaurant = restaurant;
                    next();
                } else {
                    req.flash('error', "You don't have permission to modify this restaurant. 😠");
                    res.redirect('back');
                }
            })
            .catch(e => {
                console.log(e);
                req.flash('error', 'Could not fetch the requested restaurant. 😔');
                res.redirect('back');
            });
    } else {
        req.flash('error', 'Please login to proceed. 😬');
        res.redirect('back');
    }
};

const checkCommentOwnership = (req, res, next) => {
    const { commentId } = req.params;

    if (req.isAuthenticated()) {
        Comment.findById(commentId)
            .exec()
            .then(comment => {
                if (comment.author.id.equals(req.user._id)) {
                    res.locals.comment = comment;
                    next();
                } else {
                    req.flash('error', "You don't have permission to modify this restaurant. 😠");
                    res.redirect('back');
                }
            })
            .catch(e => {
                console.log(e);
                req.flash('error', 'Could not fetch the requested comment. 😔');
                res.redirect('back');
            });
    } else {
        req.flash('error', 'Please login to proceed. 😬');
        res.redirect('back');
    }
};

module.exports = { isLoggedIn, checkRestaurantOwnership, checkCommentOwnership };
