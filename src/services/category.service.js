const { model } = require("../models/category.model");
const findAll = () => {
  return {
    data: {
      name: "duy",
    },
  };
};

const createCategory = async (data) => {
  //   await MyModel.create(data);
  return { data };
};

module.exports = {
  findAll,
  createCategory,
};
