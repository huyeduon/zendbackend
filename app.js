const express = require("express");
require("dotenv").config({ path: "./src/.env" }); // Load environment variables here
require("./src/db/mongodb");
const app = express();
const port = 3000;
app.use(express.json());
app.use("/api/v1", require("./src/routes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
