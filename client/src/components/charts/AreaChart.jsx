import React from "react";
import { useSocketForChart } from "../../hooks/useSocketForChart";
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
import { CustomTooltip } from "../common/CustomTooltip";

export const AreaChartComponent = () => {
  const {dataList} = useSocketForChart();
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={dataList}>
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
        />

        <YAxis
          domain={[0, 0.6]}
          unit="-LPM"
          tick={{ fontSize: 14 }}
          tickCount={6}
        />

        <Tooltip
          content={<CustomTooltip />}
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
