import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

const AdminDashboard = () => {

  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({
    movieName: "",
    theatreName: "",
    totalTickets: ""
  });

  const fetchMovies = async () => {
    try {
      const res = await api.get("/movies");
      setMovies(res.data.movies || []);
    } catch(err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    try {
      await api.post("/movies", form);
      alert("Movie added successfully");
      setForm({ movieName: "", theatreName: "", totalTickets: "" });
      fetchMovies();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add movie");
    }
  };

  const handleDeleteMovie = async (id) => {
    if(!window.confirm("Are you sure you want to delete this movie?")) return;
    try {
      await api.delete(`/movies/delete/${id}`);
      alert("Movie deleted");
      fetchMovies();
    } catch (err) {
      alert("Failed to delete movie");
    }
  };

  const handleUpdateStatus = async (movieId, movieName, newStatus) => {
    try {
        // We now pass the movieId as the "ticket" parameter to be flexible
        await api.put(`/tickets/${movieName}/update/${movieId}`, { status: newStatus });
        alert(`Status updated to ${newStatus} successfully`);
        fetchMovies();
    } catch(err) {
        alert('Failed to update status: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container">
      <div className="book-ticket-header">
         <h2 style={{ fontSize: "2rem" }}>🎬 Admin Dashboard</h2>
         <p className="admin-subtitle">Manage movies, ticket availability & status</p>
      </div>

      <div className="book-ticket-container" style={{ maxWidth: "800px", marginTop: "1rem" }}>
        <h3 className="admin-card-header">Add New Movie</h3>
        <form onSubmit={handleAddMovie} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", width: "100%" }}>
             <input className="admin-input" name="movieName" placeholder="Movie Name" value={form.movieName} onChange={handleChange} required />
             <input className="admin-input" name="theatreName" placeholder="Theatre Name" value={form.theatreName} onChange={handleChange} required />
             <input className="admin-input" name="totalTickets" type="number" placeholder="Total Tickets" value={form.totalTickets} onChange={handleChange} required />
          </div>
          <button type="submit" className="confirm-booking-btn" style={{ maxWidth: "100%", height: "55px" }}>Add Movie</button>
        </form>
      </div>

      <div className="movie-grid" style={{ marginTop: "3rem" }}>
        {movies.map(movie => (
          <div key={movie._id} className="movie-card" style={{ padding: "1.5rem" }}>
            <h3 style={{ color: "#1e293b", marginBottom: "0.2rem" }}>{movie.movieName}</h3>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: "1rem" }}>{movie.theatreName}</p>
            
            <div className="admin-stats">
              <p>Booked Tickets: <b>{movie.totalTickets - movie.availableTickets}</b></p>
              <p>Available: <b>{movie.availableTickets}</b></p>
              <p>Status: <span className={movie.status === 'SOLD_OUT' ? 'status-soldout' : 'status-available'} style={{ fontWeight: 700 }}>{movie.status}</span></p>
            </div>

            <button 
              className="admin-action-btn" 
              style={{ backgroundColor: "var(--btn-cyan)", color: "white", width: "100%", marginBottom: "0.5rem" }}
              onClick={() => handleUpdateStatus(movie._id, movie.movieName, 'BOOK_ASAP')}
            >
              Mark Book ASAP
            </button>

            <div style={{ display: "flex", gap: "0.5rem", width: "100%" }}>
              <button 
                className="admin-action-btn" 
                style={{ backgroundColor: "#ef4444", color: "white" }}
                onClick={() => handleUpdateStatus(movie._id, movie.movieName, 'SOLD_OUT')}
              >
                Mark Sold Out
              </button>
              <button 
                className="admin-action-btn" 
                style={{ backgroundColor: "#ef4444", color: "white" }}
                onClick={() => { fetchMovies(); alert("Dashboard Refreshed!"); }}
              >
                Refresh Availability
              </button>
            </div>

            <button className="delete-link-btn" onClick={() => handleDeleteMovie(movie._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
