const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    first_name: {
        type: String,
        required: [true, "Please provide a first name"]
    },
    last_name: {
        type: String,
        required: [true, "Please provide a last name"],
    },
    balance: Number
})

UserSchema.plugin(uniqueValidator, {message: "{PATH} '{VALUE}' is already taken"})

module.exports = mongoose.model("User", UserSchema, "Users")