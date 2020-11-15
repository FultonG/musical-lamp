const mongo = require("./mongo");
const { response } = require("../utils/response");
const { Pool } = require("../models/pools");
const { User } = require("../models/users");

const create = (data) => {
  const { _id } = data;

  return await mongo.create(Pool, data);
};
