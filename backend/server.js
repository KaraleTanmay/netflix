const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on("uncaughtException", (err) => {
    console.log(err.name, " : ", err.message);
    console.log("shutting down");
    process.exit(1);
})

dotenv.config({ path: "./configure.env" });

mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
        console.log("database connected");
    }).catch((err) => {
        console.log("error in database connection", err);
    })

const server = app.listen(process.env.PORT || 6000, () => {
    console.log("server has been started");
})

process.on("unhandledRejection", (err) => {
    console.log(err.name, " : ", err.message);
    console.log("shutting down");
    server.close(() => {
        process.exit(1);
    })
})