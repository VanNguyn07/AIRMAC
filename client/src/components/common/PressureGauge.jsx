import { useMemo } from "react";
import { Label } from "./Label";
// Đưa component này ra ngoài hoặc để vào file riêng (PressureGauge.jsx)
export const PressureGauge = ({ value = 0, max = 100 }) => {
  // Xử lý NaN: Nếu value không phải số, gán bằng 0
  const safeValue = Number.isFinite(value) ? value : 0;

  //chiều cao (giới hạn 0 - 100%)
  const percentage = Math.min(Math.max((safeValue / max) * 100, 0), 100);

  const getColor = (percent) => {
    if (percent > 80) return "#ef4444"; // Đỏ
    if (percent > 60) return "#f59e0b"; // Cam
    return "#22c55e"; // Xanh
  };

  const currentColor = getColor((safeValue / max) * 100);

  // 4. Tạo vạch chia
  const ticks = useMemo(() => {
    const tickCount = 5;
    const tickArray = [];
    for (let i = 0; i <= tickCount; i++) {
      const val = i * (max / tickCount);
      tickArray.push({
        val: Math.round(val),
        pos: (i / tickCount) * 100,
      });
    }
    return tickArray;
  }, [max]);

  return (
    <div className="flex flex-col items-center h-140 w-30 bg-white p-2 rounded-xl shadow-lg border border-gray-100">
      <Label className="mb-3 font-serif text-2xl">mmHg</Label>

      <div className="flex-1 w-full relative flex justify-center">
        {/* --- CỘT CHỨA --- */}
        <div className="h-full w-10 bg-gray-200 rounded-2xl relative overflow-hidden border border-gray-300">
          {/* --- DUNG DỊCH (Thay đổi chiều cao ở đây) --- */}
          <div
            style={{
              height: `${percentage}%`,
              backgroundColor: currentColor,
              transition: "height 0.5s ease-out, background-color 0.5s",
            }}
            className="w-full absolute bottom-0 left-0 transition-all"
          ></div>
        </div>

        {/* --- VẠCH CHIA (TICKS) BÊN CẠNH --- */}
        <div className="absolute top-0 left-[60%] h-full w-full">
          {ticks.map((t) => (
            <div
              key={t.val}
              className="absolute w-full flex items-center"
              style={{ bottom: `${t.pos}%`, transform: "translateY(50%)" }}
            >
              <div className="w-2 h-px bg-gray-400"></div>
              <span className="text-sm text-gray-500 ml-1 font-mono">
                {t.val}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SỐ ĐIỆN TỬ */}
      <div
        className="mt-2 text-xl font-bold font-sans"
        style={{ color: currentColor }}
      >
        {Math.round(safeValue)} <span className="font-serif">mmHg</span>
      </div>
    </div>
  );
};
