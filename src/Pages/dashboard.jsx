import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "../Styles/dashboard.css";

import VitalsChart from "../components/vitalChart";
import SummaryCards from "../components/Summerycard";
import ReportsList from "../components/report";

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [vitals, setVitals] = useState([]);
  const [reports, setReports] = useState([]);

  const [selectedVital, setSelectedVital] = useState("ALL");
  const [range, setRange] = useState("30");

  // 🔐 Auth check
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
    } else {
      const u = JSON.parse(storedUser);
      setUser(u);

      // ✅ Fetch vitals
      axios
        .get(`http://localhost:8080/HealthWallet/vitals?userId=${u.userId}`, {
          withCredentials: true,
        })

        .then((res) => setVitals(res.data || []))
        .catch(() => setVitals([]));

      // ✅ Fetch reports
      axios
        .get(`http://localhost:8080/HealthWallet/reports?userId=${u.userId}`, {
          withCredentials: true,
        })

        .then((res) => setReports(res.data || []))
        .catch(() => setReports([]));
    }
  }, [navigate]);

  // 🔎 Filter vitals for chart
  const filteredVitals =
    selectedVital === "ALL"
      ? vitals
      : vitals.filter((v) => v.vitalType === selectedVital);
  console.log("📦 Dashboard reports:", reports);

  return (
    <motion.div
      className="dashboard"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* HEADER */}
      <motion.div
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="welcome">
          <h2>
            Welcome, <span className="username">{user?.name}</span>
          </h2>
          <p className="last-updated">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>

        <div className="quick-actions">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/upload")}
            className="primary-action"
          >
            ➕ Upload Report
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/reports")}
            className="secondary-action"
          >
            📄 View Reports
          </motion.button>
        </div>
      </motion.div>

      {/* SUMMARY */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <SummaryCards vitals={vitals} />
      </motion.div>

      {/* FILTERS */}
      <motion.div
        className="vitals-controls"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <select
          value={selectedVital}
          onChange={(e) => setSelectedVital(e.target.value)}
        >
          <option value="ALL">All Vitals</option>
          <option value="BP">Blood Pressure</option>
          <option value="SUGAR">Sugar</option>
          <option value="HEART_RATE">Heart Rate</option>
        </select>

        <select value={range} onChange={(e) => setRange(e.target.value)}>
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
          <option value="180">Last 6 Months</option>
        </select>
      </motion.div>

      {/* CHART */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <VitalsChart vitals={filteredVitals} range={range} />
      </motion.div>

      {/* REPORTS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <ReportsList reports={reports} role={user?.role} />
      </motion.div>
    </motion.div>
  );
}
