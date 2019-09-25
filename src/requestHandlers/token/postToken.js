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

  // Check if user with requested phone exist
  const userData = await database.read('users', token.phone);

  if (!userData) {
    return new ResponseData(400, { error: 'Could not find specified user' });
  }

  // Compare token hashed password with user's hashed password.
  if (token.hashedPassword !== userData.hashedPassword) {
    return new ResponseContainer(400, {
      error: "Password did not match the specified user's stored password"
    });
  }

  // Store token in database
  await database.create('tokens', token.id, token);
  return new ResponseData(200, token.toObject());
};

// Export the module
module.exports = postToken;
