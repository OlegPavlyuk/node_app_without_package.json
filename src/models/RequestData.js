// RequestData class
class RequestData {
  constructor({ trimmedPath, queryStringObject, method, headers, payload }) {
    this.trimmedPath = trimmedPath;
    this.queryStringObject = queryStringObject;
    this.method = method;
    this.headers = headers;
    this.payload = payload;
  }
}

// Export Module
module.exports = RequestData;
