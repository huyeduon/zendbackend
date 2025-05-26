const {
  findAll,
  createCategory,
  findById,
  findByIdAndDelete,
  findByIdAndUpdate,
} = require("../services/category.service");

const getAllCategory = async (req, res, next) => {
  const data = await findAll();
  res.send(data);
};

const postCategory = async (req, res, next) => {
  const newCategory = req.body;
  await createCategory(newCategory);
  res.send({
    message: "Create category successfully.",
  });
};

const getCategoryById = async (req, res, next) => {
  const { id } = req.params;
  const result = await findById(id);
  res.send(result);
};

const deleteCategoryById = async (req, res, next) => {
  const { id } = req.params;
  await findByIdAndDelete(id);
  res.send({
    message: "Delete successfully.",
  });
};

const updateCategoryById = async (req, res, next) => {
  const { id } = req.params;

  const category = await findById(id);
  if (!category) return res.send("Cannot find the ID");

  await findByIdAndUpdate(id, req.body);
  res.send({
    message: "Update successfully",
  });
};

module.exports = {
  getAllCategory,
  postCategory,
  getCategoryById,
  deleteCategoryById,
  updateCategoryById,
};
