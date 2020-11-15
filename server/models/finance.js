const mongoose = require("mongoose");

const Address = mongoose.Schema({
  street_number: {
    type: String,
    required: [true, "Please provide a street number"],
  },
  street_name: {
    type: String,
    required: [true, "Please provide a street name"],
  },
  city: { type: String, required: [true, "Please provide a city"] },
  state: { type: String, required: [true, "Please provide a state"] },
  zip: { type: String, required: [true, "Please provide a ZIP"] },
});

const Customer = mongoose.Schema({
  address: { type: Address, required: [true, "Please provide a address"] },
  first_name: { type: String, required: [true, "Please provide a first name"] },
  last_name: { type: String, required: [true, "Please provide a last name"] },
});

const Account = mongoose.Schema({
  type: { type: String, required: [true, "Please provide a type"] },
  nickname: { type: String, required: [true, "Please provide a nickname"] },
  rewards: { type: Number, required: [true, "Please provide a rewards"] },
  balance: { type: Number, required: [true, "Please provide a balance"] },
});

module.exports = {
  Address: mongoose.model("Address", Address),
  Customer: mongoose.model("Customer", Customer),
  Account: mongoose.model("Account", Account),
};
