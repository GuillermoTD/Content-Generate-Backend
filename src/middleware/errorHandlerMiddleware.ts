const errorHandlerMiddleware = (
  error: { message: any; stack: any },
  req: any,
  res: {
    statusCode: number;
    status: (arg0: any) => void;
    json: (arg0: {
      message: any;
      // Only include stack trace in development mode
      stack: any;
    }) => void;
  },
  next: any
): void => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // If status code is 200, change it to 500 (server error)
  res.status(statusCode);

  res.json({
    message: error.message,
    // Only include stack trace in development mode
    stack: process.env.NODE_ENV === "development" ? error.stack : {},
  });
  return;
};

export default errorHandlerMiddleware;
