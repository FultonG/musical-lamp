const mongo = require("./mongo")
const User = require("../models/users")

const create = async (data) => {
    return await mongo.create(User, data)
}

module.exports = {create}