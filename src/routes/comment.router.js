const express = require("express");

const router = express.Router();

const {
  postComment,
  getCommentById,
} = require("../controllers/comment.controller");

const { asyncHandle } = require("../utils/asyncHandle");

router.post("/", asyncHandle(postComment));

// id of post
router.get("/:id", asyncHandle(getCommentById));

module.exports = router;
