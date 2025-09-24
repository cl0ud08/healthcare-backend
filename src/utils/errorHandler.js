const { Prisma } = require('@prisma/client');

function errorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Handling Prisma known errors
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Record not found' });
    }
    // Add more specific Prisma error codes as needed
  }
  
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
}

module.exports = errorHandler;