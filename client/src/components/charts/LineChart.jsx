import React from "react";
import { useManagerDataChart } from "../../hooks/useManagerDataChart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
export const LineChartComponent = () => {
  const { data } = useManagerDataChart();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <defs>
          <linearGradient id="colorSpo2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" opacity={0.4} vertical={false} />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 11 }}
          interval="preserveStartEnd"
        />
        <YAxis domain={[0, 1]} unit=" LPM" tick={{fontSize:15}} tickCount={6}/>

        <Tooltip // show information when hover
          contentStyle={{
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />
        <Legend />
        <ReferenceLine
          y={0.4}
          stroke="red"
          strokeDasharray="3 3"
          label={{
            position: "top",
            value: "Threshold",
            fill: "red",
            fontSize: 13,
          }}
        />
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="value"
          stroke="#059669"
          strokeWidth={3} // Đường nét
          dot={false}
          activeDot={{ r: 6 }} // Chỉ hiện chấm khi rê chuột vào
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
