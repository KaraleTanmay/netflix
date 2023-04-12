const express = require('express');
const authController = require('../controllers/authControllers');

const userRouter = express.Router();

userRouter.post("/signup", authController.signUp)
userRouter.post("/login", authController.login)
userRouter.patch("/updatePassword", authController.protected, authController.updatePassword)

userRouter.post("/forgotPassword", authController.forgotPassword)
userRouter.patch("/resetPassword/:token", authController.resetPassword)

module.exports = userRouter