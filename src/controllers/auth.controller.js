const {
  registerUser,
  findUserByEmail,
  findUserById,
  findUserByIdAndUpdatePassword,
} = require("../services/user.service");
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
  });

  new OK({
    message: "Login successfully",
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
};
