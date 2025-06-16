const {
  findAll,
  createPost,
  findById,
  findByIdAndDelete,
  findByIdAndUpdate,
  findByIdAndUpdateImage,
} = require("../services/post.service");
const { findById: findCategoryById } = require("../services/category.service");
const { CheckObjectId } = require("../utils/checkObjectId");

const { OK, CREATED, BAD_REQUEST } = require("../core/http_response");

const getAllPost = async (req, res, next) => {
  new OK({
    message: "Get All success",
    metadata: await findAll(req.query),
  }).send(res);
};

const postPost = async (req, res, next) => {
  const newPost = req.body;
  await createPost(newPost);
  // res.send({
  //   message: "Create category successfully.",
  // });
  new CREATED({
    message: "Create post successfully.",
  }).send(res);
};

const getPostById = async (req, res, next) => {
  const { id } = req.params;
  if (!CheckObjectId(id)) throw new BAD_REQUEST();
  let result = await findById(id);
  console.log(result);
  if (!result) throw new Error("Cannot find ");

  // res.send(result);
  new OK({
    message: "Get post by id ok",
    metadata: result,
  }).send(res);
};

const deletePostById = async (req, res, next) => {
  const { id } = req.params;
  const category = await findById(id);
  if (!category) throw Error("Cannot find post to delete.");
  // res.send({
  //   metadata: await findByIdAndDelete(id),
  // });

  new OK({
    message: "Delete successfully",
    metadata: await findByIdAndDelete(id),
  }).send(res);
};

const updatePostById = async (req, res, next) => {
  const { id } = req.params;
  const post = await findById(id);
  if (!post) throw Error("Cannot find post to update.");

  new CREATED({
    message: "Update successfully",
    metadata: await findByIdAndUpdate(id, req.body),
  }).send(res);
};

const addImage = async (req, res, next) => {
  const { id } = req.params;
  const post = await findById(id);
  if (!post) throw Error("Cannot find post to add image.");
  console.log(req.file);
  new CREATED({
    message: "Update successfully",
    metadata: await findByIdAndUpdateImage(id, req.file.filename),
  }).send(res);
};

module.exports = {
  getAllPost,
  postPost,
  getPostById,
  deletePostById,
  updatePostById,
  addImage,
};
