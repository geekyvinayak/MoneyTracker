const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const routes = require("./routes/Route");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

const PORT = 5000;

var whitelist = ['https://moneytracker-sigma.vercel.app', 'http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
// var corsOptions = {
//     origin: 'moneytracker-sigma.vercel.app',
//     optionsSuccessStatus: 200 // For legacy browser support
// }

app.use(express.json());
app.use(cors(corsOptions));

mongoose
  .connect(process.env.URI)
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

app.use("/", routes);

app.listen(PORT, console.log("Listening at " + PORT));
