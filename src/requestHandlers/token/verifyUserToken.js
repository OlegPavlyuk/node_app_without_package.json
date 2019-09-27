// Dependencies
const verifyToken = require('./verifyToken');

const verifyUserToken = async (id, phone) => {
  const token = await verifyToken(id);

  // Check that belongs to a specific user
  return token && token.phone === phone ? token : false;
};

// Export the module
module.exports = verifyUserToken;
