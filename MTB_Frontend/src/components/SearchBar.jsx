const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <button className="search-btn">Search</button>
      </div>
    </div>
  );
};

export default SearchBar;