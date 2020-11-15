const router = require("express").Router();
const controller = require("../controller/task");

router.post("/create", async (req, res) => {
  const data = req.body;

  const { statusCode, response } = await controller.create(data);
  res.status(statusCode).send(response);
});

router.post("/complete", async (req, res) => {
  const data = req.body;

  const { statusCode, response } = await controller.complete(data);
  res.status(statusCode).send(response);
});

module.exports = router;
