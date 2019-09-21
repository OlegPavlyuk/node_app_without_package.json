// Dependencies
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

const server = http.createServer((req, res) => {
  // Parse url from request object
  const parsedUrl = url.parse(req.url, true);

  // Get path from parsed url
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get query string object
  const queryStringObject = parsedUrl.query;

  // Get lowercase HTTP method from request object
  const method = req.method.toLowerCase();

  // Get request headers as an object
  const headers = req.headers;

  // Get payload if any
  const decoder = new StringDecoder('utf8');
  let buffer = '';
  req.on('data', chunk => (buffer += decoder.write(chunk)));
  req.on('end', () => {
    buffer += decoder.end();

    // Choose the handler this request should go to, otherwise use notFound handler
    const chosenHandler =
      typeof router[trimmedPath] !== 'undefined'
        ? router[trimmedPath]
        : handlers.notFound;

    // Construct data object from the request
    const data = {
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
      payload: buffer
    };

    chosenHandler(data, function(statusCode, payload) {
      // Use handler's status code or default to 200
      statusCode = typeof statusCode === 'number' ? statusCode : 200;

      // Use handler's payload or default to {}
      payload = typeof payload === 'object' ? payload : {};

      // Convert payload to a string
      const payloadString = JSON.stringify(payload);

      // Send response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      console.log(`Returning this respone: ${statusCode}, ${payloadString}`);
    });
  });
});

server.listen(3000, () => console.log(`Server listening on port 3000`));

// Define handlers
const handlers = {};

// Define test handler
handlers.test = (data, callback) => {
  // Callback http status code and payload object
  callback(406, { name: 'test handler' });
};

// Define not found handler
handlers.notFound = (data, callback) => {
  callback(404);
};

// Define router
const router = {
  test: handlers.test
};
