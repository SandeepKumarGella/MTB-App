import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

const ForgotPassword = () => {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    loginId: "",
    email: "",
    newPassword: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/forgot", form);
      alert("Password reset successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="form-container">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="loginId"
            placeholder="Login ID (Optional)"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email (Optional)"
            onChange={handleChange}
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
