import { useState } from "react";
import "../Styles/reportCards.css";

export default function ReportsList({ reports = [], role }) {
  console.log("🚨 ReportsList received:", reports);

  const [search, setSearch] = useState("");

  const filteredReports = reports.filter(
    (r) =>
      r.reportName?.toLowerCase().includes(search.toLowerCase()) ||
      String(r.uploaded).toLowerCase().includes(search.toLowerCase())
  );

  const handleShare = async (reportId) => {
    try {
      await fetch("http://localhost:8080/HealthWallet/shareReport", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          reportId: reportId,
          sharedId: 10, // doctor / family userId
          accessType: "READ_ONLY",
        }),
      });

      alert("Report shared successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to share report");
    }
  };

  return (
    <div className="reports-section">
      <h3>Medical Reports</h3>

      <input
        type="text"
        placeholder="Search by type or date"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="report-search"
      />

      <div className="report-header">
        <span>Report Name</span>
        <span>Type</span>
        <span>Date</span>
        <span>File</span>
        <span>Action</span>
      </div>

      {filteredReports.length === 0 && (
        <p className="empty-text">No medical reports found</p>
      )}

      {filteredReports.map((report) => (
        <div className="report-row" key={report.reportId}>
          <span>{report.reportName}</span>
          <span>{report.fileType}</span>
          <span>{report.uploaded}</span>
          <span>{report.fileURL}</span>

          <span className="actions">
            <a
              href={`http://localhost:8080/HealthWallet/uploads/${report.fileURL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="view-btn"
            >
              View
            </a>

            <a
              href={`http://localhost:8080/HealthWallet/uploads/${report.fileURL}`}
              download
              className="download-btn"
            >
              Download
            </a>

            {/* ✅ ONLY CHANGE IS HERE */}
            {role === "PATIENT" && (
              <button
                className="share-btn"
                onClick={() => handleShare(report.reportId)}
              >
                Share
              </button>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
