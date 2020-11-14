const router = require("express").Router()
const controller = require("../controller/users")

router.get("/create", async (req,res) => {
    const data = req.body
    const {statusCode, response} = await controller.create(data)

    res.status(statusCode).send({response})
})

module.exports = router