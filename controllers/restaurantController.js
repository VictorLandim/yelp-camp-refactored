const NodeGeocoder = require('node-geocoder');
const Restaurant = require('../models/restaurant');

const geocoder = NodeGeocoder({
    provider: 'opencage',
    apiKey: process.env.OPEN_CAGE_KEY
});

module.exports.index = (req, res) => {
    Restaurant.find({})
        .exec()
        .then(restaurants => res.render('restaurants/index', { restaurants }))
        .catch(e => console.log(e));
};

module.exports.new = (req, res) => res.render('restaurants/new');

module.exports.show = (req, res) => {
    const { id } = req.params;

    Restaurant.findById(id)
        .populate('comments')
        .exec()
        .then(restaurant => {
            if (restaurant) {
                return res.render('restaurants/show', { restaurant });
            }

            req.flash('error', 'Restaurant not found. 😥');
            res.redirect('/restaurants');
        })
        .catch(e => {
            console.log(e);
            req.flash('error', 'Restaurant not found. 😥');
            res.redirect('/restaurants');
        });
};

module.exports.create = (req, res) => {
    let { title, image, description, price, location } = req.body;
    const restaurant = {
        title,
        image,
        description,
        price,
        author: {
            id: req.user._id,
            username: req.user.username,
            name: req.user.name
        }
    };

    geocoder
        .geocode(location)
        .then(results => {
            if (!results || results.length === 0) {
                req.flash('error', 'Invalid location. 😕');
                return res.redirect('back');
            }
            restaurant.lat = results[0].latitude;
            restaurant.lng = results[0].longitude;
            restaurant.location = results[0].city ? results[0].city + ', ' + results[0].country : results[0].country;

            Restaurant.create(restaurant)
                .then(createdRestaurant => {
                    res.redirect('/restaurants/' + createdRestaurant._id);
                })
                .catch(e => {
                    req.flash('error', e.message + '. 😔');
                    res.redirect('back');
                });
        })
        .catch(e => {
            req.flash('error', e.message + '. 😔');
            res.redirect('back');
        });
};

module.exports.edit = (req, res) => {
    res.render('restaurants/edit');
};

module.exports.update = (req, res) => {
    const { id } = req.params;
    const { restaurant } = req.body;

    const restaurantToUpdate = {
        title: restaurant.title,
        image: restaurant.image,
        description: restaurant.description,
        price: restaurant.price
    };

    const locationToUpdate = restaurant.location;

    Restaurant.findByIdAndUpdate(id, restaurantToUpdate)
        .exec()
        .then(restaurant => {
            if (restaurant.location.name !== locationToUpdate) {
                geocoder
                    .geocode(locationToUpdate)
                    .then(results => {
                        restaurant.lat = results[0].latitude;
                        restaurant.lng = results[0].longitude;
                        restaurant.location = results[0].city
                            ? results[0].city + ', ' + results[0].country
                            : results[0].country;

                        restaurant
                            .save()
                            .then(r => {
                                req.flash('success', 'Updated successfully! 😉');
                                res.redirect('/restaurants/' + id);
                            })
                            .catch(e => {
                                req.flash('error', e.message + '. 😔');
                                res.redirect('back');
                            });
                    })
                    .catch(e => {
                        req.flash('error', e.message + '. 😔');
                        res.redirect('back');
                    });
            } else {
                req.flash('success', 'Restaurant successfully updated! 😉');
                res.redirect('/restaurants/' + id);
            }
        })
        .catch(e => {
            req.flash('error', e.message + '. 😔');
            res.redirect('back');
        });
};

module.exports.delete = (req, res) => {
    const { id } = req.params;

    Restaurant.findByIdAndRemove(id)
        .exec()
        .then(() => {
            req.flash('success', 'Restaurant successfully deleted! 😬');
            res.redirect('/restaurants');
        })
        .catch(e => {
            req.flash('error', e.message + '. 😔');
            res.redirect('back');
        });
};
