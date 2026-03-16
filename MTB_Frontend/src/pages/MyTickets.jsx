import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

const MyTickets = () => {

  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {

    const res = await api.get("/tickets/my-tickets");

    setTickets(res.data.tickets);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="container">

      <h2 className="page-title">🎫 My Tickets</h2>

      <div className="movie-grid">
        {tickets.map((ticket) => (

          <div key={ticket._id} className="movie-card" style={{ padding: "1.5rem" }}>

            <h3 style={{ color: "#1e293b", marginBottom: "0.5rem" }}>{ticket.movieId?.movieName || "Movie"}</h3>

            <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: "0.5rem" }}>{ticket.theatreName}</p>

            <p style={{ fontSize: "0.9rem" }}>Seats: <span style={{ fontWeight: 600 }}>{ticket.seatNumbers ? ticket.seatNumbers.join(", ") : "N/A"}</span></p>
            
            <p style={{ fontSize: "0.9rem", margin: "0.5rem 0" }}>Quantity: {ticket.numberOfTickets}</p>

            <p style={{ color: "var(--status-green)", fontWeight: 600, marginTop: "0.5rem" }}>Confirmed</p>

          </div>
        ))}
      </div>

    </div>
  );
};

export default MyTickets;