//call express
const express = require("express");
const cors = require("cors");

//create app for express
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express({ type: "application/vnd.api+json" }));
app.use(express.urlencoded({ extended: true }));

//routes
const userRoutes = require("./routes/user.routes");
app.use("/api/", userRoutes);

//export app
module.exports = app;
