const response = (statusCode, res) => {
  return { statusCode, response: res };
};

module.exports = { response };
