const express = require("express");

const upload = require("../core/multer_config");
const router = express.Router();

const {
  register,
  login,
  info,
  changePassword,
  updateAccessToken,
} = require("../controllers/auth.controller");

const { asyncHandle } = require("../utils/asyncHandle");
const { authorization } = require("../middlewares/auth.middleware");

router.post("/register", asyncHandle(register));
router.post("/login", asyncHandle(login));

router.post("/token", asyncHandle(updateAccessToken));

router.use(authorization);
// /token => res =>
router.get("/info", asyncHandle(info));
router.put("/changePassword", asyncHandle(changePassword));

// router.post("/", asyncHandle(postPost));
// router.get("/:id", asyncHandle(getPostById));
// router.delete("/:id", asyncHandle(deletePostById));
// router.put("/:id", asyncHandle(updatePostById));
// router.put("/addImage/:id", upload.single("image"), asyncHandle(addImage));
// router.put("/addImages/:id", upload.array("images"), asyncHandle(addImages));
module.exports = router;
