const express = require("express");
require("dotenv").config({ path: ".env" }); // Load environment variables here
require("./src/db/mongodb");
const app = express();
const port = 3000;
app.use(express.json());
app.use("/api/v1", require("./src/routes"));

// Middle check not found
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
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
