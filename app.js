const express = require("express");

const { default: mongoose } = require("mongoose");
require("dotenv").config({ path: ".env" }); // Load environment variables here
require("./src/db/mongodb");
const { client } = require("./src/db/redis");
const app = express();
const port = 3000;
app.use(express.json());
app.use("/api/v1", require("./src/routes"));
app.use(express.static("public"));
// Middle check not found
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// Check if error is mongose error
app.use((error, req, res, next) => {
  if (error instanceof mongoose.Error.ValidationError) {
    const e = {};
    for (const field in error.errors) {
      // console.log(field);
      // console.log(error.errors);
      e[field] = error.errors[field].message;
    }
    return res.status(400).json({
      status: 400,
      message: e,
    });
  }
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;

  return res.status(statusCode).json({
    status: statusCode,
    message: error.message || "Server Error",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
