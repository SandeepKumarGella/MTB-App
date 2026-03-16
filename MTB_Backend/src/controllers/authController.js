const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");

// ---- REGISTER USER START -----//
const registerUser = async (req, res) => {
  try {

    const {
      firstName,
      lastName,
      email,
      loginId,
      password,
      confirmPassword,
      contactNumber
    } = req.body;

    // validation
    if (!firstName || !lastName || !email || !loginId || !password || !confirmPassword || !contactNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // check existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { loginId }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email or LoginId already exists"
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      loginId,
      password: hashedPassword,
      contactNumber
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: user._id
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};
// ---- REGISTER USER END -----//

//  ---- LOGIN USER START ---- //
const loginUser = async (req, res) => {
  try {

    const { loginId, password } = req.body;

    if (!loginId || !password) {
      return res.status(400).json({
        message: "LoginId and Password are required"
      });
    }

    // find user
    const user = await User.findOne({ loginId });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // generate token
    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        loginId: user.loginId,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};
// ---- LOGIN USER END ---- //

// ---- FORGOT PASSWORD START ---- //
const forgotPassword = async (req, res) => {
  try {
    const { loginId, email, newPassword } = req.body;
    
    // At least one identifier and a new password are required
    if (!newPassword || (!loginId && !email)) {
      return res.status(400).json({ message: "LoginId or Email, and newPassword are required" });
    }

    const query = loginId ? { loginId } : { email };
    const user = await User.findOne(query);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// ---- FORGOT PASSWORD END ---- //

// ---- CHANGE PASSWORD START ---- //
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "oldPassword and newPassword are required" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect old password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// ---- CHANGE PASSWORD END ---- //

module.exports = { registerUser, loginUser, forgotPassword, changePassword };