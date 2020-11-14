const { findOne } = require("../models/users")
const {response} = require("../utils/response")

const validation = (e) => {
    const validation = e?._message
    if (validation === "User validation failed:") {
        const validationMessage = e.message.substring(24)
        const firstError = validationMessage.split(", ")[0]
        const firstErrorMessage = firstError.split(": ")[1]
            
        return firstErrorMessage
    }
    return undefined
}

const isUnique = (e) => {
    const errors = e.errors
    let failedKeys = []
    for (const key in errors) {
        failedKeys.push(key)
    }

    if (failedKeys.length > 0) {
        const firstKey = failedKeys[0]
        const message = errors[firstKey].properties.message
        return message
    }
    return undefined
}

const create = async (model, data) => {
    try {
        const event = await model.create(data)
        return response(200, event)
    } catch(e) {
        const error = validation(e) || isUnique(e)
        if (error) {
            return response(400, error)
        }

        return response(500, e.message)
    }
}

module.exports = {create}