const express = require("express");
const router = express.Router();

let data = [
  {
    id: 1,
    name: "duy",
  },
];

router.get("/", (req, res) => {
  res.send(data);
});

router.post("/", (req, res) => {
  const newName = {
    id: data.length + 1,
    name: req.body.name,
  };
  console.log(req.body);
  data.push(newName);
  res.send("Posted");
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const editedIndex = data.findIndex((item) => item.id === parseInt(id));
  data[editedIndex]["name"] = name;

  res.send("Updated");
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  data = data.filter((item) => item.id !== parseInt(id));
  res.send(`Deleted ${id}`);
});

module.exports = router;
