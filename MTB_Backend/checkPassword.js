const bcrypt = require("bcryptjs");

console.log("Script started");
const checkHash = async () => {
  const password = "admin123";
  const hash = "$2b$10$GA9CK.GDuurNEVX7LHg.jOTKZDgcygZ3TuV91Bu9MuI1z8GgURNj6";
  const isMatch = await bcrypt.compare(password, hash);
  console.log("Password Match:", isMatch);
};

checkHash();
