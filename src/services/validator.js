// Container for the module
const validator = {};

validator.parseString = value => {
  return typeof value === 'string' && value.trim().length ? value.trim() : null;
};

validator.parsePhone = value => {
  return value.trim().length === 10 && !isNaN(value) ? value.trim() : null;
};

validator.parseBoolean = value => typeof value === 'boolean' && value;

// Export the module
module.exports = validator;
