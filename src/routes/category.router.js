const express = require("express");
const router = express.Router();

const {
  getAllCategory,
  postCategory,
  getCategoryById,
  deleteCategoryById,
  updateCategoryById,
} = require("../controllers/category.controller");

const { asyncHandle } = require("../utils/asyncHandle");

router.get("/", asyncHandle(getAllCategory));
router.post("/", asyncHandle(postCategory));
router.get("/:id", asyncHandle(getCategoryById));
router.delete("/:id", asyncHandle(deleteCategoryById));
router.put("/:id", asyncHandle(updateCategoryById));
module.exports = router;
