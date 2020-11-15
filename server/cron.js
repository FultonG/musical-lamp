const CronJob = require("cron").CronJob;
const { Pool } = require("./models/pools");
const { User } = require("./models/users");
const { deposit } = require("./controller/finance");
const mongo = require("./controller/mongo");
const pool = require("./controller/pool");

const getCurrentTasks = async (_id, poolId) => {
  await mongo.updateOne(
    User,
    { _id },
    { $pull: { pools: poolId } },
    { $push: { expired_pools: poolId } }
  );
  const { statusCode, response } = await mongo.findOne(User, { _id });
  if (statusCode != 200) {
    return 0;
  }
  return response.tasks_completed_int;
};

const getWinners = async (users, poolId) => {
  let currentWinners = [];
  let maxDifference = 0;

  for (const user of users) {
    const currentTasks = await getCurrentTasks(user._id, poolId);
    const startTasks = user.startTasksInt;

    const difference = currentTasks - startTasks;

    if (difference > maxDifference) {
      currentWinners = [user._id];
      maxDifference = difference;
    } else if (difference === maxDifference) {
      currentWinners.push(user._id);
    }
  }

  return currentWinners;
};

const rewardWinners = async (users, reward) => {
  for (const user of users) {
    const { statusCode, response } = await mongo.findOne(User, { _id: user });
    if (statusCode != 200) {
      continue;
    }

    const { _id, account } = response;
    await mongo.updateOne(User, { _id }, { $inc: { balance: reward } });

    const depositData = { medium: "balance", amount: reward };
    await deposit(account, depositData);
    console.log(`rewarded ${user}`);
  }
};

const job = new CronJob("0 */1 * * * *", async () => {
  const currentDate = Date.now();
  const { statusCode, response: expiredPools } = await mongo.find(Pool, {
    expiration_date: { $lte: currentDate },
    is_expired: false,
  });
  if (statusCode != 200) {
    console.log("Error in cron job");
  }

  console.log(`found ${expiredPools.length} pools`);

  expiredPools.forEach(async (pool) => {
    const { members, pool_size, _id } = pool;
    const winners = await getWinners(members, _id);
    console.log(winners);

    const reward = Math.round((pool_size / winners.length) * 100) / 100;
    await rewardWinners(winners, reward);

    await mongo.updateOne(Pool, { _id }, { is_expired: true });
    console.log(`finished pool ${_id}`);
  });
});

module.exports = job;
