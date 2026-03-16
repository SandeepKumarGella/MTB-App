const express = require("express");
const router = express.Router();

const {
  bookTicket,
  getMyTickets,
  getAllTickets,
  updateTicketStatus,
  getBookedSeats
} = require("../controllers/ticketController");

const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

// User books ticket
router.post("/book", protect, bookTicket);

// User view own tickets
router.get("/my-tickets", protect, getMyTickets);

// Admin view all tickets
router.get("/", protect, authorizeRoles("ADMIN"), getAllTickets);

// Admin update ticket status manually
router.put("/:moviename/update/:ticketId", protect, authorizeRoles("ADMIN"), updateTicketStatus);

// Get booked seats for a movie
router.get("/booked-seats/:movieId", protect, getBookedSeats);

module.exports = router;