const express = require("express");

const upload = require("../core/multer_config");
const router = express.Router();

const { register, login } = require("../controllers/auth.controller");

const { asyncHandle } = require("../utils/asyncHandle");

router.post("/register", asyncHandle(register));
router.post("/login", asyncHandle(login));

// router.post("/", asyncHandle(postPost));
// router.get("/:id", asyncHandle(getPostById));
// router.delete("/:id", asyncHandle(deletePostById));
// router.put("/:id", asyncHandle(updatePostById));
// router.put("/addImage/:id", upload.single("image"), asyncHandle(addImage));
// router.put("/addImages/:id", upload.array("images"), asyncHandle(addImages));
module.exports = router;
