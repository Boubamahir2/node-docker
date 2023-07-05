const express = require('express');
const userController = require('../controllers/authController.js');

const userRouter = express.Router();

// userRouter
//   .route('/')
//   .get(userController.getAllUsers)

userRouter.post('/signup', userController.signUp);
userRouter.post('/signin', userController.signIn);

module.exports = userRouter;
