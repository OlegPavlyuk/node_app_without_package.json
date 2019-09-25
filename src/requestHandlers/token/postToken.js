// Dependencies
const database = require('../../services/database');
const Token = require('../../models/Token');
const ResponseData = require('../../models/ResponseData');

const postToken = async requestData => {
  // Get token data from request
  const tokenData = requestData.payload;

  // Create Token instance
  const token = new Token().fromObject(tokenData);

  // Check token has all required fields
  if (!token.isValid()) {
    return new ResponseData(400, { error: 'Missing required fields' });
  }

  // Store token in database
  await database.create('tokens', token.id, token);
  return new ResponseData(200, token.toObject());
};

// Export the module
module.exports = postToken;
