const Restaurant = require('../models/restaurant');
const Comment = require('../models/comment');

module.exports.new = (req, res) => {
    const { id } = req.params;
    Restaurant.findById(id)
        .exec()
        .then(restaurant => {
            if (restaurant) {
                return res.render('comments/new', { restaurant });
            }
            req.flash('error', 'Could not fetch the requested restaurant.');
            res.redirect('back');
        })
        .catch(e => {
            console.log(e);
            req.flash('error', 'Could not fetch the requested restaurant.');
            res.redirect('back');
        });
};

module.exports.create = (req, res) => {
    const { id } = req.params;
    let { comment } = req.body;

    Restaurant.findById(id)
        .exec()
        .then(restaurant => {
            if (restaurant) {
                Comment.create(comment)
                    .then(createdComment => {
                        createdComment.author = {
                            username: req.user.username,
                            name: req.user.name,
                            id: req.user._id
                        };
                        createdComment
                            .save()
                            .then(savedComment => {
                                restaurant.comments.push(savedComment);
                                restaurant
                                    .save()
                                    .then(() => {
                                        req.flash('success', 'Successfully posted comment.');
                                        res.redirect('/restaurants/' + id);
                                    })
                                    .catch(e => {
                                        console.log(e);
                                        req.flash('error', 'Could not save the restaurant.');
                                        res.redirect('back');
                                    });
                            })
                            .catch(e => {
                                console.log(e);
                                req.flash('error', 'Could not save the comment.');
                                res.redirect('back');
                            });
                    })
                    .catch(e => {
                        console.log(e);
                        req.flash('error', 'Could not create the comment.');
                        res.redirect('back');
                    });
            }
        })
        .catch(e => {
            console.log(e);
            req.flash('error', 'Could not fetch the requested restaurant.');
            res.redirect('back');
        });
};

module.exports.edit = (req, res) => {
    const restaurantId = req.params.id;
    const { commentId } = req.params;

    Comment.findById(commentId)
        .exec()
        .then(comment => {
            if (comment) {
                return res.render('comments/edit', { comment, restaurantId });
            }

            req.flash('error', 'Could not fetch the requested comment. 😔');
            res.redirect('back');
        })
        .catch(e => {
            console.log(e);
            req.flash('error', 'Could not fetch the requested comment. 😔');
            res.redirect('back');
        });
};

module.exports.update = (req, res) => {
    const restaurantId = req.params.id;
    const commentId = req.params.commentId;
    const { comment } = req.body;

    Comment.findByIdAndUpdate(commentId, comment)
        .exec()
        .then(comment => {
            req.flash('success', 'Comment successfully updated! 😉');
            res.redirect('/restaurants/' + restaurantId);
        })
        .catch(e => {
            console.log(e);
            req.flash('error', 'Could not fetch the requested comment. 😔');
            res.redirect('back');
        });
};

module.exports.delete = (req, res) => {
    const { id, commentId } = req.params;

    Comment.findByIdAndRemove(commentId)
        .exec()
        .then(() => {
            req.flash('success', 'Comment successfully deleted. 😬');
            res.redirect('/restaurants/' + id);
        })
        .catch(e => {
            console.log(e);
            req.flash('error', 'Could not fetch the requested comment. 😔');
            res.redirect('back');
        });
};
