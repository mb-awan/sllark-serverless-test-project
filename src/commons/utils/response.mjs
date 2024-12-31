export const APIResponse = {
  success: (res, message, data = {}, statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  },

  error: (res, message, error = null, statusCode = 400) => {
    return res.status(statusCode).json({
      success: false,
      message,
      error,
    });
  },
};

