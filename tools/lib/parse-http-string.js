const parse = (request) => {
  const config = {};

  // split out headers and body
  const requestPieces = request.split("\n\n");
  const headers = requestPieces.shift().split("\n");
  config.data = requestPieces.join("\n\n");

  // parse method and url
  const requestLine = headers.shift().split(" ");
  config.method = requestLine[0];
  config.url = requestLine[1];

  // parse headers
  config.headers = {};
  headers.forEach((header) => {
    const pieces = header.split(": ");
    headerName = pieces.shift();
    headerValue = pieces.join(": ");
    config.headers[headerName] = headerValue;
  });

  if (config.headers.Host) {
    config.baseURL = config.headers.Host;
  }

  return config;
};

module.exports = parse;
