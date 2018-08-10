const express = require('express');
const router = express.Router({ mergeParams: true });
const commentController = require('../controllers/commentController');
const { authMiddleware } = require('../middleware');

router
    .get('/new', authMiddleware.isLoggedIn, commentController.new)
    .post('/', authMiddleware.isLoggedIn, commentController.create)
    .get('/:commentId/edit', authMiddleware.checkCommentOwnership, commentController.edit)
    .put('/:commentId', authMiddleware.checkCommentOwnership, commentController.update)
    .delete('/:commentId', authMiddleware.checkCommentOwnership, commentController.delete);

module.exports = router;
