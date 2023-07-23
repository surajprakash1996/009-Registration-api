require("./config/connection");

const express = require("express");
const app = express();
const indexRoutes = require("./routes/index.routes");
const morgan = require("morgan");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(morgan("dev"));

app.use(indexRoutes);

module.exports = app;
