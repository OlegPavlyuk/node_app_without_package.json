// Dependencies
const getUser = require('../requestHandlers/user/getUser');
const postUser = require('../requestHandlers/user/postUser');
const putUser = require('../requestHandlers/user/putUser');
const deleteUser = require('../requestHandlers/user/deleteUser');

const ResponseData = require('../models/ResponseData');

// User controller
const userController = async requestData => {
  switch (requestData.method) {
    case 'get':
      return await getUser(requestData);

    case 'post':
      return await postUser(requestData);

    case 'put':
      return await putUser(requestData);

    case 'delete':
      return await deleteUser(requestData);

    default:
      return new ResponseData(405, { error: 'Method is not allowed' });
  }
};

// Export the module
module.exports = userController;
