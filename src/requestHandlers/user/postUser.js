// Dependencies
const User = require('../../models/User');

const postUser = async requestData => {
  // Get raw user request data.
  const userRawData = requestData.payload;
  const user = new User(userRawData);
  // console.log(user);
  console.log(user.isValid());
};

// Export the module
module.exports = postUser;
