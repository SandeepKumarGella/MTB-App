const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/movies", movieRoutes);

app.use("/api/v1/tickets", ticketRoutes);

app.get("/", (req, res) => {
  res.send("Movie Booking API Running");
});

module.exports = app;