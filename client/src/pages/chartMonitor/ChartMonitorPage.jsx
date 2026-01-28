import { Button } from "../../components/common/Button";
import { Label } from "../../components/common/Label";
import { LineChartComponent } from "../../components/charts/LineChart";
import { AreaChartComponent } from "../../components/charts/AreaChart";
import { useEffect, useState } from "react";
import { PressureGauge } from "../../components/common/PressureGauge";
import { useSocketForChart } from "../../hooks/useSocketForChart";
export const ChartMonitorPage = () => {
  // State lưu giá trị áp suất
  const [pressureValue, setPressureValue] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = Math.floor(Math.random() * 90);
      setPressureValue(newValue);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const { dataList } = useSocketForChart();
  const lastestValue = dataList[dataList.length - 1];
  const currentValue = lastestValue?.value || 0;
  console.log("Dữ liệu mới nhất:", lastestValue);
  return (
    <main className="w-full min-h-dvh p-4 bg-main-gradient">
      <form action="" className="box-border flex flex-col gap-4">
        {/* STATUS BAR */}
        <section className="flex justify-between items-center bg-white p-6 rounded-xl border-l-5 border-sky-600 shadow-lg">
          <div className="flex flex-col sm:flex-row gap-10">
            <div className="text-lg font-serif">
              At Room: <span className="font-bold font-sans">---</span>
            </div>
            <div className="text-lg font-serif">
              AIRMAC in use: <span className="font-bold font-sans">---</span>
            </div>
            <div className="text-lg font-serif">
              Device Status:{" "}
              <span className="font-bold text-yellow-500">IN USE</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-10">
            <Label className="text-xl uppercase">Patient Name</Label>
            <div className="text-lg font-serif">
              Level: <span className="font-bold font-sans">---</span>
            </div>
            <div className="text-lg font-serif">
              <Button
                variant="danger"
                className="px-4 py-1 active:scale-95 active:bg-red-700"
              >
                Stop
              </Button>
            </div>
          </div>
        </section>

        <div className="flex gap-4 ">
          <div className="flex flex-col gap-4 flex-1 min-w-max">
            <section className="flex-1 bg-white rounded-xl shadow-md pt-4 pb-10 px-3 min-h-140 h-full">
              <Label className="font-sans text-2xl">
                Flow = {currentValue} LPM
              </Label>
              <LineChartComponent />
            </section>

            <section className="flex-1 bg-white rounded-xl shadow-md p-4 min-h-140 h-full">
              <AreaChartComponent />
            </section>

            <section className="flex-1 bg-white rounded-xl shadow-md p-4 min-h-140 h-full">
              <LineChartComponent />
            </section>
          </div>
          <div className="flex flex-col">
            <div className="sticky top-4">
              <PressureGauge value={pressureValue} />
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};
