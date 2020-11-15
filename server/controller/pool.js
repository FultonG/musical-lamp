const mongo = require("./mongo");
const finance = require("./finance");
const { response } = require("../utils/response");
const { Pool } = require("../models/pools");
const { User } = require("../models/users");

const get = async (data) => {
  return await mongo.findOne(Pool, data, { __v: 0 });
};

const create = async (data) => {
  const { _id, fee, account_id } = data;
  const poolData = { creator: _id, fee, pool_size: fee, members: [_id] };

  const { statusCode: userCode, response: user } = await mongo.findOne(
    User,
    { _id },
    { balance: 1 }
  );
  if (userCode != 200) {
    return response(400, "Invalid user id");
  }

  const { balance } = user;
  if (balance < fee) {
    return response(400, "Insufficient funds");
  }

  const withdrawalData = { medium: "balance", amount: fee };
  const { withdrawalErr } = await finance.withdrawal(
    account_id,
    withdrawalData
  );
  if (withdrawalErr) {
    return response(500, withdrawalErr);
  }

  const { statusCode: poolCode, response: pool } = await mongo.create(
    Pool,
    poolData
  );
  if (poolCode != 200) {
    return response(poolCode, pool);
  }

  const { _id: poolId } = pool;
  await mongo.updateOne(
    User,
    { _id },
    { $push: { pools: poolId }, balance: balance - fee }
  );
  return { statusCode: poolCode, response: pool };
};

const invitePool = async (data) => {
  const { _id, poolId, toAddId } = data;

  const { statusCode: userCode, response: user } = await mongo.findOne(
    User,
    { _id },
    {}
  );
  if (userCode != 200) {
    return response(400, "Invalid user id");
  }

  const { statusCode: toAddCode, response: toAddUser } = await mongo.findOne(
    User,
    { _id: toAddId },
    {}
  );
  if (toAddCode != 200) {
    return response(400, "User you want to add is invalid");
  }

  const { statusCode: poolCode, response: pool } = await mongo.findOne(
    Pool,
    { _id: poolId },
    {}
  );
  if (poolCode != 200) {
    return response(400, "Invalid pool id");
  }

  const { fee, pool_size, creator } = pool;
  const { balance, pools } = toAddUser;
  if (creator != _id) {
    return response(400, "Only the creator of a pool and add users");
  }
  if (balance < fee) {
    return response(400, "Insufficient funds for user you are trying to add");
  }
  const alreadyInPool = pools.filter((pool) => pool === poolId);
  if (alreadyInPool.length > 0) {
    return response(400, "User already in pool");
  }

  await mongo.updateOne(
    User,
    { _id: toAddId },
    { $push: { pools: poolId }, balance: balance - fee }
  );
  await mongo.updateOne(
    Pool,
    { _id: poolId },
    { $push: { members: toAddId }, pool_size: pool_size + fee }
  );

  return await mongo.findOne(Pool, { _id: poolId }, { __v: 0 });
};

module.exports = { get, create, invitePool };
