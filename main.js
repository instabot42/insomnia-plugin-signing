const CryptoJS = require("crypto-js");

function computeHttpSignature(msg, key) {
  const hash = CryptoJS.HmacSHA256(msg, key);
  return CryptoJS.enc.Hex.stringify(hash);
}

// A request hook will be run before sending the request to API, but after everything else is finalized
module.exports.requestHooks = [
  (context) => {
    const req = context.request;

    // Check for a valid api secret
    const key = req.getEnvironmentVariable("API_SECRET");
    if (key == null) {
      console.log(
        'Could not find environment variable "API_SECRET". Cannot sign message'
      );
      throw new Error(
        "Message should be signed, but cannot find 'API_SECRET' environment variable."
      );
    }

    // Check for timestamp header
    if (!req.hasHeader("X-API-TS")) {
      console.log('Could not find header "FTX-TS". Cannot sign message');
      throw new Error(
        "Message should be signed, but cannot find 'FTX-TS' header."
      );
    }

    const method = req.getMethod();
    const timestamp = req.getHeader("X-API-TS");
    const path = new URL(req.getUrl()).pathname;
    const body = req.getBody().text || "";

    const message = `${timestamp}${method}${path}${body}`;
    const signature = computeHttpSignature(message, key);

    req.setHeader("X-API-SIGN", signature);
  },
];
