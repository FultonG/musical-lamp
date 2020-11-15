const { response } = require("../utils/response");
const { validation, isNotUnique } = require("../utils/mongo");

const create = async (model, data) => {
  try {
    await model.create(data);

    const { username } = data;
    const result = await findOne(model, { username }, { __v: 0 });

    return result;
  } catch (e) {
    const error = validation(e) || isNotUnique(e);
    if (error) {
      return response(400, error);
    }

    return response(500, e.message);
  }
};

const findOne = async (model, data, filter) => {
  try {
    const user = await model.findOne(data).select(filter);

    if (!user) {
      return response(400, "User not found");
    }

    return response(200, user);
  } catch (e) {
    console.log(e);
    return response(500, e.message);
  }
};

const findOneAndUpdate = async (model, data, update, filter) => {
  try {
    const user = await model.findOneAndUpdate(data, update).select(filter);

    if (!user) {
      return response(400, "User not found");
    }

    return response(400, user);
  } catch (e) {
    console.log(e);
    return response(500, e.message);
  }
};

module.exports = { create, findOne, findOneAndUpdate };
