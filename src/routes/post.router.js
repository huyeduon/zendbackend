const express = require("express");

const upload = require("../core/multer_config");
const router = express.Router();

const {
  getAllPost,
  postPost,
  getPostById,
  deletePostById,
  updatePostById,
  addImage,
} = require("../controllers/post.controller");

const { asyncHandle } = require("../utils/asyncHandle");

router.get("/", asyncHandle(getAllPost));
router.post("/", asyncHandle(postPost));
router.get("/:id", asyncHandle(getPostById));
router.delete("/:id", asyncHandle(deletePostById));
router.put("/:id", asyncHandle(updatePostById));
router.put("/addImage/:id", upload.single("image"), asyncHandle(addImage));
module.exports = router;
