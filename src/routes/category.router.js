const express = require("express");
const router = express.Router();

const {
  getAllCategory,
  postCategory,
  getCategoryById,
  deleteCategoryById,
  updateCategoryById,
} = require("../controllers/category.controller");

router.get("/", getAllCategory);
router.post("/", postCategory);
router.get("/:id", getCategoryById);
router.delete("/:id", deleteCategoryById);
router.put("/:id", updateCategoryById);
module.exports = router;
