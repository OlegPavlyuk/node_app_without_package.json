// Dependencies
const database = require('../../services/database');
const User = require('../../models/User');
const validator = require('../../services/validator');
const ResponseData = require('../../models/ResponseData');

// get user handler
const getUser = async requestData => {
  // Check if user with phone exists
  const phone = validator.parsePhone(requestData.queryStringObject.phone);

  if (!phone) {
    return new ResponseData(400, { error: 'Missing required fields' });
  }

  // Get the token from the headers.
  const token = validator.parseString(requestData.headers.token);

  // Verify that the given token is valid for the phone number.
  const verifiedToken = await verifyUserToken(token, email);
  if (!verifiedToken) {
    return new ResponseData(403, { error: 'Token is invalid' });
  }

  // Look up user
  const userData = await database.read('users', phone);

  // Create User instance
  const user = new User().fromSnapShot(userData);
  return new ResponseData(200, user.toObject());
};

// Export the module
module.exports = getUser;
