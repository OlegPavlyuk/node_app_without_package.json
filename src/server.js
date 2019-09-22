// Dependencies
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const config = require('./config');
const router = require('./router');
const ResponseData = require('./models/ResponseData');

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

    // Choose the controller this request should go to, otherwise use router notFound
    let chosenController;

    if (router.routes[trimmedPath]) {
      chosenController = router.routes[trimmedPath].controller;
    } else {
      chosenController = router.notFound;
    }

    // Construct the data object to send to the handler.
    const requestData = new RequestData({
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload
    });

    chosenController(requestData)
      .then(responseData => {
        res.setHeader('Content-Type', responseData.contentTypeString);
        res.writeHead(responseData.statusCode);
        res.end(responseData.payloadString);
      })
      .catch(err => {
        // Create error response object.
        const responseData = new ResponseData(500, {
          error: 'Request can not be served'
        });

        // Return error response.
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(responseData.statusCode);
        res.end(responseData.payloadString);
      });
  });
});

server.listen(config.port, () =>
  console.log(
    `Server listening on port ${config.port} in ${config.envName} mode`
  )
);
