const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const jwt = require('jsonwebtoken');
const AppError = require("../utils/appError");
const { promisify } = require("util");
const sendMail = require("../utils/sendMail");
const crypto = require('crypto');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createSendJwtToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const options = {
        maxAge: new Date(
            Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 100
        ),
        httpOnly: true
    }
    if (process.env.ENVIRONMENT === "production") {
        options.secure = true
    }

    user.password = undefined

    res.cookie("jwt", token, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true
    })
    res.status(statusCode).json({
        status: "success",
        user
    })
}

exports.signUp = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);

    createSendJwtToken(newUser, 200, res)
})

exports.login = catchAsync(async (req, res, next) => {

    const { email, password } = req.body
    // check if email and password provided
    if (!email || !password) {
        return new AppError("please provide email and password", 400)
    }

    //check if email and password is correct
    const user = await User.findOne({ email }).select("+password");
    if (!user || ! await user.checkPassword(password, user.password)) {
        return new AppError("incorrect email or password", 401)
    }

    //send jwt
    createSendJwtToken(user, 200, res)

})

exports.protected = catchAsync(async (req, res, next) => {

    //to check if token exist in request
    let token;
    if (req.headers.cookie) {
        token = req.headers.cookie.split("=")[1]
    }
    if (!token) {
        return next(new AppError("please log in first", 401))
    }

    // verification of token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // check if user still exists
    const newUser = await User.findById(decoded.id)
    if (!newUser) {
        return next(new AppError("This user no longer exists", 401))
    }
    // check if user has changed password
    if (newUser.passwordChangedAt) {
        const changedTimestamp = parseInt(
            newUser.passwordChangedAt.getTime() / 1000,
            10
        );

        if (changedTimestamp > decoded.iat) {
            return next(new AppError("user has changed password. please log in again"))
        }
    }

    req.user = newUser
    next()
})

exports.restrictedToAdmin = (req, res, next) => {
    if (req.user.role === "user") {
        return next(new AppError("You don't have permission to perform this action", 401))
    }
    next()
}

exports.forgotPassword = catchAsync(async (req, res, next) => {

    // get user using email provided

    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new AppError("Invalid email", 404))
    }

    // create token 

    const token = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false })

    // send to user
    const url = `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${token}`
    const message = `click on the URL to reset your password. This url is valid for 10 minutes only. If you remember your password please ignore this. ${url}`
    try {
        await sendMail({
            email: user.email,
            subject: 'Your password reset token (valid for 10 min)',
            message
        });

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!'
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        console.log(err)
        return next(
            new AppError('There was an error sending the email. Try again later!'),
            500
        );
    }
})

exports.resetPassword = catchAsync(async (req, res, next) => {

    // get the user based on the token
    const hashToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({ passwordResetToken: hashToken, passwordResetExpires: { $gt: Date.now() } })

    // if the token has not expired and there is user update the password 
    if (!user) {
        return next(new AppError("token expired or invalid. please try again later", 400))
    }
    user.password = req.body.newPassword
    user.passwordConfirm = req.body.newPasswordConfirm
    user.passwordResetExpires = undefined
    user.passwordResetToken = undefined

    // update the changed passwordchangedat property and save user
    user.passwordChangedAt = Date.now()
    await user.save()

    //log the user in and send the jwt token
    createSendJwtToken(user, 200, res)

})

exports.updatePassword = catchAsync(async (req, res, next) => {

    // get the user from collection
    const user = await User.findById(req.user.id).select("+password")

    //check if the posted password is correct
    if (! await user.checkPassword(req.body.newPassword, user.password)) {
        return next(new AppError("password doesn't matched", 401))
    }

    user.password = req.body.newPassword
    user.passwordConfirm = req.body.newPasswordConfirm
    user.passwordChangedAt = Date.now() - 1000
    await user.save()

    // create ans sedn jwt token 
    createSendJwtToken(user, 200, res)

})