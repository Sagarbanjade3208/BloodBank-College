class AppError extends Error {
  constructor(message, statusCode, errorFrom) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'Fail' : 'Error';
    this.isOperational = true;
    this.errorFrom = errorFrom;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
