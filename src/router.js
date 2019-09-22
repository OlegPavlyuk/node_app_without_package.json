// Router to map request to controller

// Dependencies
const pingController = require('./controllers/pingController');
const notFoundController = require('./controllers/notFoundController');

// Define router
const router = {};

// Define routes
router.routes = {
  'api/ping': {
    controller: pingController
  }
};

router.notFound = notFoundController;

// Export module
module.exports = router;
