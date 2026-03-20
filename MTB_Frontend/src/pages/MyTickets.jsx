import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

const MyTickets = () => {

  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      const res = await api.get("/tickets/my-tickets");
      setTickets(res.data.tickets || []);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Your session has expired or you are not logged in. Please log in again.");
      } else {
        setError("Failed to load tickets. " + (err.response?.data?.message || err.message));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="container">

      <h2 className="page-title">🎫 My Tickets</h2>

      <div className="movie-grid">
        {loading && <p style={{ gridColumn: "1/-1", textAlign: "center" }}>Loading tickets...</p>}
        {error && <p style={{ gridColumn: "1/-1", textAlign: "center", color: "var(--status-red)" }}>{error}</p>}
        {!loading && !error && tickets.length === 0 && (
          <p style={{ gridColumn: "1/-1", textAlign: "center" }}>No tickets found. You haven't booked any movies yet!</p>
        )}
        
        {!loading && !error && tickets.map((ticket) => (

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