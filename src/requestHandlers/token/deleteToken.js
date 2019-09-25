// Dependencies.
const database = require('../../services/database');
const Token = require('../../models/Token');
const validator = require('../../services/validator');
const ResponseData = require('../../models/ResponseData');

const deleteToken = async requestData => {
  // Get id from request querystring
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

  // Delete token from database
  await database.delete('tokens', token.id);

  return new ResponseData(200);
};

// Export the module
module.exports = deleteToken;
