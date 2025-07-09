const status_message = {
  OK: "Success",
  CREATED: "Resource created",
  NO_CONTENT: "No content",
  BAD_REQUEST: "Invalid request",
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
  NOT_FOUND: "Not found",
  CONFLICT: "Conflict detected",
  INTERNAL_SERVER_ERROR: "Server error",
};

const status_code = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

class BaseResponse {
  constructor({ message, statusCode, metadata = {} }) {
    this.message = message;
    this.statusCode = statusCode;
    this.metadata = metadata;
    this.timestamp = new Date().toISOString();
  }

  send(res) {
    console.log(
      `[${this.timestamp}] Status: ${this.statusCode}, Message: ${this.message}`
    );
    return res.status(this.statusCode).json(this);
  }
}

class SuccessResponse extends BaseResponse {}
class ErrorResponse extends BaseResponse {}

// Success Responses
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

// Error Responses
class BAD_REQUEST extends ErrorResponse {
  constructor(
    message = status_message.BAD_REQUEST,
    statusCode = status_code.BAD_REQUEST,
    metadata = {}
  ) {
    super({ message, statusCode, metadata });
  }
}

class UNAUTHORIZED extends ErrorResponse {
  constructor({
    message = status_message.UNAUTHORIZED,
    statusCode = status_code.UNAUTHORIZED,
    metadata = {},
  }) {
    super({ message, statusCode, metadata });
  }
}

class FORBIDDEN extends ErrorResponse {
  constructor({
    message = status_message.FORBIDDEN,
    statusCode = status_code.FORBIDDEN,
    metadata = {},
  }) {
    super({ message, statusCode, metadata });
  }
}

class NOT_FOUND extends ErrorResponse {
  constructor({
    message = status_message.NOT_FOUND,
    statusCode = status_code.NOT_FOUND,
    metadata = {},
  }) {
    super({ message, statusCode, metadata });
  }
}

class CONFLICT extends ErrorResponse {
  constructor({
    message = status_message.CONFLICT,
    statusCode = status_code.CONFLICT,
    metadata = {},
  }) {
    super({ message, statusCode, metadata });
  }
}

class INTERNAL_SERVER_ERROR extends ErrorResponse {
  constructor({
    message = status_message.INTERNAL_SERVER_ERROR,
    statusCode = status_code.INTERNAL_SERVER_ERROR,
    metadata = {},
  }) {
    super({ message, statusCode, metadata });
  }
}

module.exports = {
  OK,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
};
