export default function SummaryCards({ vitals = [] }) {
  const getVitalValue = (type) => {
    const v = vitals.find((v) => v.vitalType === type);
    return v ? v.vitalValue : "--";
  };

  return (
    <div className="summary-cards">
      <div className="card">
        <strong>BP</strong>
        <p>{getVitalValue("BP")}</p>
      </div>

      <div className="card">
        <strong>Sugar</strong>
        <p>{getVitalValue("SUGAR")}</p>
      </div>

      <div className="card">
        <strong>Heart Rate</strong>
        <p>{getVitalValue("HEART_RATE")}</p>
      </div>
    </div>
  );
}
