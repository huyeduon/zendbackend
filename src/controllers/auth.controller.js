const {
  registerUser,
  findUserByEmail,
  findUserById,
  findUserByIdAndUpdatePassword,
} = require("../services/user.service");

const {
  createToken,
  findUserWithRefreshToken,
} = require("../services/keyToken.service");
const { OK, BAD_REQUEST } = require("../core/http_response");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

// User Registration
const register = async (req, res, next) => {
  // Validate if user email exist
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (user) throw new BAD_REQUEST("Email exists, please use different email.");

  // hash the password using bcrypt
  let salt = bcrypt.genSaltSync(saltRounds);
  let hashedPassword = bcrypt.hashSync(password, salt);
  const newUser = await registerUser({ email, password: hashedPassword });

  new OK({
    message: "Create user successfully",
    metadata: newUser,
  }).send(res);
};

// Login
const login = async (req, res, next) => {
  //1. check email
  //2. so sanh password
  //3. neu password dung, tao jwt token

  const { email, password } = req.body;
  // Check if user email exist
  const user = await findUserByEmail(email);
  if (!user) throw new BAD_REQUEST("Email or password is not correct.");

  // If user email exists, check password
  if (!bcrypt.compareSync(password, user.password))
    throw new BAD_REQUEST("Email or password is not correct.");

  // User and password are correct, create JWT access token
  const token = jwt.sign(
    { userid: user.id },
    process.env.jwt_access_private_key,
    {
      algorithm: process.env.jwt_algorithm,
      expiresIn: process.env.jwt_access_token_expiration,
    }
  );

  // Create JWT refresh token
  const refresh_token = jwt.sign(
    { userid: user.id },
    process.env.jwt_refresh_private_key,
    {
      algorithm: process.env.jwt_algorithm,
      expiresIn: process.env.jwt_refresh_token_expiration,
    }
  );

  // Save userid and refresh_token to mongodb table KeyTokens
  await createToken({ refresh_token: refresh_token, userid: user.id });

  // return result including access token, refresh token
  new OK({
    message: "Login successfully",
    metadata: { token: token, refresh_token: refresh_token },
  }).send(res);
};

// If access token is expired, update it using refresh token
// Update the expired access token using refresh token
const updateAccessToken = async (req, res, next) => {
  // userId in header
  // refresh token in body
  // check if refresh_token belongs to userId
  const userId = req.headers.userid;
  const refresh_token = req.body.refresh_token;

  // check if userId and refresh token are in KeyToken mongodb
  const foundKey = await findUserWithRefreshToken({
    refresh_token: refresh_token,
    userId: userId,
  });

  if (!foundKey) throw new BAD_REQUEST("User or refresh do not exist!");

  // Verify refresh_token, make sure refresh token is valid.
  const jwt_key = process.env.jwt_refresh_private_key;
  const decoded = jwt.verify(refresh_token, jwt_key);
  if (!decoded) throw new BAD_REQUEST("Refresh token is not valid");

  // Create new access token (update the expired access token)
  const token = jwt.sign(
    { userid: userId },
    process.env.jwt_access_private_key,
    {
      algorithm: process.env.jwt_algorithm,
      expiresIn: process.env.jwt_access_token_expiration,
    }
  );

  new OK({
    message: "Access token update successfully",
    metadata: { token: token },
  }).send(res);
};

// Retrieve user info
const info = async (req, res, next) => {
  const userid = req.userid;
  const user = await findUserById(userid, "-password");
  if (!user) throw new BAD_REQUEST("User does not exist");

  new OK({
    message: "User info",
    metadata: user,
  }).send(res);
};

const changePassword = async (req, res, next) => {
  // change password
  //1. user
  //2 . password cu ==
  //3. hash passowrd new
  // 4. save
  const userid = req.userid;
  const user = await findUserById(userid);
  if (!user) throw new BAD_REQUEST("User does not exist");
  const { oldPassword, newPassword } = req.body;

  if (!bcrypt.compareSync(oldPassword, user.password))
    throw new BAD_REQUEST("Email or password is not correct.");

  let salt = await bcrypt.genSaltSync(saltRounds);

  let hashedPassword = bcrypt.hashSync(newPassword, salt);
  const updateUser = await findUserByIdAndUpdatePassword(
    userid,
    hashedPassword
  );

  new OK({
    message: "User info",
    metadata: updateUser,
  }).send(res);
};

module.exports = {
  register,
  login,
  info,
  changePassword,
  updateAccessToken,
};
