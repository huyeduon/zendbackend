const status_message = require("./status_message");
const status_code = require("./status_code");

class SuccessResponse {
  constructor({ message, statusCode, metadata = {} }) {
    this.message = message;
    this.statusCode = statusCode;
    this.metadata = metadata;
  }

  send(res) {
    return res.status(this.statusCode).json(this);
  }
}

class OK extends SuccessResponse {
  constructor({
    message = status_message.OK,
    statusCode = status_code.OK,
    metadata = {},
  }) {
    super({ message, statusCode, metadata });
  }
}

class CREATED extends SuccessResponse {
  constructor({
    message = status_message.CREATED,
    statusCode = status_code.CREATED,
    metadata = {},
  }) {
    super({ message, statusCode, metadata });
  }
}

module.exports = {
  OK,
  CREATED,
};
