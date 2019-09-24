// Router to map request to controller

// Dependencies
const pingController = require('./controllers/pingController');
const notFoundController = require('./controllers/notFoundController');
const userController = require('./controllers/userController');
const tokenController = require('./controllers/tokenController');

// Container for the module
const router = {};

// Define routes
router.routes = {
  'api/ping': {
    controller: pingController
  },
  'api/users': {
    controller: userController
  },
  'api/tokens': {
    controller: tokenController
  }
};

router.notFound = notFoundController;

// Export the module
module.exports = router;
