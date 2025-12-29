import { useState } from "react";
import axios from "axios";
import "../Styles/upload.css";

export default function UploadReport() {
  const [form, setForm] = useState({
    reportName: "",
    reportType: "",
    date: "",
    notes: "",
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.reportType) {
      alert("Please select Report Type");
      return;
    }

    if (!file) {
      alert("Please choose a file");
      return;
    }

    const formData = new FormData();
    formData.append("reportName", form.reportName);
    formData.append("fileType", form.reportType);
    formData.append("date", form.date);
    formData.append("notes", form.notes);
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:8080/HealthWallet/uploadReport",
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        alert("Report uploaded successfully");
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <form className="upload-card" onSubmit={handleSubmit}>
      <h2>Upload Medical Report</h2>
      <select name="reportName" value={form.reportName} onChange={handleChange}>
        <option value="">Select Report Name</option>
        <option value="Blood Test">Blood Test</option>
        <option value="Blood Pressure">Blood Pressure</option>
        <option value="Sugar">Sugar</option>
        <option value="ECG">ECG</option>
        <option value="X-Ray">X-Ray</option>
        <option value="Scan">Scan</option>
      </select>

      <select
        name="reportType"
        value={form.reportType}
        onChange={handleChange}
        required
      >
        <option value="">Select Report Type *</option>
        <option value="PDF">PDF</option>
        <option value="IMAGE">IMAGE</option>
      </select>

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        required
      />

      <textarea
        name="notes"
        placeholder="Notes (optional)"
        value={form.notes}
        onChange={handleChange}
      />

      <button type="submit">Upload Report</button>
    </form>
  );
}
