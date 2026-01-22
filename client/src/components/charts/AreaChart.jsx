import React from "react";
import { useManagerDataChart } from "../../hooks/useManagerDataChart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

export const AreaChartComponent = () => {
  const { data } = useManagerDataChart();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          
          <linearGradient id="colorLpm" x1="0" y1="0" x2="0" y2="1">
            
            <stop offset="5%" stopColor="#059669" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#059669" stopOpacity={0} />
          </linearGradient>
        </defs>
        
        <CartesianGrid strokeDasharray="3 3" opacity={0.4} vertical={false} />
        
        <XAxis
          dataKey="time"
          tick={{ fontSize: 11 }}
          interval="preserveStartEnd"
          // Mẹo: Nếu trục X chữ bị đè nhau, thêm dòng này để ẩn bớt
          tickFormatter={(val, index) => index % 10 === 0 ? val : ""} 
        />
        
        <YAxis
          domain={[0, 1]}
          unit=" LPM"
          tick={{ fontSize: 12 }} 
          tickCount={6}
        />

        <Tooltip
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

        <Area
          isAnimationActive={false}
          type="monotone"
          dataKey="value"
          stroke="#059669"
          strokeWidth={3}
          dot={false}
          fillOpacity={1}
          // ID ở đây phải trùng với ID trong <defs>
          fill="url(#colorLpm)" 
          activeDot={{ r: 6 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};