import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

const ChangePassword = () => {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/change-password", form);
      alert("Password changed successfully");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Password change failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="form-container">
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
