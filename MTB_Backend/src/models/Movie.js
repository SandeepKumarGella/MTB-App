const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
{
  movieName: {
    type: String,
    required: true
  },
  theatreName: {
    type: String,
    required: true
  },
  totalTickets: {
    type: Number,
    required: true
  },
  availableTickets: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["AVAILABLE", "BOOK_ASAP", "SOLD_OUT"],
    default: "AVAILABLE"
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);