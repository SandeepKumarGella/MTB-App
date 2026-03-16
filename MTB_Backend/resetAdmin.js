require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGO_URI;

const resetAdmin = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to DB");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    const result = await User.updateOne(
      { loginId: "admin" },
      { password: hashedPassword }
    );

    if (result.matchedCount === 0) {
      console.log("Admin user not found. Creating one...");
      await User.create({
        firstName: "Admin",
        lastName: "User",
        email: "admin@example.com",
        loginId: "admin",
        password: hashedPassword,
        contactNumber: "1234567890",
        role: "ADMIN"
      });
      console.log("Admin user created with password: admin123");
    } else {
      console.log("Admin password reset to: admin123");
    }

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

resetAdmin();
