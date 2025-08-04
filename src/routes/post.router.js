const express = require("express");

const upload = require("../core/multer_config");
const router = express.Router();
const {
  authorization,
  checkDeleteByAuthor,
} = require("../middlewares/auth.middleware");
const {
  getAllPost,
  postPost,
  getPostById,
  deletePostById,
  updatePostById,
  addImage,
  addImages,
} = require("../controllers/post.controller");

const { asyncHandle } = require("../utils/asyncHandle");

router.get("/", asyncHandle(getAllPost));
router.post("/", asyncHandle(postPost));
router.get("/:id", asyncHandle(getPostById));

router.put("/:id", asyncHandle(updatePostById));
router.put("/addImage/:id", upload.single("image"), asyncHandle(addImage));
router.put("/addImages/:id", upload.array("images"), asyncHandle(addImages));

router.delete(
  "/:id",
  authorization,
  checkDeleteByAuthor,
  asyncHandle(deletePostById)
);

module.exports = router;
