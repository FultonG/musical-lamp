const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

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

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  first_name: {
    type: String,
    required: [true, "Please provide a first name"],
  },
  last_name: {
    type: String,
    required: [true, "Please provide a last name"],
  },
  address: {
    type: Address,
    required: [true, "Please provide address information"],
  },
  balance: { type: Number, required: false, default: 0 },
  account: { type: Object, required: false },
  customer: { type: Object, required: false },
});

UserSchema.plugin(uniqueValidator, {
  message: "{PATH} '{VALUE}' is already taken",
});

Address.plugin(uniqueValidator, {
  message: "{PATH} '{VALUE}' is already taken",
});

module.exports = {
  User: mongoose.model("User", UserSchema, "Users"),
};
