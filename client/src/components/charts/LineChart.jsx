import React, { useState } from "react";
// import { useManagerDataChart } from "../../hooks/useManagerDataChart";
import { useSocketForChart } from "../../hooks/useSocketForChart";
import { CustomTooltip } from "../common/CustomTooltip";
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
import { useLanguage } from "../../contexts/LanguageContext";

export const LineChartComponent = () => {
  // const { data } = useManagerDataChart();
  const { dataList } = useSocketForChart();
  const {t} = useLanguage();

  const formatLPM = (value) => `${value}-LPM`;
  const [thresholdValue, _setThresholdValue] = useState(() => {
    const sessionData = localStorage.getItem("activeMonitorSession");
    if(!sessionData) return 0;
    const parsedData = JSON.parse(sessionData);
    return Number(parsedData?.formData?.threshold ?? 0)
  });
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={dataList}>
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
        <YAxis
          width={63}
          domain={[0.0, 0.6]}
          tick={{ fontSize: 13 }}
          tickCount={6}
          tickFormatter={formatLPM}
        />

        <Tooltip // show information when hover
          content={<CustomTooltip />}
        />
        <Legend />
        <ReferenceLine
          y={thresholdValue}
          stroke="red"
          strokeDasharray="3 3"
          label={{
            position: "top",
            value: `${t("thresholdValue")}: ${thresholdValue}-LPM`,
            fill: "red",
            fontSize: 16,
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
