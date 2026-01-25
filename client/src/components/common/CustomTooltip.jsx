// Component hiển thị nội dung Tooltip tùy chỉnh
export const CustomTooltip = ({ active, payload, label }) => {
  // active: Có đang hover không?
  // payload: Mảng dữ liệu tại điểm đó (chứa value)
  // label: Giá trị trục X (chính là time)

  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <p style={{ margin: 0, color: "#059669", fontWeight: "600" }}>
          Time: {label}s - Value: {payload[0].value} LPM
        </p>
      </div>
    );
  }

  return null;
};