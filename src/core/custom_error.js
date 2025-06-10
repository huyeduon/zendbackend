const status_message = require("./status_message");
const status_code = require("./status_code");
class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class BadRequestError extends ErrorResponse {
  constructor(
    message = status_message.BAD_REQUEST,
    status = status_code.BAD_REQUEST
  ) {
    super(message, status);
  }
}

module.exports = {
  ErrorResponse,
  BadRequestError,
};
