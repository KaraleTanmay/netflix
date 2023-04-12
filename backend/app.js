const express = require('express');
const morgan = require('morgan');
const movieRouter = require('./routes/movieRoutes');
const userRouter = require('./routes/userRoutes');
const cors = require('cors');
const AppError = require('./utils/appError');
const errorController = require('./controllers/errorController');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const ExpressMongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');


const app = express()

app.use(helmet())
app.use(ExpressMongoSanitize())
app.use(xss())

const limiter = rateLimiter({
    max: 100,
    windowMS: 1 * 60 * 60 * 1000,
    messgae: "too many requests. please try again in an hour"
})
app.use("/api", limiter)

// use after implementing query in movies section
// app.use(hpp())


app.use(express.json({
    limit: "10kb"
}))
app.use(cookieParser())
app.use(cors({
    origin: '*'
}));

app.use(morgan("dev"))


app.use("/api/v1/movies", movieRouter)
app.use("/api/v1/users", userRouter)

app.all("*", (req, res, next) => {
    next(new AppError("this route is not available on this server", 404))
})

app.use(errorController);

module.exports = app;