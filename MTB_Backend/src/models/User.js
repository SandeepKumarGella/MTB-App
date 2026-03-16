const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  loginId: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER"
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);