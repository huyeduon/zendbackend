const {
  findAll,
  createCategory,
  findById,
  findByIdAndDelete,
  findByIdAndUpdate,
} = require("../services/category.service");
const { CheckObjectId } = require("../utils/checkObjectId");

const {
  status_code,
  OK,
  CREATED,
  BAD_REQUEST,
} = require("../core/http_response");

const getAllCategory = async (req, res, next) => {
  const foundData = await findAll(req.query);
  new OK("Get All success", status_code.OK, foundData).send(res);
};

const postCategory = async (req, res, next) => {
  const newCategoryData = req.body; // Renamed for clarity
  const createdCategory = await createCategory(newCategoryData); // Capture the returned data

  new CREATED(
    "Category created successfully.", // Message
    status_code.CREATED, // Status Code
    createdCategory // Metadata: Include the newly created object
  ).send(res);
};

const getCategoryById = async (req, res, next) => {
  const { id } = req.params;
  if (!CheckObjectId(id)) throw new BAD_REQUEST();
  const result = await findById(id);
  if (!result) throw new Error("Cannot find ");

  // res.send(result);
  new OK("Get category by id ok", status_code.OK, result).send(res);
};

const deleteCategoryById = async (req, res, next) => {
  const { id } = req.params;
  const category = await findById(id);
  if (!category) throw Error("Cannot find category to delete.");

  new OK(
    "Delete successfully",
    status_code.OK,
    await findByIdAndDelete(id)
  ).send(res);
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
