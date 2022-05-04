const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
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
  try {
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
  } catch (err) {
    res.status(404).json({
      status: "Error in login process",
      message: err,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No user found!" });
    }

    let transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "dd877855213e35",
        pass: "3a9970190ab81c",
      },
    });

    const token = jwt.sign({ id: user._id }, "meeshodb-secret-token-string", {
      expiresIn: "10d",
    });

    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${token}`;

    let info = await transport.sendMail({
      from: "Harsh Gajera <harsh.gajera17@gmail.com>",
      to: "harsh.gajera163@gmail.com",
      subject: "Hello ✔", // Subject line
      text: resetURL, // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log(info);

    res.status(201).json({
      message: "Success!!!",
      information: "Meesho Website Api",
      link: resetURL,
    });
  } catch (err) {
    res.status(404).json({
      status: "Error in process!",
      message: err,
    });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No user found!" });
    }
    user.password = password;
    user.passwordConfirm = password;
    res
      .status(200)
      .json({ message: "Success!!!", information: "Meesho Website", user });
  } catch (err) {}
};

// update password
// update details
