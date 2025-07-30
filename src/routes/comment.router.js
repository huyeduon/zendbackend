const express = require("express");

const router = express.Router();
const { authorization } = require("../middlewares/auth.middleware");
const {
  postComment,
  getCommentById,
  deleteCommentById,
} = require("../controllers/comment.controller");

const { asyncHandle } = require("../utils/asyncHandle");
// id of post
router.get("/:id", asyncHandle(getCommentById));

router.use(authorization);
router.post("/", asyncHandle(postComment));

// delete comment by comment ID

router.delete("/:id", asyncHandle(deleteCommentById));

module.exports = router;
