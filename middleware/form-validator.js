const { body, validationResult } = require("express-validator");
const registrationModel = require('../models/registration.models');
const { stripHtmlFromText } = require("../utils/helper");

const formValidator = () => {
  return [
    body("firstName")
      .notEmpty()
      .withMessage("First Name Should Not be Empty.")
      .isString()
      .withMessage("First Name Should be string format.")
      .isLength({ max: 15 })
      .withMessage("First Name Should not be maximum to 15 character.")
      .customSanitizer((value) => stripHtmlFromText(value))
      .optional(),

    body("lastName")
      .isString()
      .withMessage("Last Name should be string format.")
      .isLength({ max: 15 })
      .withMessage("Last Name Should not be maximum to 15 character.")
      .customSanitizer((value) => stripHtmlFromText(value))
      .optional(),

    body("emailAddress")
      .notEmpty()
      .withMessage("Email Address Should Not be Empty.")
      .isEmail()
      .withMessage("Invalid email address")
      .customSanitizer((value) => stripHtmlFromText(value))
      .optional()
      .custom(async (value) => {
        const User = await registrationModel.find({ emailAddress: value });
        if (User && User.length > 0) {
          throw new Error("Email Already Exists.");
        }
      })
      .withMessage("Email Already Exists."),

    body("password")
      .notEmpty()
      .withMessage("Password Should not be empty")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      )
      .optional(),

    body("confirmPassword")
      .notEmpty()
      .withMessage("Confirm Password Should not be empty.")
      .customSanitizer((value) => stripHtmlFromText(value))
      .optional()
      .custom(async (value,{req}) => {
          if (value !== req.body.password) {       
          throw new Error("Confirm Password not match.");
        }
      })
      .withMessage("Confirm Password not match."),
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
