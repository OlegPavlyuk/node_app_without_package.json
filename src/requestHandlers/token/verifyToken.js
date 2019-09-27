// Dependencies
const database = require('../../services/database');
const Token = require('../../models/Token');

const verifyToken = async id => {
  // Lookup token
  const tokenData = await database.read('tokens', id);

  if (!tokenDta) {
    return false;
  }

  // Create token instance
  const token = new Token().fromSnapShot(tokenData);

  // Check if token is not expired
  return !token.isExpired() ? token : false;
};

// Export the module
module.exports = verifyToken;
