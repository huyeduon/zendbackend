const MyModel = require("../models/category.model");

// Get all categories
const findAll = async () => {
  try {
    const categories = await MyModel.find();
    return { categories };
  } catch (error) {
    console.error("Error in findAll:", error);
    throw new Error("Failed to fetch categories");
  }
};

// Create a new category
const createCategory = async (data) => {
  try {
    await MyModel.create(data);
    return { data };
  } catch (error) {
    console.error("Errot in createCategory:", error);
    throw new Error("Failed to create category");
  }
};

// Find category by ID
const findById = async (id) => {
  try {
    const category = await MyModel.findById(id);
    if (!category) {
      throw new Error("Category not found");
    }
    return { category };
  } catch (error) {
    console.error("Error in findById:", error);
    throw new Error("Failed to find category");
  }
};

// Delete category by ID
const findByIdAndDelete = async (id) => {
  try {
    const category = await MyModel.findByIdAndDelete(id);
    if (!category) {
      throw new Error("Category not found or already deleted");
    }
    return { category };
  } catch (error) {
    console.error("Error in findByIdAndDelete:", error);
    throw new Error("Failed to delete category");
  }
};

// Update category by ID
const findByIdAndUpdate = async (id, update) => {
  try {
    const category = await MyModel.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      throw new Error("Category not found");
    }
    return { category };
  } catch (error) {
    console.error("Error in findByIdAndUpdate:", error);
    throw new Error("Failed to update category");
  }
};

module.exports = {
  findAll,
  createCategory,
  findById,
  findByIdAndDelete,
  findByIdAndUpdate,
};
