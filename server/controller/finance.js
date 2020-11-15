const axios = require("axios");
const { validation } = require("../utils/mongo");
const { Customer, Account } = require("../models/finance");
const CAPITAL_API = process.env.CAPITAL_API;

const customer = async (data) => {
  const customer = new Customer(data);
  const invalid = await customer
    .save()
    .then(() => undefined)
    .catch((e) => {
      const missingKey = validation(e);
      return missingKey;
    });
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
  const address = new Account(data);
  const invalid = await address
    .save()
    .then(() => undefined)
    .catch((e) => {
      const missingKey = validation(e);
      return { customerErr: missingKey, customer: null };
    });
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

module.exports = { customer, account };
