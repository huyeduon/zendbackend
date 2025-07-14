const express = require("express");
const router = express.Router();
const { authorization } = require("../middlewares/auth.middleware");

const {
  getAllCategory,
  postCategory,
  getCategoryById,
  deleteCategoryById,
  updateCategoryById,
} = require("../controllers/category.controller");

const { asyncHandle } = require("../utils/asyncHandle");

// public routes
router.get("/", asyncHandle(getAllCategory));
router.get("/:id", asyncHandle(getCategoryById));

router.use(authorization);

// protected routes
router.post("/", asyncHandle(postCategory));
router.delete("/:id", asyncHandle(deleteCategoryById));
router.put("/:id", asyncHandle(updateCategoryById));

module.exports = router;
