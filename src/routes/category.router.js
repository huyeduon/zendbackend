const express = require("express");
const router = express.Router();

const {
  getAllCategory,
  postCategory,
} = require("../controllers/category.controller");

router.get("/", getAllCategory);
router.post("/", postCategory);

module.exports = router;
