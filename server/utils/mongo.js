const validation = (e) => {
  const validation = e?._message;
  if (
    validation === "User validation failed" ||
    validation === "Customer validation failed" ||
    validation === "Account validation failed"
  ) {
    const validationMessage = e.message.substring(validation.length + 2);
    const firstError = validationMessage.split(", ")[0];
    const firstErrorMessage = firstError.split(": ")[1];

    return firstErrorMessage;
  }
  return undefined;
};

const isNotUnique = (e) => {
  const errors = e.errors;
  let failedKeys = [];
  for (const key in errors) {
    failedKeys.push(key);
  }

  if (failedKeys.length > 0) {
    const firstKey = failedKeys[0];
    const message = errors[firstKey].properties.message;
    return message;
  }
  return undefined;
};

module.exports = { validation, isNotUnique };
