"use strict";
const StatusCode = {
  FOBBIDDEN: 403,
  CONFLICT: 409,
};
const ReasonStatusCode = {
  FOBBIDDEN: "BAD RESQUEST ERROR",
  CONFLICT: "CONFLICT ERROR",
};

const { StatusCodes, ReasonPhrases } = require("../utils/httpStatusCode");

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

class AuthFaiIureError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.UNAUTHORIZED,
    statusCode = StatusCode.UNAUTHORIZED
  ) {
    super(message, statusCode);
  }
}
class NotFoundError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.NOT_FOUND,
    statusCode = StatusCode.NOT_FOUND
  ) {
    super(message, statusCode);
  }
}
class ForbiddenError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.FORBIDDEN,
    statusCode = StatusCode.FOBBIDDEN
  ) {
    super(message, statusCode);
  }
}
module.exports = {
  BadRequestError,
  ConflictErrorResponse,
  AuthFaiIureError,
  NotFoundError,
  ForbiddenError,
};
