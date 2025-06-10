const {
  findAll,
  createCategory,
  findById,
  findByIdAndDelete,
  findByIdAndUpdate,
} = require("../services/category.service");
const { CheckObjectId } = require("../utils/checkObjectId");

const { OK, CREATED, BAD_REQUEST } = require("../core/http_response");

const getAllCategory = async (req, res, next) => {
  // res.send({
  //   metadata: await findAll(req.query),
  // });

  new OK({
    message: "Get All success",
    metadata: await findAll(req.query),
  }).send(res);
};

const postCategory = async (req, res, next) => {
  const newCategory = req.body;
  await createCategory(newCategory);
  // res.send({
  //   message: "Create category successfully.",
  // });
  new CREATED({
    message: "Create category successfully.",
  }).send(res);
};

const getCategoryById = async (req, res, next) => {
  const { id } = req.params;
  if (!CheckObjectId(id)) throw new BAD_REQUEST();
  const result = await findById(id);
  if (!result) throw new Error("Cannot find ");

  // res.send(result);
  new OK({
    message: "Get category by id ok",
    metadata: result,
  }).send(res);
};

const deleteCategoryById = async (req, res, next) => {
  const { id } = req.params;
  const category = await findById(id);
  if (!category) throw Error("Cannot find category to delete.");
  // res.send({
  //   metadata: await findByIdAndDelete(id),
  // });

  new OK({
    message: "Delete successfully",
    metadata: await findByIdAndDelete(id),
  }).send(res);
};

const updateCategoryById = async (req, res, next) => {
  const { id } = req.params;
  const category = await findById(id);
  if (!category) throw Error("Cannot find category to update.");

  new CREATED({
    message: "Update successfully",
    metadata: await findByIdAndUpdate(id, req.body),
  }).send(res);
};

module.exports = {
  getAllCategory,
  postCategory,
  getCategoryById,
  deleteCategoryById,
  updateCategoryById,
};
