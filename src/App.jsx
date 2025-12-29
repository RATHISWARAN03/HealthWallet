import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout";

import Login from "./Pages/login";
import Register from "./Pages/register";
import Dashboard from "./Pages/dashboard";
import Reports from "./Pages/reports";
import UploadReport from "./Pages/uploadedReports";

import "./Styles/Styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/upload" element={<UploadReport />} />
        </Route>

        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
    </BrowserRouter>
  );
}
