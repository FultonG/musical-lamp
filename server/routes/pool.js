const router = require("express").Router();
const controller = require("../controller/pool");

router.get("/get/:_id", async (req, res) => {
  const data = req.params;

  const { statusCode, response } = await controller.get(data);
  res.status(statusCode).send({ response });
});

router.post("/get_batch", async (req, res) => {
  const data = req.body;

  const { statusCode, response } = await controller.getIn(data);
  res.status(statusCode).send({ response });
});

router.post("/create", async (req, res) => {
  const data = req.body;

  const { statusCode, response } = await controller.create(data);
  res.status(statusCode).send({ response });
});

router.post("/add", async (req, res) => {
  const data = req.body;

  const { statusCode, response } = await controller.invitePool(data);
  res.status(statusCode).send({ response });
});

module.exports = router;
