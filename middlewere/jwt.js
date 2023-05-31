function Signtoken(req, res) {
  const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
    expiresIn: "1h",
  });

  res.json({ accessToken });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const apiKey = req.headers["x-api-key"];
  const token = authHeader && authHeader.split(" ")[1];
console.log(13,apiKey);
console.log(14,token);
  if (apiKey === "Aspire@123") {
     next();
  }
  if (token) {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          const refreshToken = req.body.refreshToken;

          if (!refreshToken) {
            return res
              .status(401)
              .json({
                message: "Access token expired and refresh token not provided",
              });
          }

          jwt.verify(
            refreshToken,
            process.env.JWT_KEY,
            (refreshErr, refreshUser) => {
              if (refreshErr) {
                return res
                  .status(403)
                  .json({ message: "Invalid refresh token" });
              }

              const existingUser = user.find(
                (u) =>
                  u.id === refreshUser.userId && u.refreshToken === refreshToken
              );

              if (!existingUser) {
                return res
                  .status(403)
                  .json({ message: "Invalid refresh token" });
              }
            }
          );
        }
      }
    });
  }
}

module.exports = { Signtoken, authenticateToken };
