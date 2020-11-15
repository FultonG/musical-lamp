const axios = require("axios");
const { validation } = require("../utils/mongo");
const { Customer, Account } = require("../models/finance");
const CAPITAL_API = process.env.CAPITAL_API;

const customer = async (data) => {
  const customer = new Customer(data);

  let invalid = false;
  await customer.validate((e) => (invalid = validation(e)));
  if (invalid) {
    return { customerErr: invalid, customer: null };
  }

  return await axios
    .post(`http://api.reimaginebanking.com/customers?key=${CAPITAL_API}`, data)
    .then((res) => {
      const { _id } = res.data.objectCreated;
      return {
        customerErr: null,
        customer: _id,
      };
    })
    .catch((err) => {
      return { customerErr: err, customer: null };
    });
};

const account = async (id, data) => {
  const account = new Account(data);

  let invalid = false;
  await account.validate((e) => (invalid = validation(e)));
  if (invalid) {
    return { accountErr: invalid, account: null };
  }

  return await axios
    .post(
      `http://api.reimaginebanking.com/customers/${id}/accounts?key=${CAPITAL_API}`,
      data
    )
    .then((res) => {
      const { _id } = res.data.objectCreated;
      return {
        accountErr: null,
        account: _id,
      };
    })
    .catch((err) => {
      return { accountErr: err, account: null };
    });
};

const withdrawal = async (id, data) => {
  return await axios
    .post(
      `http://api.reimaginebanking.com/accounts/${id}/withdrawals?key=${CAPITAL_API}`,
      data
    )
    .then((res) => {
      return { withdrawalErr: null, withdrawal: res.data };
    })
    .catch((err) => {
      return { withdrawalErr: err.message, withdrawal: null };
    });
};

module.exports = { customer, account, withdrawal };
