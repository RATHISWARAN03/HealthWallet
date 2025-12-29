import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function VitalsChart({ vitals = [] }) {
  if (!vitals.length) {
    return <p style={{ padding: "20px" }}>No vitals data available</p>;
  }

  const labels = vitals.map((v) =>
    new Date(v.recordedDate).toLocaleDateString()
  );

  const values = vitals.map((v) => {
    if (v.vitalType === "BP") {
      return parseInt(v.vitalValue.split("/")[0]); // systolic
    }
    return parseInt(v.vitalValue);
  });

  /* 🎨 HEALTH-TECH COLOR */
  const lineColor = "#4f46e5"; // Indigo
  const fillColor = "rgba(79,70,229,0.15)";

  const data = {
    labels,
    datasets: [
      {
        label: "Vitals Trend",
        data: values,

        /* 🔥 VISUAL IMPROVEMENTS */
        borderColor: lineColor,
        backgroundColor: fillColor,
        fill: true,

        borderWidth: 3,
        tension: 0.4,

        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: lineColor,
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#334155",
          font: { size: 13 },
        },
      },
      tooltip: {
        backgroundColor: "#0f172a",
        titleColor: "#ffffff",
        bodyColor: "#e5e7eb",
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#64748b",
        },
      },
      y: {
        grid: {
          color: "#e5e7eb",
        },
        ticks: {
          color: "#64748b",
        },
      },
    },
  };

  return (
    <div className="card chart-container">
      <h3>Vitals Trends</h3>
      <div style={{ height: "320px" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
