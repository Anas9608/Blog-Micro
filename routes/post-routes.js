const express = require('express');
const router = express.Router();
const { findAllPosts, createPost, findPostById, updatePostById, deletePostById } = require('../controllers/post-controller');
const protect = require('../middlewares/auth-middleware');

router
.route('/')
.get(protect, findAllPosts)
.post(protect, createPost);

router
.route('/:id')
.get(protect, findPostById)
.post(protect, updatePostById)
.delete(protect, deletePostById);


module.exports = router;