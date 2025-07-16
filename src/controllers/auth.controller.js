const {
  registerUser,
  findUserByEmail,
  findUserById,
  findUserByIdAndUpdatePassword,
} = require("../services/user.service");

const { createToken, findOne } = require("../services/keyToken.service");
const { OK, BAD_REQUEST } = require("../core/http_response");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const register = async (req, res, next) => {
  //1. check email pass
  //2. hash pass
  //3. save user pass
  // console.log(req.body);
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (user) throw new BAD_REQUEST("Email exists, please use different email.");

  let salt = bcrypt.genSaltSync(saltRounds);

  let hashedPassword = bcrypt.hashSync(password, salt);

  new OK({
    message: "Create user successfully",
    metadata: await registerUser({ email, password: hashedPassword }),
  }).send(res);
};

const login = async (req, res, next) => {
  //1. check email
  //2. so sanh password
  //3. neu password dung, tao jwt token

  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) throw new BAD_REQUEST("Email or password is not correct.");

  if (!bcrypt.compareSync(password, user.password))
    throw new BAD_REQUEST("Email or password is not correct.");

  const token = jwt.sign({ userid: user.id }, process.env.jwt_private_key, {
    algorithm: "HS256",
    expiresIn: "10s",
  });

  const refresh_token = jwt.sign(
    { userid: user.id },
    process.env.jwt_private_key,
    {
      algorithm: "HS256",
      expiresIn: "365day",
    }
  );

  await createToken({ refresh_token: refresh_token, userid: user.id });

  new OK({
    message: "Login successfully",
    metadata: { token: token, refresh_token: refresh_token },
  }).send(res);
};

// Update the expired access token using refresh token
const updateAccessToken = async (req, res, next) => {
  // userId in header
  // refresh token in body
  // check if refresh_token belongs to userId
  const userId = req.headers.userid;
  const refresh_token = req.body.refresh_token;
  const foundKey = await findOne({
    refresh_token: refresh_token,
    userId: userId,
  });

  if (!foundKey) throw new BAD_REQUEST("User and refresh token do not match");
  // Verify refresh_token
  const jwt_key = process.env.jwt_private_key;
  const decoded = jwt.verify(refresh_token, jwt_key);
  if (!decoded) throw new BAD_REQUEST("Refresg token is not valid");

  const token = jwt.sign({ userid: userId }, process.env.jwt_private_key, {
    algorithm: "HS256",
    expiresIn: "10s",
  });

  new OK({
    message: "Access token update successfully",
    metadata: { token: token },
  }).send(res);
};

const info = async (req, res, next) => {
  // get user info
  // console.log(req.userid);
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
