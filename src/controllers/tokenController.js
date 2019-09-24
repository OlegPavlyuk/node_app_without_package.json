// Dependencies
const getToken = require('../requestHandlers/token/getToken');
const postToken = require('../requestHandlers/token/postToken');
const putToken = require('../requestHandlers/token/putToken');
const deleteToken = require('../requestHandlers/token/deleteToken');

const ResponseData = require('../models/ResponseData');

// Token controller
const tokenController = async requestData => {
  switch (requestData.method) {
    case 'get':
      return await getToken(requestData);

    case 'post':
      return await postToken(requestData);

    case 'put':
      return await putToken(requestData);

    case 'delete':
      return await deleteToken(requestData);

    default:
      return new ResponseData(405, { error: 'Method is not allowed' });
  }
};

// Export the module
module.exports = tokenController;
