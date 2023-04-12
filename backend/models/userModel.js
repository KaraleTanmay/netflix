const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "user must have username"],
        unique: [true, "this username is already taken"],
        minlength: [6, "username should have atleast 6 characters"]
    },
    email: {
        type: String,
        required: [true, "user must have email"],
        unique: [true, "this email is already used"],
        lowercase: true,
        validate: [validator.isEmail, "entered email is not valid"]
    },
    photo: {
        type: String
    },
    password: {
        type: String,
        required: [true, "user must have password"],
        minlength: [6, "password should have atleast 6 characters"],
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, "re-enter the password"],
        validate: {
            validator: function (ele) {
                return ele === this.password
            },
            message: "passwords not matched"
        }
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    passwordChangedAt: {
        type: Date,
        select: false
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetTokenExpires: {
        type: Date,
        select: false
    }
})

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
    next()
})

userSchema.methods.checkPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );

        return JWTTimestamp < changedTimestamp;
    }

    // False means NOT changed
    return false;
};

userSchema.methods.createPasswordResetToken = function () {

    const resetToken = crypto.randomBytes(32).toString("hex")

    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    this.passwordResetTokenExpires = Date.now() + 1 * 60 * 1000

    return resetToken;
}

const User = mongoose.model("Users", userSchema)

module.exports = User;