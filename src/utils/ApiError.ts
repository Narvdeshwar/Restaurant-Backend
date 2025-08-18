export class ApiError extends Error {
  statusCode: number;
  errors: unknown;
  constructor(statusCode: number, message: string, errors: unknown = {}) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}
