// Dependencies
const ResponseData = require('../models/ResponseData');

// Not Found controller
const notFoundController = async requestData => {
  return new ResponseData(404);
};

// Export Module
module.exports = notFoundController;
