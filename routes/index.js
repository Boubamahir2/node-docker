const express = require('express');
const postController = require('../controllers/postController.js');
const authorize = require('../middleware/auth.js');

const postRouter = express.Router();

postRouter
  .route('/')
  .get(postController.getAllPosts)
  .post(authorize, postController.createPost);

postRouter
  .route('/:id')
  .get(postController.getOnePost)
  .patch(authorize, postController.updatePost)
  .delete(authorize, postController.deletePost);

module.exports = postRouter;
