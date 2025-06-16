const { default: slugify } = require("slugify");
const MyModel = require("../models/post.model");

// Get all categories
// Find all categories with filtering
const findAll = async ({ page = 1, limit = 10, keyword = "", select = "" }) => {
  // limit= item per page
  let skip = (page - 1) * limit;
  const selectedFields = select.split(",");
  const [data, total] = await Promise.all([
    MyModel.find()
      .skip(skip)
      .limit(limit)
      .select([...selectedFields])
      .populate("category"),
    MyModel.countDocuments(),
  ]);
  return { page, total, limit, keyword, data };
};

// Create a new category
const createPost = async (data) => {
  await MyModel.create(data);
  return { message: "Create Successfully" };
};

// Find a category by ID
const findById = async (id) => {
  return await MyModel.findById(id).populate("category");
};

// Delete a category by ID
const findByIdAndDelete = async (id) => {
  await MyModel.findByIdAndDelete(id);
  return { message: "Delete Successfully" };
};

// Update category by ID
const findByIdAndUpdate = async (
  id,
  { post_title, post_description, status, ordering, ...params }
) => {
  await MyModel.findByIdAndUpdate(id, {
    post_title,
    post_description,
    status,
    ordering,
    params,
  });

  return { message: "Update post successfully" };
};

const findByIdAndUpdateImage = async (id, post_image) => {
  await MyModel.findByIdAndUpdate(id, {
    post_image,
  });

  return { message: "Image update successfully" };
};

module.exports = {
  findAll,
  createPost,
  findById,
  findByIdAndDelete,
  findByIdAndUpdate,
  findByIdAndUpdateImage,
};
