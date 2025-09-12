



const handleErrors = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
}

export default handleErrors;