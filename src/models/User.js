// Dependencies
const validator = require('../services/validator');
const passwordHash = require('../services/passwordHash');

// Class User
class User {
  // Create user from object(request payload)
  fromObject({ firstName, lastName, phone, password }) {
    this.firstName = validator.parseString(firstName);
    this.lastName = validator.parseString(lastName);
    this.phone = validator.parsePhone(phone);
    this.hashedPassword = passwordHash(validator.parseString(password));

    return this;
  }

  // Create user from database snap shot
  fromSnapShot({ firstName, lastName, phone, hashedPassword }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.hashedPassword = hashedPassword;

    return this;
  }

  // Check all required fields
  isValid() {
    return !!(
      this.firstName &&
      this.lastName &&
      this.phone &&
      this.hashedPassword
    );
  }

  // Update user from object(passed argument)
  updateFromObject({ firstName, lastName, phone, password }) {
    const parsedFirstName = validator.parseString(firstName);
    const parsedLastName = validator.parseString(lastName);
    const parsedPhone = validator.parsePhone(phone);
    const parsedHashedPassword = passwordHash(validator.parseString(password));

    if (parsedFirstName) {
      this.firstName = parsedFirstName;
    }

    if (parsedLastName) {
      this.lastName = parsedLastName;
    }

    if (parsedPhone) {
      this.phone = parsedPhone;
    }

    if (parsedHashedPassword) {
      this.hashedPassword = parsedHashedPassword;
    }

    return this;
  }

  // Public represantation of user
  toObject() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone
    };
  }
}

// Export the module
module.exports = User;
