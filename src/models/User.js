// Dependencies
const validator = require('../services/validator');
const passwordHash = require('../services/passwordHash');

// Class User
class User {
  constructor({ firstName, lastName, phone, password }) {
    this.firstName = validator.parseString(firstName);
    this.lastName = validator.parseString(lastName);
    this.phone = validator.parseString(phone);
    this.hashedPassword = passwordHash(validator.parseString(password));
  }

  isValid() {
    return this.firstName && this.lastName && this.phone;
  }
}

// Export the module
module.exports = User;
