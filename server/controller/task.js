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
  const { exp, level_up_exp, level } = userData;

  const dateCompleted = Date.now();
  const newExp = Math.round(multiplier * value * 100) / 100;
  const recordTaskData = { title, exp: newExp, value, date: dateCompleted };

  let addToLevel = 0;
  let nextLevelExp = level_up_exp;
  while (exp + newExp >= nextLevelExp) {
    addToLevel += 1;
    nextLevelExp = Math.round(nextLevelExp * 1.25);
  }

  await mongo.updateOne(
    User,
    { _id },
    {
      $push: { tasks_completed: recordTaskData },
      $inc: { tasks_completed_int: 1, exp: newExp, level: addToLevel },
      level_up_exp: nextLevelExp,
    }
  );
  return mongo.findOne(User, { _id }, { __v: 0, password: 0 });
};

module.exports = { create, complete };
