import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

const Register = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    loginId: "",
    password: "",
    confirmPassword: "",
    contactNumber: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const pwd = form.password;
  const isMin8 = pwd.length >= 8;
  const hasUpper = /[A-Z]/.test(pwd);
  const hasLower = /[a-z]/.test(pwd);
  const hasNum = /[0-9]/.test(pwd);
  const hasSpecial = /[@#$%^&*!]/.test(pwd);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!isMin8 || !hasUpper || !hasLower || !hasNum || !hasSpecial) {
        alert("Please fulfill all password requirements");
        return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await api.post("/auth/register", form);
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
        <div className="form-container">

        <h2>Create an Account</h2>

        <form onSubmit={handleRegister}>

            <input
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            required
            />

            <input
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            required
            />

            <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            />

            <input
            name="loginId"
            placeholder="Login ID"
            onChange={handleChange}
            required
            />

            <div style={{ position: "relative" }}>
              <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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

            <div className="password-reqs">
                <div className={isMin8 ? 'req-pass' : 'req-fail'}>- Minimum 8 characters</div>
                <div className={hasUpper ? 'req-pass' : 'req-fail'}>- Contains uppercase letter</div>
                <div className={hasLower ? 'req-pass' : 'req-fail'}>- Contains lowercase letter</div>
                <div className={hasNum ? 'req-pass' : 'req-fail'}>- Contains a number</div>
                <div className={hasSpecial ? 'req-pass' : 'req-fail'}>- Contains special character (!@#$%^&*)</div>
            </div>

            <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
            />

            <input
            name="contactNumber"
            placeholder="Contact Number"
            onChange={handleChange}
            required
            />

            <button type="submit">
            Register
            </button>

        </form>

        </div>
    </div>
  );
};

export default Register;