import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

const BookTicket = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [tickets, setTickets] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]); 

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await api.get("/movies");
        const found = res.data.movies.find(m => m._id === id);
        if (found) setMovie(found);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchBookedSeats = async () => {
        try {
          const res = await api.get(`/tickets/booked-seats/${id}`);
          setBookedSeats(res.data.bookedSeats || []);
        } catch (err) {
          console.error("Error fetching booked seats", err);
        }
    };

    fetchMovieDetails();
    fetchBookedSeats();
  }, [id]);

  const rows = ['A', 'B', 'C', 'D', 'E'];
  const cols = Array.from({ length: 20 }, (_, i) => i + 1);

  const handleSeatClick = (seatId) => {
    if (bookedSeats.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const bookTicket = async () => {
    const ticketCount = parseInt(tickets, 10);

    // Only strictly validate if tickets count was typed and doesn't match selected seats,
    // or if they didn't do either properly.
    const finalCount = ticketCount || selectedSeats.length;

    if (finalCount <= 0 || selectedSeats.length === 0) {
      alert("Please enter number of tickets and select your seats");
      return;
    }

    if (ticketCount && ticketCount !== selectedSeats.length) {
      alert(`You selected ${selectedSeats.length} seats but requested ${ticketCount} tickets. Please match them.`);
      return;
    }

    try {
      await api.post(`/tickets/book`, {
        movieId: id,
        numberOfTickets: finalCount,
        seatNumbers: selectedSeats
      });

      alert("Ticket booked successfully");
      navigate("/my-tickets");

    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="book-ticket-container">
        
        <div className="book-ticket-header">
          <h2>🖊️ Select Your Seats</h2>
          {movie && <p>{movie.movieName} &mdash; {movie.theatreName}</p>}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div style={{ width: '100%', maxWidth: '500px', textAlign: 'left', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
            No. of Tickets
          </div>
          
          <input
            type="number"
            className="ticket-count-input"
            value={tickets || selectedSeats.length || ""}
            onChange={(e) => setTickets(e.target.value)}
            placeholder=""
          />

          <div className="seat-grid">
            {rows.map(row => (
              cols.map(col => {
                const seatId = `${row}${col}`;
                const isBooked = bookedSeats.includes(seatId);
                const isSelected = selectedSeats.includes(seatId);
                
                let className = "seat";
                if (isBooked) className += " booked";
                else if (isSelected) className += " selected";

                return (
                  <div 
                    key={seatId} 
                    className={className}
                    onClick={() => handleSeatClick(seatId)}
                  >
                    {seatId}
                  </div>
                );
              })
            ))}
          </div>

          <button className="confirm-booking-btn" onClick={bookTicket}>
            Confirm Booking
          </button>
        </div>

      </div>
    </div>
  );
};

export default BookTicket;