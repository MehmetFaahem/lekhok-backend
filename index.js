const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const DB = process.env.MONGO_URI;

const registerRouter = require("./routes/register");
const postRouter = require("./routes/post");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
mongoose.set("strictQuery", true);

mongoose.connect(DB);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("We also connected to the DB");
});

app.use("/register", registerRouter);
app.use("/post", postRouter);

app.post("/", (req, res) => {
  res.status(200).json({
    message: req.body.email,
  });
});

app.listen(4000, () => {
  console.log("Server is running");
});
