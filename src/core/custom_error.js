const statusMessage = require("./status_message");
const statusCode = require("./status_code");
class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class BadRequestError extends ErrorResponse {
  constructor(
    message = statusMessage.BAD_REQUEST,
    status = statusCode.BAD_REQUEST
  ) {
    super(message, status);
  }
}

module.exports = {
  ErrorResponse,
  BadRequestError,
};
