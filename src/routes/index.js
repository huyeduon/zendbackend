const express = require("express");
const router = express.Router();
const categoryRouter = require("./category.router");
const postRouter = require("./post.router");
const authRouter = require("./auth.router");
router.use("/category", categoryRouter);
router.use("/post", postRouter);
router.use("/", authRouter);
module.exports = router;
