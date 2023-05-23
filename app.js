const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("tiny"));
const cors = require("cors");
const router = require("./src/routes/index.route");
const authJwt = require("./src/middlewares/express-jwt");
const { errorHandler } = require("./src/middlewares/error-handler");
require("dotenv").config();

app.use("/api/v1", router);
app.use(cors());
app.options("*", cors());
app.use(authJwt)
app.use(errorHandler)

mongoose
  .connect(process.env.db, { useUnifiedTopology: true, dbName: "puppy-plaza" })
  .then(() => {
    console.log("Database connection ready....");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
