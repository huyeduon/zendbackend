const express = require("express");
const router = express.Router();
const categoryRouter = require("./category.router");
const postRouter = require("./post.router");
router.use("/category", categoryRouter);
router.use("/post", postRouter);
module.exports = router;
