const MyModel = require("../models/category.model");

// Get all categories
const findAll = async ({ page = 1, limit = 5, keyword = "" }) => {
  // limit= item per page
  let skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    MyModel.find().skip(skip).limit(limit),
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
  await MyModel.findByIdAndUpdate(id, update);
  return { message: "Update Successfully" };
};

module.exports = {
  findAll,
  createCategory,
  findById,
  findByIdAndDelete,
  findByIdAndUpdate,
};
