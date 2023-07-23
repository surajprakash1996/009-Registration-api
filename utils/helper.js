require('dotenv').config();

const { sign } = require("jsonwebtoken");
const { hash } = require("bcrypt");

const stripHtmlFromText = (text) => {
  const regex = /<[^>]+>/g;
  return text.replace(regex, "");
};

const hashPassword = async (password) => {
  try {
    const genSalt = parseInt(process.env.GEN_SALT);
    const hashedPass = await hash(password, genSalt);
    return hashedPass;
    
  } catch (err) {
    throw new Error(err.message);
  }
};

const generateToken = (user) => {
  const secret = process.env.SECRET_KEY;
  const payload = {
    id: user._id,
    emailAddress: user.emailAddress,
  };
  const options = {
    expiresIn: "1h",
  };
  const token = sign(payload, secret, options);
  return token;
};


module.exports = {
  stripHtmlFromText,
  hashPassword,
  generateToken
};
