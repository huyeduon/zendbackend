const { BAD_REQUEST } = require("./core/http_response");
const saltRouds = 10;

const register = async (req, res, next) => {
  const { email, password } = req.body;

  // check if the email is already exist
  const user = await findUserByEmail(email);
  if (user) throw new BAD_REQUEST("Email exists, please use different email.");

  let salt = bcrypt.genSaltSync(saltRouds);
  let hashedPassword = bcrypt.hashSync(password, salt);
};

const findUserByEmail = async (email) => {
  return await MyModel.findOne({ email });
};

const registerUser = async (data) => {
  await MyModel.creat(data);
  return { message: "Created successfully" };
};
