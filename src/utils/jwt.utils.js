const jwt = require("jsonwebtoken");
const config = require("../configurations/config").config();

// TODO: The invalid tokens should be loaded and stored
let invalidTokens = [];

exports.pushToken = function (token) {
  if (invalidTokens.indexOf(token) === -1) {
    invalidTokens.push(token);
  }
};

exports.isValid = function (token) {
  try {
    let index = invalidTokens.indexOf(token);
    if (index !== -1) return null;
    return jwt.verify(token, config.JWT_SECRET);
  } catch (err) {
    return null;
  }
};

exports.createToken = function (claims) {
  let date = new Date();
  let token = jwt.sign(
    {
      ...claims,
      creation: date,
    },
    config.JWT_SECRET,
    {
      algorithm: "HS512",
      expiresIn: `${config.JWT_EXPIRE}m`,
    }
  );
  return token;
};
