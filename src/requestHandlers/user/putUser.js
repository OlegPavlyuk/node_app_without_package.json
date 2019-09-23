// Dependencies
const validator = require('../../services/validator');
const database = require('../../services/database');
const User = require('../../models/User');
const ResponseData = require('../../models/ResponseData');

// put user handler
const putUser = async requestData => {
  // Check if user with phone exists
  const phone = validator.parsePhone(requestData.payload.phone);

  if (!phone) {
    return new ResponseData(400, { error: 'Missing required fields' });
  }

  // @@TODO
  // authenticate user(verify token)

  // Look up user
  const userData = await database.read('users', phone);

  // Create user instance
  const user = new User().fromSnapShot(userData);

  // Update user object from request data
  user.updateFromObject(requestData.payload);

  // Update database record
  await database.update('users', phone, user);
  return new ResponseData(200, user.toObject());
};

// Export the module
module.exports = putUser;
