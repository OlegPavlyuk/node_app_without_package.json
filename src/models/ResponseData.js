// Map custom short content type name to its full HTTP version.
const contentTypeMap = {
  json: 'application/json',
  map: 'application/json',
  js: 'text/javascript',
  plain: 'text/plain',
  html: 'text/html',
  css: 'text/css',
  png: 'image/png',
  jpg: 'image/jpeg',
  favicon: 'image/x-icon'
};

// ResponseData class used to respond to API calls
class ResponseData {
  constructor(statusCode = 200, payload = {}, contentType = 'json') {
    this.statusCode = statusCode;
    this.contentType = contentType;
    this.contentTypeString =
      contentTypeMap[contentType] || contentTypeMap['json'];
    this.payload = payload;
    this.payloadString = this.parsePayload(payload, contentType);
  }

  parsePayload(payload, contentType) {
    // If content type is JSON and payload is an object we need to stringify it.
    if (contentType === 'json') {
      payload =
        typeof payload === 'object' && payload ? JSON.stringify(payload) : '';
    }

    // Return content type as is unless it is undefined.
    return typeof payload !== 'undefined' ? payload : '';
  }
}

// Export the module
module.exports = ResponseData;
