const sendSuccessResponse = (res, statusCode, message, data = "") => {
  res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};

module.exports = sendSuccessResponse;
