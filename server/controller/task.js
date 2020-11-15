const mongo = require("./mongo");
const { response } = require("../utils/response");
const { Task } = require("../models/tasks");
const { User } = require("../models/users");

const create = async (data) => {
  return mongo.create(Task, data);
};

const complete = async (data) => {
  const { _id, taskId, value } = data;

  const { statusCode: userCode, response: userData } = await mongo.findOne(
    User,
    { _id },
    {}
  );
  if (userCode != 200) {
    return response(400, "user not found");
  }

  const { statusCode: taskCode, response: taskData } = await mongo.findOne(
    Task,
    { _id: taskId },
    {}
  );
  if (taskCode != 200) {
    return response(400, "task not found");
  }

  const { title, multiplier } = taskData;
  const { tasks_completed, tasks_completed_int, exp } = userData;

  const dateCompleted = Date.now();
  const newExp = Math.round(multiplier * value * 100) / 100;
  const recordTaskData = { title, exp: newExp, value, date: dateCompleted };

  await mongo.updateOne(
    User,
    { _id },
    {
      $push: { tasks_completed: recordTaskData },
      tasks_completed_int: tasks_completed_int + 1,
      exp: exp + newExp,
    }
  );
  return mongo.findOne(User, { _id }, { __v: 0, password: 0 });
};

module.exports = { create, complete };
