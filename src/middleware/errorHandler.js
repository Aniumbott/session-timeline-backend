import logger from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  logger.error('Error handler:', { error: err });

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};