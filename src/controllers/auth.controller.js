const { registerUser, findUserByEmail } = require("../services/user.service");
const { OK, CREATED, BAD_REQUEST } = require("../core/http_response");
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

  let salt = await bcrypt.genSaltSync(saltRounds);

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
    message: "Create user successfully",
    metadata: { token: token },
  }).send(res);
};

module.exports = {
  register,
  login,
};
