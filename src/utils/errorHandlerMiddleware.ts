





const errorHandlerMiddleware = (error,req,res,next): string => {
 const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // If status code is 200, change it to 500 (server error)
  res.status(statusCode);

  res.json({
    message: error.message,
    // Only include stack trace in development mode
    stack: process.env.NODE_ENV === 'development' ? error.stack : {},
  });
}

export default errorHandlerMiddleware;