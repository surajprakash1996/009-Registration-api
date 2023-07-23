require("dotenv").config();
const { verify } = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(400).json({
        status: false,
        error: {
          code: 400,
          message: "Token Empty.",
        },
      });
    }
    const decoded = await verify(token, process.env.SECRET_KEY);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decoded.exp && currentTimestamp > decoded.exp) {
        return res.status(400).json({
            status: false,
            error: {
              code: 400,
              message: 'Token has expired.'
            },
        });
    } 
    else {
      req.user = {
        id:decoded.id,
        emailAddress:decoded.emailAddress
      }
      next();
    }
  } catch (err) {
    res.status(400).json({
      status: false,
      error: {
        code: 400,
        message: err.message,
      },
    });
  }
};
