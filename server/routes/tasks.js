const router = require("express").Router();
const mongo = require("../controller/mongo");
const { Task } = require("../models/tasks");
const controller = require("../controller/task");

router.get("/get", async (req, res) => {
  const { statusCode, response } = await mongo.find(Task, {});
  res.status(statusCode).send({ response });
});
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
