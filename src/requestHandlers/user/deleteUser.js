// Dependencies
const database = require('../../services/database');
const validator = require('../../services/validator');
const User = require('../../models/User');
const ResponseData = require('../../models/ResponseData');

// delete user handler
const deleteUser = async requestData => {
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

  // Delete user from database
  await database.delete('users', user.phone);
  return new ResponseData(200);
};

// Export the module
module.exports = deleteUser;
