// Dependencies
const crypto = require('crypto');
const config = require('../config');

const passwordHash = passwordString => {
  if (typeof passwordString === 'string' && passwordString.length) {
    return crypto
      .createHmac('sha256', config.hashingSecret)
      .update(passwordString)
      .digest('hex');
  } else {
    return null;
  }
};

// Export the module
module.exports = passwordHash;
