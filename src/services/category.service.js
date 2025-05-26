const MyModel = require("../models/category.model");
const findAll = async () => {
  const categories = await MyModel.find();
  return { categories };
};

const createCategory = async (data) => {
  await MyModel.create(data);
  return { data };
};

const findById = async (id) => {
  return await MyModel.findById(id);
};

const findByIdAndDelete = async (id) => {
  return await MyModel.findByIdAndDelete(id);
};

const findByIdAndUpdate = async (id, update) => {
  return await MyModel.findByIdAndUpdate(id, update);
};

module.exports = {
  findAll,
  createCategory,
  findById,
  findByIdAndDelete,
  findByIdAndUpdate,
};
