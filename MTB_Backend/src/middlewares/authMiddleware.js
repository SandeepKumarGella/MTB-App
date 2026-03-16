const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {

    let token;

    // check authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, token missing"
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user to request
    req.user = await User.findById(decoded.id).select("-password");

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Not authorized, token invalid"
    });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    next();
  };
};

module.exports = { protect, authorizeRoles };