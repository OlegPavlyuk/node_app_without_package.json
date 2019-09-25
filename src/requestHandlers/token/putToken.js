// Dependencies.
const database = require('../../services/database');
const Token = require('../../models/Token');
const validator = require('../../services/validator');
const ResponseData = require('../../models/ResponseData');

const putToken = async requestData => {
  // Get id from request payload
  const id = validator.parseString(requestData.payload.id);

  // Check if id is valid
  if (!id) {
    return new ResponseData(400, { error: 'Missing required fields' });
  }

  // Lookup the token
  const tokeData = await database.read('tokens', id);
  if (!tokenData) {
    return new ResponseData(400, { error: 'Token does not exists' });
  }

  // Create token instance
  const token = new Token().fromSnapShot(tokenData);

  // Check to make sure the token isn't already expired.
  if (token.isExpired()) {
    return new ResponseData(400, {
      error: 'The token has already expired, and can not be extended'
    });
  }

  // Set the expiration an hour from now.
  token.prolong();

  // Store the new updates.
  await database.update('tokens', id, token);
  return new ResponseData(200);
};

// Export the module
module.exports = putToken;
