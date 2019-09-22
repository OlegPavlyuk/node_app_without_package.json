const jsonStringToObject = str => {
  try {
    return JSON.parse(str);
  } catch (error) {
    return {};
  }
};

// Export the module.
module.exports = jsonStringToObject;
