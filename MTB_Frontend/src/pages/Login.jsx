import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

const Login = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    loginId: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("loginId", form.loginId);
      alert("Login successful");
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-page">
      <div className="form-container">

        <h2>Welcome Back 🎬</h2>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            name="loginId"
            placeholder="Jhon@Smith"
            onChange={handleChange}
            required
            style={{ paddingRight: "30px" }}
          />

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Jhon@Smith123"
              onChange={handleChange}
              required
              style={{ width: "100%", paddingRight: "35px" }}
            />
            <span 
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "#64748b", cursor: "pointer" }}
            >
              👁️‍🗨️
            </span>
          </div>

          <button type="submit" style={{ marginTop: "0.5rem" }}>
            Login
          </button>
          
          <div className="auth-links">
            <p>Don&apos;t have an account? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/register'); }}>Register here</a></p>
            <p style={{ marginTop: "0.5rem" }}><a href="#" onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }}>Forgot Password?</a></p>
          </div>

        </form>

      </div>
    </div>
  );
};

export default Login;