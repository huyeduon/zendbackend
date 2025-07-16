const jwt = require("jsonwebtoken");
const { UNAUTHORIZED } = require("../core/http_response");

// Log the key when the module is first loaded
console.log("Authorization Middleware Loaded.");
console.log(
  "Initial process.env.jwt_access_private_key:",
  process.env.jwt_access_private_key
);

const authorization = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.warn("No Authorization header provided.");
    return res
      .status(401)
      .json(new UNAUTHORIZED("No Authorization header provided.").send(res));
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    console.warn("Invalid Authorization header format.");
    return res
      .status(401)
      .json(
        new UNAUTHORIZED(
          "Invalid Authorization header format. Must be 'Bearer TOKEN'."
        ).send(res)
      );
  }

  const token = parts[1]; // This is the token being verified

  try {
    const jwt_key = process.env.jwt_access_private_key; // Get the key again inside the function
    console.log("\n--- JWT Verification Attempt ---");
    console.log("Token received:", token);
    console.log(
      "JWT Key being used for verification (inside middleware function):",
      jwt_key
    ); // THIS IS THE MOST IMPORTANT LOG

    // Perform the verification
    const decoded = jwt.verify(token, jwt_key);

    console.log("Token successfully decoded:", decoded); // If this logs, verification succeeded
    req.userid = decoded.userid;
    next(); // Proceed if verification is successful
  } catch (err) {
    // This block should be hit if the token is invalid, expired, or signed with a wrong key
    console.error("--- JWT Verification Error ---");
    console.error("Error Name:", err.name);
    console.error("Error Message:", err.message);
    console.error("Full Error Object:", err); // Log the full error object for more details

    return res
      .status(401)
      .json(new UNAUTHORIZED("Invalid or expired token.").send(res));
  }
};

module.exports = { authorization };
