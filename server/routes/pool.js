const router = require("express").Router();
const controller = require("../controller/pool");

router.post("/create", (req, res) => {
  const data = req.body;

  const { statusCode, response } = controller.create(data);
  res.status(statusCode).send(response);
});
