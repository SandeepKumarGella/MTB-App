import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const loginId = localStorage.getItem("loginId");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("loginId");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      
      <div className="nav-brand">
        <span className="nav-logo-icon"></span>
        MovieBookingApp
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        {!token && <Link to="/register">Register</Link>}
        {!token && <Link to="/login">Login</Link>}
        {token && role === "USER" && <Link to="/my-tickets">My Tickets</Link>}
        {token && role === "ADMIN" && <Link to="/admin-dashboard">Admin</Link>}
        {token && <Link to="/change-password">Change Password</Link>}
        {token && loginId && (
          <span style={{ color: "#fbbf24", fontWeight: 600, fontSize: "0.95rem" }}>
            Hi, {loginId}
          </span>
        )}
        {token && (
          <a
            href="#" 
            onClick={(e) => { e.preventDefault(); logout(); }}
            style={{ 
              backgroundColor: "#ef4444", 
              padding: "0.4rem 1rem", 
              borderRadius: "4px", 
              textDecoration: "none",
              fontWeight: 600
            }}
          >
            Logout
          </a>
        )}
      </div>

    </nav>
  );
};

export default Navbar;