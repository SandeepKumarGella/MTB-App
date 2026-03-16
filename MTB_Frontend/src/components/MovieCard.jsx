import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {

  const navigate = useNavigate();

  const bookTicket = () => {
    navigate(`/book/${movie._id}`);
  };

  const getStatusClass = () => {
      if (movie.status === "SOLD_OUT") return "status-soldout";
      if (movie.status === "BOOK_ASAP") return "status-bookasap";
      return "status-available";
  };

  const getStatusText = () => {
      if (movie.status === "SOLD_OUT") return "SOLD OUT";
      if (movie.status === "BOOK_ASAP") return "BOOK ASAP";
      return "Available";
  };

  return (
    <div className="movie-card">

      <h3>{movie.movieName}</h3>

      <p>{movie.theatreName}</p>

      <p className="movie-available">✔ Available: {movie.availableTickets}</p>

      <p className={`movie-status ${getStatusClass()}`}>
        Status: <span style={{ fontWeight: 700 }}>{getStatusText()}</span>
      </p>

      <button
        className={movie.status === "SOLD_OUT" ? "book-btn sold-out" : "book-btn"}
        disabled={movie.status === "SOLD_OUT"}
        onClick={bookTicket}
      >
        {movie.status === "SOLD_OUT" ? "Sold Out" : "Book Now"}
      </button>

    </div>
  );
};

export default MovieCard;