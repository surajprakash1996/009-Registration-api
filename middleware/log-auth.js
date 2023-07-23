const { body, validationResult } = require("express-validator");
const registrationModel = require("../models/registration.models");
const { stripHtmlFromText } = require("../utils/helper");

const formValidator = () => {
  return [
    body("emailAddress")
      .notEmpty()
      .withMessage("Email Address Should Not be Empty.")
      .isEmail()
      .withMessage("Invalid email address")
      .customSanitizer((value) => stripHtmlFromText(value))
      .optional(),


    body("password")
      .notEmpty()
      .withMessage("Password should not be empty.")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 character.")
      .optional(),
  ];
};

const validator = (req, res, next) => {
  const errors = validationResult(req);
  const errorMessages = errors.array().map((error) => {
    return { field: error.path, message: error.msg };
  });

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        code: 400,
        message: "Validation error",
        errors: errorMessages,
      },
    });
  }
  next();
};

module.exports = {
  formValidator,
  validator,
};
