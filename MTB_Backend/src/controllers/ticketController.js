const Movie = require("../models/Movie");
const Ticket = require("../models/Ticket");
const mongoose = require("mongoose");


// Book Ticket
const bookTicket = async (req, res) => {
  try {

    const { movieId, numberOfTickets, seatNumbers } = req.body;

    if (!movieId || !numberOfTickets) {
      return res.status(400).json({
        message: "Movie and ticket count required"
      });
    }

    // Atomic update to prevent overbooking
    const movie = await Movie.findOneAndUpdate(
      {
        _id: movieId,
        availableTickets: { $gte: numberOfTickets }
      },
      {
        $inc: { availableTickets: -numberOfTickets }
      },
      { new: true }
    );

    if (!movie) {
      return res.status(400).json({
        message: "Tickets not available"
      });
    }

    // Update movie status
    let status = "AVAILABLE";

    if (movie.availableTickets === 0) {
      status = "SOLD_OUT";
    } 
    else if (movie.availableTickets <= movie.totalTickets / 2) {
      status = "BOOK_ASAP";
    }

    movie.status = status;
    await movie.save();

    // Create ticket
    const ticket = await Ticket.create({
      userId: req.user._id,
      movieId: movie._id,
      theatreName: movie.theatreName,
      numberOfTickets,
      seatNumbers
    });

    res.status(201).json({
      message: "Ticket booked successfully",
      ticket
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// Get My Tickets
const getMyTickets = async (req, res) => {
  try {

    const tickets = await Ticket.find({
      userId: req.user._id
    }).populate("movieId");

    res.status(200).json({
      count: tickets.length,
      tickets
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};


// Admin - View All Tickets
const getAllTickets = async (req, res) => {
  try {

    const tickets = await Ticket.find()
      .populate("userId", "loginId")
      .populate("movieId");

    res.status(200).json({
      count: tickets.length,
      tickets
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

// Admin - Update Ticket Status Manually
const updateTicketStatus = async (req, res) => {
  try {
    const { moviename, ticketId } = req.params;
    const { status } = req.body;

    if (!["AVAILABLE", "BOOK_ASAP", "SOLD_OUT"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Try finding by Ticket ID first (if it's a valid Mongo ObjectId and matches a ticket)
    let movieToUpdate = null;
    
    if (mongoose.Types.ObjectId.isValid(ticketId)) {
        const ticket = await Ticket.findById(ticketId);
        if (ticket) {
            movieToUpdate = await Movie.findById(ticket.movieId);
        } else {
            // If not a ticket, maybe it's the Movie ID itself
            movieToUpdate = await Movie.findById(ticketId);
        }
    }

    // If still not found, try finding movie by name
    if (!movieToUpdate) {
        movieToUpdate = await Movie.findOne({ movieName: moviename });
    }

    if (!movieToUpdate) {
        return res.status(404).json({ message: "Movie or Ticket not found" });
    }

    if (movieToUpdate.availableTickets === 0) {
        movieToUpdate.status = "SOLD_OUT";
    } else {
        movieToUpdate.status = status;
    }
    
    await movieToUpdate.save();

    res.status(200).json({ message: "Status updated successfully", movie: movieToUpdate });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Booked Seats for a Movie
const getBookedSeats = async (req, res) => {
  try {
    const { movieId } = req.params;

    const tickets = await Ticket.find({ movieId }).select("seatNumbers");
    
    // Flatten the array of arrays of seat numbers
    const bookedSeats = tickets.reduce((acc, ticket) => {
      return [...acc, ...ticket.seatNumbers];
    }, []);

    res.status(200).json({
      count: bookedSeats.length,
      bookedSeats
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = {
  bookTicket,
  getMyTickets,
  getAllTickets,
  updateTicketStatus,
  getBookedSeats
};