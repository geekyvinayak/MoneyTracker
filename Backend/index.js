const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const routes = require("./routes/Route");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

const PORT = 5000;

var corsOptions = {
    origin: 'https://moneytracker-sigma.vercel.app',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use(express.json());
app.use(cors(corsOptions));

mongoose
  .connect(process.env.URI)
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

app.use("/", routes);

app.listen(PORT, console.log("Listening at " + PORT));
