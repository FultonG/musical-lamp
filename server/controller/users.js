const mongo = require("./mongo");
const finance = require("./finance");
const bcrypt = require("bcrypt");
const SALT = 10;
const { User } = require("../models/users");
const { response } = require("../utils/response");

const create = async (data) => {
  const address = JSON.parse(data.address || "{}");
  const { first_name, last_name, balance, password: pwd } = data;

  const customerData = {
    address,
    first_name,
    last_name,
  };
  const { customerErr, customer } = await finance.customer(customerData);
  if (customerErr) {
    return response(500, customerErr);
  }

  const accountData = {
    type: "Checking",
    nickname: first_name,
    rewards: 0,
    balance: Number(balance) || 0,
  };
  const { accountErr, account } = await finance.account(customer, accountData);
  if (accountErr) {
    return response(500, accountErr);
  }

  const password = await bcrypt.hash(pwd, SALT);
  data = { ...data, address, customer, account, password };
  return await mongo.create(User, data);
};

const findOne = async (data, filter) => {
  return await mongo.findOne(User, data, filter);
};

const login = async (data) => {
  const { username, password: pwd } = data;
  if (!username) {
    return response(400, "Username not passed");
  } else if (!pwd) {
    return response(400, "Password not passed");
  }

  const { response: user } = await findOne({ username }, { __v: 0 });
  const { password: hashedPwd } = user;
  const isSame = await bcrypt.compare(pwd, hashedPwd);
  if (!isSame) {
    return response(400, "Wrong password");
  }

  const { password, ...userData } = user.toObject();
  return response(200, userData);
};

module.exports = { create, findOne, login };
