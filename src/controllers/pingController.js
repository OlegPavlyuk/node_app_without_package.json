// Dependencies
const ResponseData = require('../models/ResponseData');

// Ping controller
const pingController = async requestData => {
  return new ResponseData(200);
};

// Export the module
module.exports = pingController;
