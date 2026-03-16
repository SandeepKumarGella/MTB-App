require('dotenv').config();
const mongoose = require('mongoose');
const Movie = require('./src/models/Movie');

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/moviebooking'; // Fallback if env not loaded

const mockMovies = [
  { movieName: "Avatar 3", theatreName: "PVR Cinemas", totalTickets: 150, availableTickets: 150 },
  { movieName: "Leo", theatreName: "Cinepolis", totalTickets: 200, availableTickets: 120 },
  { movieName: "Inception Re-release", theatreName: "Inox", totalTickets: 100, availableTickets: 78 },
  { movieName: "Dune: Part Two", theatreName: "PVR Cinemas", totalTickets: 180, availableTickets: 146 },
  { movieName: "Barbie", theatreName: "PVR Cinemas", totalTickets: 120, availableTickets: 0, status: "SOLD_OUT" },
  { movieName: "Don 3", theatreName: "Inox", totalTickets: 200, availableTickets: 4, status: "BOOK_ASAP" },
  { movieName: "Oppenheimer", theatreName: "Cinepolis", totalTickets: 250, availableTickets: 250 },
  { movieName: "Spider-Man: Beyond the Spider-Verse", theatreName: "PVR Director's Cut", totalTickets: 90, availableTickets: 45, status: "BOOK_ASAP" },
  { movieName: "Gladiator 2", theatreName: "Inox", totalTickets: 300, availableTickets: 300 },
  { movieName: "Mission: Impossible - Dead Reckoning Part Two", theatreName: "PVR Cinemas", totalTickets: 160, availableTickets: 80, status: "BOOK_ASAP" },
  { movieName: "Deadpool 3", theatreName: "Cinepolis", totalTickets: 220, availableTickets: 218 },
  { movieName: "The Batman Part II", theatreName: "Inox", totalTickets: 140, availableTickets: 140 },
  { movieName: "Captain America: Brave New World", theatreName: "PVR Cinemas", totalTickets: 180, availableTickets: 90 },
  { movieName: "Inside Out 2", theatreName: "Cinepolis", totalTickets: 100, availableTickets: 0, status: "SOLD_OUT" },
  { movieName: "Furiosa", theatreName: "Inox", totalTickets: 150, availableTickets: 150 },
  { movieName: "Godzilla x Kong: The New Empire", theatreName: "PVR Cinemas", totalTickets: 200, availableTickets: 200 },
  { movieName: "Kung Fu Panda 4", theatreName: "Cinepolis", totalTickets: 110, availableTickets: 11 },
  { movieName: "Despicable Me 4", theatreName: "Inox", totalTickets: 130, availableTickets: 100 },
  { movieName: "A Quiet Place: Day One", theatreName: "PVR Cinemas", totalTickets: 90, availableTickets: 90 },
  { movieName: "Ghostbusters: Frozen Empire", theatreName: "Cinepolis", totalTickets: 120, availableTickets: 120 }
];

const seedMovies = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to database for seeding...");
    
    await Movie.deleteMany({}); // Optional: clear existing movies to avoid duplicates if run multiple times
    console.log("Cleared existing movies.");

    await Movie.insertMany(mockMovies);
    console.log("Successfully seeded 20 movies!");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding movies:", error);
    process.exit(1);
  }
};

seedMovies();
