require("dotenv").config();

const registrationModel = require("../models/registration.models");
const { generateToken, hashPassword } = require("../utils/helper");

const registrationNew = async (req, res) => {
  try {
    const registerUser = new registrationModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailAddress: req.body.emailAddress,
      password: await hashPassword(req.body.password),
    });

    const newUser = await registerUser.save();

    if (newUser) {
      return res.status(201).json({
        status: true,
        data: {
          token: generateToken(newUser),
          userInfo: {
            id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            emailAddress: newUser.emailAddress,
          },
        },
        message: "User created.",
        code: 201,
      });
    }

    res.status(400).json({
      status: false,
      error: {
        code: 400,
        message: "User not created.",
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

module.exports = {
  registrationNew,
};
