const express = require("express");
const router = express.Router();

const {
  getAllPost,
  postPost,
  getPostById,
  deletePostById,
  updatePostById,
} = require("../controllers/post.controller");

const { asyncHandle } = require("../utils/asyncHandle");

router.get("/", asyncHandle(getAllPost));
router.post("/", asyncHandle(postPost));
router.get("/:id", asyncHandle(getPostById));
router.delete("/:id", asyncHandle(deletePostById));
router.put("/:id", asyncHandle(updatePostById));
module.exports = router;
