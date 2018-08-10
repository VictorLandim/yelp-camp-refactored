const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router
    .route('/register')
    .get(authController.showRegister)
    .post(authController.register);

router
    .route('/login')
    .get(authController.showLogin)
    .post(authController.login);

router.route('/logout').get(authController.logout);

module.exports = router;
