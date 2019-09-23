// Dependencies
const User = require('../../models/User');
const database = require('../../services/database');
const ResponseData = require('../../models/ResponseData');

// post user handler
const postUser = async requestData => {
  // Get raw user request data.
  const userRawData = requestData.payload;

  // Create User instance from raw data
  const user = new User().fromObject(userRawData);

  // Check if user has all required fields
  if (!user.isValid()) {
    return new ResponseData(400, { error: 'Missing required fields' });
  }

  // Make sure that the user doesn't already exist
  const userData = await database.read('users', user.phone);
  if (userData) {
    return new ResponseData(400, {
      error: 'A user with that phone already exists'
    });
  }

  // Store user
  await database.create('users', user.phone, user);
  return new ResponseData(200, user.toObject());
};

// Export the module
module.exports = postUser;
