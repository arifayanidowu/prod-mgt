const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ status: true, data: user, token });
};

module.exports = sendTokenResponse;
