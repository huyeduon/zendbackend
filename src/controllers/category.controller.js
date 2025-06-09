const {
  findAll,
  createCategory,
  findById,
  findByIdAndDelete,
  findByIdAndUpdate,
} = require("../services/category.service");
const { CheckObjectId } = require("../utils/checkObjectId");
const { BadRequestError } = require("../core/custom_error");

const getAllCategory = async (req, res, next) => {
  res.send({
    metadata: await findAll(req.query),
  });
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
  if (!CheckObjectId(id)) throw new BadRequestError();
  const result = await findById(id);
  if (!result) throw new Error("Cannot find ");

  res.send(result);
};

const deleteCategoryById = async (req, res, next) => {
  const { id } = req.params;
  const category = await findById(id);
  if (!category) throw Error("Cannot find category to delete.");
  res.send({
    metadata: await findByIdAndDelete(id),
  });
};

const updateCategoryById = async (req, res, next) => {
  const { id } = req.params;
  const category = await findById(id);
  if (!category) throw Error("Cannot find category to delete.");

  res.send({
    metadata: findByIdAndUpdate(id, req.body),
  });
};

module.exports = {
  getAllCategory,
  postCategory,
  getCategoryById,
  deleteCategoryById,
  updateCategoryById,
};
