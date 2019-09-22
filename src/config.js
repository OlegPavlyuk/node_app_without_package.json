// Create object for all environments
const environments = {};

// Create staging(default) environment
environments.staging = {
  port: 3000,
  envName: 'staging'
};

// Create production environment
environments.production = {
  port: 5000,
  envName: 'production'
};

// Determine whether environment was passed as command-line argument
const currentEnvironment =
  typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : '';

// Check if currentEnvironment is one of above, if not set to default
const environmentToExport =
  typeof environments[currentEnvironment] === 'object'
    ? environments[currentEnvironment]
    : environments.staging;

// Export module
module.exports = environmentToExport;
