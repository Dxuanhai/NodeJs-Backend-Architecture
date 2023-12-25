"use strict";
const StatusCode = {
  FOBBIDDEN: 403,
  CONFLICT: 409,
};
const ReasonStatusCode = {
  FOBBIDDEN: "BAD RESQUEST ERROR",
  CONFLICT: "CONFLICT ERROR",
};

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class ConflictErrorResponse extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.CONFLICT,
    statusCode = StatusCode.CONFLICT
  ) {
    super(message, statusCode);
  }
}
class BadRequestError extends ErrorResponse {
  constructor(
    message = ReasonStatusCode.FOBBIDDEN,
    statusCode = StatusCode.FOBBIDDEN
  ) {
    super(message, statusCode);
  }
}

module.exports = {
  BadRequestError,
  ConflictErrorResponse,
};
