require("dotenv").config({});
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = process.env.PORT;
const morgan = require("morgan");
const mainRoutes = require("./src/routes");
const createHttpError = require("http-errors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.toString());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use("/api", mainRoutes);

// example
app.get("/", async (req, res) => {
  res.send({ message: "server its works 🐻" });
});

app.use((req, res, next) => {
  next(createHttpError.NotFound());
});

// port
app.listen(port, () => console.log(`server run on http://localhost:${port}`));
