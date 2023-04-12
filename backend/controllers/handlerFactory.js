const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createOne = (model) => {
    return (catchAsync(async (req, res, next) => {
        const data = await model.create(req.body);
        res.status(200).json({
            status: "success",
            data
        })
    }))
}

exports.getOne = (model) => {
    return (catchAsync(async (req, res, next) => {
        const data = await model.findById(req.params.id);

        if (!data) {
            return (next(new AppError("invalid id", 404)))
        }

        res.status(200).json({
            status: "success",
            data
        })
    }))
}

exports.deleteOne = (model) => {
    return (catchAsync(async (req, res, next) => {
        const data = await model.findByIdAndDelete(req.params.id)
        if (!data) {
            return (next(new AppError("invalid id", 404)))
        }
        res.status(200).json({
            status: "success",
            data
        })

    }))
}