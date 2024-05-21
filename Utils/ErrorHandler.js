const AppError = require('./AppError');

function handleDuplicationError(error, response) {
  const duplicateValues = error.message.match(/"([^"]*)"/)[0];
  const message = 'Account already exists with: ' + duplicateValues;
  response.render('signup', {
    errorMessage: message,
  });
}

function handleCastError(error) {
  const message = `Invalid ${error.path}: ${error.value}`;
  return new AppError(message, 400);
}

function handleValidationError(error) {
  const messages = Object.values(error.errors)
    .map((err) => err.message)
    .join(' , ');
  return new AppError(messages, 400);
}

function handleJwtExpirationError() {
  return new AppError('JWT Expired. Please Renew New Token', 401);
}

function sendErrorProduction(error, response) {
  if (error.code === 11000) return handleDuplicationError(error, response);
  if (error.name === 'CastError') error = handleCastError(error);
  if (error.name === 'ValidationError') error = handleValidationError(error);
  if (error.name === 'TokenExpiredError') error = handleJwtExpirationError();
  if (error.isOperational) {
    if (error.errorFrom === 'login') {
      response.render('login', {
        errorMessage: error.message,
      });
    } else {
      response.send(`${error.message}`);
    }
  } else {
    response.status(error.statusCode).json({
      message: 'Something went very wrong',
    });
  }
}

function sendErrorDevelopment(error, response) {
  response.status(error.statusCode).json({
    message: error.message,
    stack: error.stack,
    error,
  });
}

module.exports = (error, request, response, next) => {
  error.statusCode = error.statusCode || 500;
  process.env.NODE_ENV = 'production';
  error.status = error.status || 'Error';
  console.log(error); // Log the error for debugging purposes
  return sendErrorProduction(error, response);
};
