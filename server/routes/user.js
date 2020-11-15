const router = require("express").Router();
const controller = require("../controller/users");

router.post("/create", async (req, res) => {
  const data = req.body;
  const { statusCode, response } = await controller.create(data);

  res.status(statusCode).send({ response });
});

router.get("/get", async (req, res) => {
  const query = req.query;

  const { statusCode, response } = await controller.findOne(query, { __v: 0 });

  res.status(statusCode).send({ response });
});

router.post("/login", async (req, res) => {
  const data = req.body;
  const { statusCode, response } = await controller.login(data);

  res.status(statusCode).send({ response });
});

module.exports = router;
