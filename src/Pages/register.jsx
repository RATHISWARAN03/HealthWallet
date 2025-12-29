import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/forms.css";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/HealthWallet/registerServlet",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);

      if (response.data.success) {
        navigate("/login");
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Server error");
    }
  };

  return (
    <motion.div
      className="form-container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2>Create Account</h2>
      <p className="form-subtitle">
        Start managing your health records securely
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          value={formData.phone}
          onChange={handleChange}
        />

        <select
          name="role"
          required
          value={formData.role}
          onChange={handleChange}
        >
          <option value="">Select Role</option>
          <option value="PATIENT">PATIENT</option>
          <option value="DOCTOR">DOCTOR</option>
          <option value="FAMILY">FAMILY</option>
          <option value="FRIEND">FRIEND</option>
        </select>

        <button type="submit" className="primary-btn">
          Register
        </button>
        <button
          type="button"
          className="primary-btn"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </form>
    </motion.div>
  );
}
