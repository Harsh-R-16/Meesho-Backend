const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      message: "Success!!!",
      information: "Meesho Website Api",
      results: users.length,
      data: users,
    });
  } catch (err) {
    res.status(500).json({ message: "Work in progress!!!" });
  }
};

exports.createUser = (req, res) => {
  res.status(500).json({ message: "Work in progress!!!" });
};

exports.getSingleUser = (req, res) => {
  res.status(500).json({ message: "Work in progress!!!" });
};

exports.updateUser = (req, res) => {
  res.status(500).json({ message: "Work in progress!!!" });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({ message: "Work in progress!!!" });
};
