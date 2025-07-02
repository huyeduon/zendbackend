const {
  findAll,
  createPost,
  findById,
  findByIdAndDelete,
  findByIdAndUpdate,
  findByIdAndUpdateImage,
  findByIdAndUpdateImages,
} = require("../services/post.service");
const imageFolder = "zendvn/posts";
const cloudinary = require("../core/cloudinary_config");
const deleteImage = require("../utils/deleteImage");
const { findById: findCategoryById } = require("../services/category.service");
const { CheckObjectId } = require("../utils/checkObjectId");
const fs = require("fs");
const { OK, CREATED, BAD_REQUEST } = require("../core/http_response");
const { options } = require("../routes/post.router");

const getAllPost = async (req, res, next) => {
  new OK({
    message: "Get All success",
    metadata: await findAll(req.query),
  }).send(res);
};

const postPost = async (req, res, next) => {
  const newPost = req.body;
  await createPost(newPost);

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
  const post = await findById(id);
  if (!post) throw Error("Cannot find post to delete.");

  if (post.post_image) {
    const public_id = post.post_image.split("/").pop().split(".")[0];
    deleteImage(imageFolder, public_id);
  }

  // Delete all images in post_images array
  const post_images = post.post_images;
  if (post_images) {
    for (const post_image of post_images) {
      const public_id = post_image.split("/").pop().split(".")[0];
      deleteImage(imageFolder, public_id);
    }
  }

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
  // post_image = "http://res.cloudinary.com/dyucfrmcn/image/upload/v1751286032/zendvn/posts/image-1751286030401-143568855.png"

  if (post.post_image) {
    const public_id = post.post_image.split("/").pop().split(".")[0];

    deleteImage(imageFolder, public_id);
  }
  // Upload an image to cloudinary
  const uploadResult = await cloudinary.uploader
    .upload(req.file.path, {
      public_id: req.file.filename,
      folder: imageFolder,
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      fs.unlinkSync(req.file.path);
    });

  // console.log(uploadResult);

  new CREATED({
    message: "Update successfully",
    metadata: await findByIdAndUpdateImage(id, uploadResult.url),
  }).send(res);
};

const addImages = async (req, res, next) => {
  const { id } = req.params;
  const post = await findById(id);
  if (!post) throw Error("Cannot find post to add image.");
  // post_image = "http://res.cloudinary.com/dyucfrmcn/image/upload/v1751286032/zendvn/posts/image-1751286030401-143568855.png"
  const post_images = post.post_images;
  if (post_images) {
    for (const post_image of post_images) {
      const public_id = post_image.split("/").pop().split(".")[0];
      deleteImage(imageFolder, public_id);
    }
  }
  console.log(req.files);
  const uploadResultArray = [];
  for (const file of req.files) {
    const uploadResult = await cloudinary.uploader
      .upload(file.path, {
        public_id: file.filename,
        folder: imageFolder,
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        fs.unlinkSync(file.path);
      });
    uploadResultArray.push(uploadResult.url);
  }

  new CREATED({
    message: "Update Images Array Successfully",
    metadata: await findByIdAndUpdateImages(id, uploadResultArray),
  }).send(res);
};

module.exports = {
  getAllPost,
  postPost,
  getPostById,
  deletePostById,
  updatePostById,
  addImage,
  addImages,
};
