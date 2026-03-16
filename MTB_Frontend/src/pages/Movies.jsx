import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

const Movies = () => {

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

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

  const filteredMovies = movies.filter((movie) =>
    movie.movieName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">

      <h2 className="page-title">🎬 Now Showing</h2>

      <SearchBar search={search} setSearch={setSearch} />

      <div className="movie-grid">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
        {filteredMovies.length === 0 && <p style={{textAlign:"center", width: "100%", gridColumn: "1/-1"}}>No movies found.</p>}
      </div>

    </div>
  );
};

export default Movies;