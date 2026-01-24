import { Button } from "../../components/common/Button";
import { Label } from "../../components/common/Label";
import { LineChartComponent } from "../../components/charts/LineChart";
import { AreaChartComponent } from "../../components/charts/AreaChart";
export const ChartMonitorPage = () => {
  return (
    <main className="w-full h-dvh p-4 bg-main-gradient">
      <form action="" className="box-border flex flex-col gap-4 w-full h-full">
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

        <div className="flex justify-around flex-col lg:flex-row gap-4 flex-1 min-w-max">
          <section className="flex-1 bg-white rounded-xl shadow-md p-4 min-h-120 h-full">
            <LineChartComponent />
          </section>

          <section className="flex-1 bg-white rounded-xl shadow-md p-4 min-h-120 h-full">
            <AreaChartComponent />
          </section>

          <section className="flex-1 bg-white rounded-xl shadow-md p-4 min-h-120 h-full">
            <LineChartComponent />
          </section>
        </div>
      </form>
    </main>
  );
};
