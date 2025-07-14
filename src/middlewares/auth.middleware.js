const jwt = require("jsonwebtoken");
const { UNAUTHORIZED } = require("../core/http_response");

const authorization = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  // verify token

  try {
    const jwt_key = process.env.jwt_private_key;
    const decoded = jwt.verify(token, jwt_key);
    if (!decoded) {
      throw new UNAUTHORIZED();
    }
    req.userid = decoded.userid;
    next();
  } catch (err) {
    throw new UNAUTHORIZED();
  }
  // console.log(decoded);
};

module.exports = { authorization };
