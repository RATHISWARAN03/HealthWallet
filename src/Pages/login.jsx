import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/forms.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/HealthWallet/api/loginServlet",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("Backend response:", response.data);

      if (response.data.success === true) {
        // ✅ STORE USER DATA (VERY IMPORTANT)
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // ✅ REDIRECT
        navigate("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="form-container"
    >
      <h2>Welcome Back</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="primary-btn">
          Login
        </button>
      </form>
    </motion.div>
  );
}
