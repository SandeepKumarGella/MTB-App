const express = require("express");
const router = express.Router();

const {
  addMovie,
  getAllMovies,
  searchMovies,
  deleteMovie
} = require("../controllers/movieController");

const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

// Admin add movie
router.post("/", protect, authorizeRoles("ADMIN"), addMovie);

// Get all movies
router.get("/", protect, getAllMovies);

// Search movies
router.get("/search", protect, searchMovies);

// Admin delete movie
router.delete("/delete/:id", protect, authorizeRoles("ADMIN"), deleteMovie);

module.exports = router;