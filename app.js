const express = require("express");
require("./src/db/mongodb");
const app = express();
const port = 3000;
app.use(express.json());
app.use("/", require("./src/routes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
