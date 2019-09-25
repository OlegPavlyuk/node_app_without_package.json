// Dependencies
const validator = require('../services/validator');
const passwordHash = require('../services/passwordHash');
const config = require('../config');
const randomString = require('../services/randomString');

// Constants
const tokenIdLength = 20;
const tokenLifetime = config.tokenLifetime;

// Class Token
class Token {
  // Create token from object(request payload)
  fromObject({ phone, password }) {
    this.id = randomString(tokenIdLength);
    this.phone = validator.parsePhone(phone);
    this.hashedPassword = passwordHash(validator.parseString(password));
    this.expires = Date.now() + tokenLifetime;

    return this;
  }

  // Create token from database snap shot
  fromSnapShot({ id, phone, hashedPassword, expires }) {
    this.id = id;
    this.phone = phone;
    this.hashedPassword = hashedPassword;
    this.expires = expires;

    return this;
  }

  // Check if token data is valid
  isValid() {
    return !!(this.id && this.phone && this.hashedPassword && this.expires);
  }

  // Check if token is expired
  isExpired() {
    return this.expires <= Date.now();
  }

  // Prolong token
  prolong() {
    this.expires = Date.now() + tokenLifeTime;
  }

  // Public presentation of token
  toObject() {
    return {
      id: this.id,
      phone: this.phone,
      expires: this.expires
    };
  }
}

// Export the module
module.exports = Token;
