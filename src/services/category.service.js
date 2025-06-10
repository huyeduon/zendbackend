const { default: slugify } = require("slugify");
const MyModel = require("../models/category.model");

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
      .select([...selectedFields]),
    MyModel.countDocuments(),
  ]);
  return { page, total, limit, keyword, data };
};

// Create a new category
const createCategory = async (data) => {
  await MyModel.create(data);
  return { message: "Create Successfully" };
};

// Find a category by ID
const findById = async (id) => {
  return await MyModel.findById(id);
};

// Delete a category by ID
const findByIdAndDelete = async (id) => {
  await MyModel.findByIdAndDelete(id);
  return { message: "Delete Successfully" };
};

// Update category by ID
const findByIdAndUpdate = async (id, update) => {
  if (update.category_name) {
    await MyModel.findByIdAndUpdate(id, {
      ...update,
      category_slug: slugify(update.category_name),
    });
  } else {
    await MyModel.findByIdAndUpdate(id, update);
  }

  return { message: "Update Successfully" };
};

module.exports = {
  findAll,
  createCategory,
  findById,
  findByIdAndDelete,
  findByIdAndUpdate,
};
