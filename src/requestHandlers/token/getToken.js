// Dependencies
const database = require('../../services/database');
const ResponseData = require('../../models/ResponseData');
const Token = require('../../models/Token');
const validator = require('../../services/validator');

const getToken = async requestData => {
  // Get id from querystring
  const id = validator.parseString(requestData.queryStringObject.id);

  // Check if id is valid
  if (!id) {
    return new ResponseData(400, { error: 'Missing required fields' });
  }

  // Lookup the token
  const tokenData = await database.read('tokens', id);
  if (!tokenData) {
    return new ResponseData(404);
  }

  // Create token instance
  const token = new Token().fromSnapShot(tokenData);
  return new ResponseData(200, token.toObject());
};

// Export the module
module.exports = getToken;
