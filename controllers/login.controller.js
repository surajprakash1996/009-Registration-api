const registrationModel = require("../models/registration.models");
const { compare } = require("bcrypt");
const { generateToken } = require("../utils/helper");

const login = async (req, res) => {
  try {
    const userInfo = await registrationModel.find({
      emailAddress: req.body.emailAddress,
    });

    if (userInfo && userInfo.length > 0) {
      let isPassMatched = await compare(
        req.body.password,
        userInfo[0].password
      );
      if (isPassMatched) {
        return res.status(200).json({
          status: true,
          data: {
            token: generateToken(userInfo[0]),
            userInfo: {
              id: userInfo[0]._id,
              firstName: userInfo[0].firstName,
              lastName: userInfo[0].lastName,
              emailAddress: userInfo[0].emailAddress,
            },
          },
          message: "Login Success.",
          code: 200,
        });
      }

      return res.status(400).json({
        status: false,
        error: {
          code: 400,
          message: "Password not match.",
        },
      });
    }

    res.status(400).json({
      status: false,
      error: {
        code: 400,
        message: "Email Not Exist",
      },
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: {
        code: 500,
        message: err.message,
      },
    });
  }
};

const getDashboard = (req, res) => {
  res.status(200).json({
    status: true,
    data: {
      userInfo: req.user,
    },
    message: "Dashboard",
    code: 200,
  });
};

module.exports = {
  login,
  getDashboard,
};
