const { findAll, createCategory } = require("../services/category.service");

const getAllCategory = (req, res, next) => {
  const data = findAll();
  res.send(data);
};

const postCategory = (req, res, next) => {
  const newCategory = req.body;
  createCategory(newCategory);
  res.send(newCategory);
};

module.exports = { getAllCategory, postCategory };
