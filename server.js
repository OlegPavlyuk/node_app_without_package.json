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

    // Send response
    res.end('Hello from server');
  });
});

server.listen(3000, () => console.log(`Server listening on port 3000`));
