const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please tell us your email!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email address!"],
  },
  profile: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please provide a valid password!"],
    minLength: 5,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password!"],
    validate: {
      validator: function (el) {
        return el == this.password;
      },
      message: "Password are not same!",
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
