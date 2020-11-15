const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const PoolSchema = mongoose.Schema({
  creator: { type: String, required: [true, "Please provide a creator"] },
  fee: { type: Number, required: [true, "Please provide a pool entrence fee"] },
  pool_size: { type: Number, required: false },
  members: { type: Array, required: false },
});

module.exports = {
  Pool: mongoose.model("Pool", PoolSchema, "Pools"),
};
