const AppError = require("../utils/appError")

const handleCastError = (err) => {
    const message = `Invalid ${err.path} : ${err.value}`;
    return (new AppError(message, 400));
}

const handleDuplicateKeyError = (err) => {
    const message = `Duplicate name : ${err.keyValue.name}`;
    return new AppError(message, 400);
}

const handleValidatorError = (err) => {
    const errors = Object.values(err.errors).map((val) => { return val.message })
    const message = `invalid input data. ${errors.join(". ")}`;
    return new AppError(message, 400);
}

const handleJsonWebTokenError = (err) => {
    return new AppError("Invalid token", 401);
}

const handleExpiredTokenError = (err) => {
    return new AppError("session expired. please log in again", 401);
}

sendDevErr = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack

    })
}

sendProdErr = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }
    else {
        console.log(err);
        res.status(500).json({
            status: "fail",
            message: "something went wrong"
        })
    }
}

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error"

    if (process.env.ENVIRONMENT == "development") {
        return sendDevErr(err, res)
    }
    else if (process.env.ENVIRONMENT == "production") {

        let error = { ...err };
        if (err.name === "CastError") {
            error = handleCastError(err);
        }
        if (err.code == 11000) {
            error = handleDuplicateKeyError(err);
        }
        if (err.name === "ValidationError") {
            error = handleValidatorError(err);
        }
        if (err.name === "JsonWebTokenError") {
            error = handleJsonWebTokenError(err);
        }
        if (err.name === "TokenExpiredError") {
            error = handleExpiredTokenError(err);
        }

        sendProdErr(error, res);
    }

}