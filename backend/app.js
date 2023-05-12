const express = require("express");
const app = express();
//Handles incoming Json Requests
const bodyparser = require("body-parser");
//Database
const mongoose = require("mongoose");
//Products Routes
const productRoutes = require("./Routes/products.routes");
//Users Route
const userRoutes = require("./Routes/users.routes");

//Connecting to the database
mongoose
    .connect(
        "mongodb+srv://temple69:wAbMkgwP8UEs8QCS@cluster0.951jgvf.mongodb.net/products_database?retryWrites=true&w=majority"
    )
    .then(() => {
        console.log("Connected to database");
    })
    .catch((error) => {
        console.log("Connection Failed" + error);
    });

app.use(bodyparser.json());
//Configurations for the browser
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin,Accept,Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    next();
});
//Middleware for the Products
app.use("/api/products", productRoutes);
//Middleware for the Users
app.use("/api/user", userRoutes);

module.exports = app;