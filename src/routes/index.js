const express = require("express");
const router = express.Router();
const categoryRouter = require("./category.router");
const postRouter = require("./post.router");
const authRouter = require("./auth.router");
const commentRouter = require("./comment.router");
router.use("/category", categoryRouter);
router.use("/post", postRouter);
router.use("/comment", commentRouter);
router.use("/", authRouter);

module.exports = router;
