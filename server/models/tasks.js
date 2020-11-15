const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const TasksSchema = mongoose.Schema({
  title: { type: String, required: [true, "Please provide a title"] },
  multiplier: { type: Number, required: [true, "Please provide a multiplier"] },
});

module.exports = {
  Task: mongoose.model("Task", TasksSchema, "Tasks"),
};
