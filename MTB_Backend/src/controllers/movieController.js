const Movie = require("../models/Movie");


// Add Movie (Admin)
const addMovie = async (req, res) => {
  try {

    const { movieName, theatreName, totalTickets } = req.body;

    if (!movieName || !theatreName || !totalTickets) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // check duplicate movie + theatre
    const existingMovie = await Movie.findOne({
      movieName,
      theatreName
    });

    if (existingMovie) {
      return res.status(400).json({
        message: "Movie already exists in this theatre"
      });
    }

    const movie = await Movie.create({
      movieName,
      theatreName,
      totalTickets,
      availableTickets: totalTickets,
      createdBy: req.user._id
    });

    res.status(201).json({
      message: "Movie added successfully",
      movie
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// Get All Movies
const getAllMovies = async (req, res) => {
  try {

    const movies = await Movie.find();

    res.status(200).json({
      count: movies.length,
      movies
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// Search Movie
const searchMovies = async (req, res) => {
  try {

    const { name } = req.query;

    if (!name) {
      return res.status(400).json({
        message: "Movie name query is required"
      });
    }

    const movies = await Movie.find({
      movieName: { $regex: name, $options: "i" }
    });

    res.status(200).json({
      count: movies.length,
      movies
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// Delete Movie (Admin)
const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if tickets are booked for this movie
    const Ticket = require("../models/Ticket");
    await Ticket.deleteMany({ movieId: id });

    const movie = await Movie.findByIdAndDelete(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addMovie,
  getAllMovies,
  searchMovies,
  deleteMovie
};