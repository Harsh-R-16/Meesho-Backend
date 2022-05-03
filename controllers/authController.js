const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;
    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
    });
    const token = jwt.sign(
      { id: newUser._id },
      "meeshodb-secret-token-string",
      {
        expiresIn: "10d",
      }
    );
    res.status(201).json({
      message: "Success!!!",
      information: "Meesho Website Api",
      token,
      data: { user: newUser },
    });
  } catch (err) {
    res.status(404).json({
      status: "Error in signup process",
      message: err,
    });
  }
};

exports.login = async (req, res) => {
  //   try {
  const { email, password } = req.body;
  // 1
  if (!email || !password) {
    return res.status(400).json({
      status: "Please enter a valid credentials!",
      message: "login failed!",
    });
  }
  // 2
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    return res.status(404).json({
      status: "no such user!",
      message: "login failed!",
    });
  }
  if (user.password !== password) {
    return res.status(404).json({
      status: "Please enter a valid credentials!",
      message: "login failed!",
    });
  }

  // 3
  const token = jwt.sign({ id: user._id }, "meeshodb-secret-token-string", {
    expiresIn: "10d",
  });
  console.log(token);
  res.status(200).json({
    message: "Success!!!",
    information: "Meesho Website Api",
    token,
  });
  //   } catch (err) {
  //     res.status(404).json({
  //       status: "Error in login process",
  //       message: err,
  //     });
  //   }
};
