const { Schema, model } = require("mongoose");

const registrationSchema = Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
    },
    emailAddress: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = model("Registrations", registrationSchema);
