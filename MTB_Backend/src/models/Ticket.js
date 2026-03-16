const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true
  },
  theatreName: {
    type: String,
    required: true
  },
  numberOfTickets: {
    type: Number,
    required: true
  },
  seatNumbers: {
    type: [String],
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);