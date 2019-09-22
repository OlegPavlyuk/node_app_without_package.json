// Dependencies
const ResponseData = require('../models/ResponseData');

// Ping controller
const pingController = async requestData => {
  return new ResponseData(200);
};

// Export Module
module.exports = pingController;
