const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const { authMiddleware } = require('../middleware');

router.route('/new').get(authMiddleware.isLoggedIn, restaurantController.new);

router
    .route('/')
    .get(restaurantController.index)
    .post(authMiddleware.isLoggedIn, restaurantController.create);

router
    .route('/:id')
    .get(restaurantController.show)
    .put(authMiddleware.checkRestaurantOwnership, restaurantController.update)
    .delete(authMiddleware.checkRestaurantOwnership, restaurantController.delete);

router.route('/:id/edit').get(authMiddleware.checkRestaurantOwnership, restaurantController.edit);

module.exports = router;
