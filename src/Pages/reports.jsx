import { useEffect, useState } from "react";
import axios from "axios";
import ReportsList from "../components/report";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/HealthWallet/reports", {
        withCredentials: true,
      })
      .then((res) => setReports(res.data || []))
      .catch(() => setReports([]));
  }, []);

  return <ReportsList reports={reports} role="PATIENT" />;
}
