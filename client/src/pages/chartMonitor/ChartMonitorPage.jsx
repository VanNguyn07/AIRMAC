import { Button } from "../../components/common/Button";
import { Label } from "../../components/common/Label";
import { LineChartComponent } from "../../components/charts/LineChart";
import { AreaChartComponent } from "../../components/charts/AreaChart";
import { PressureGauge } from "../../components/common/PressureGauge";
import { useSocketForChart } from "../../hooks/useSocketForChart";
import { useLanguage } from "../../contexts/LanguageContext";
import { useManagerForm } from "../../hooks/useManagerForm";
import { useMonitoringSession } from "../../hooks/useMonitoringSession";
import { useNavigate } from "react-router-dom";
import { useDoneSession } from "../../hooks/useDoneSession";
import { StatusIcon } from "../../components/common/StatusIcon";
import { ThresholdPopup } from "../../components/popup/ThresholdPopup";

export const ChartMonitorPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  // ✅ Lấy session từ Context
  const { monitoringSession, endMonitoringSession } = useMonitoringSession();
  
  const { handleSetStatusDone } = useDoneSession();

  const { allDevices } = useManagerForm();

  const { dataList, alertInfo, handleDismiss, currentThreshold, handleAcknowledge } = useSocketForChart();
  
  // Lấy session từ Context (monitoringSession tự động load từ localStorage nếu cần)
  const { formData = {}, deviceId } = monitoringSession || {};

  console.log("mã thiết bị được chọn: ", deviceId);

  const currentDeviceData = allDevices.find(
    (device) => device.id == deviceId,
  );

  const lastestValue = dataList[dataList.length - 1];
  const currentValue = lastestValue?.value || 0;

  const handleDone = async () => {
    // ✅ Gọi hàm từ Context để kết thúc session
    const success = await endMonitoringSession(formData.patientId, deviceId);
    
    if (success) {
      await handleSetStatusDone(formData.patientId);
      navigate("/operatingRoom");
    } else {
      alert("Lỗi khi kết thúc session. Vui lòng thử lại!");
    }
  };

  return (
    <main className="w-full min-h-screen p-4 bg-main-gradient mt-25">
      <form action="" className="box-border flex flex-col gap-4">
        {/* STATUS BAR */}
        <section className="flex justify-between items-center bg-white p-6 rounded-xl border-l-5 border-sky-600 shadow-lg">
          <div className="flex flex-col sm:flex-row gap-10">
            <div className="text-lg font-serif">
              {t("atRoomLabel")}{" "}
              <span className="font-bold font-sans">
                {currentDeviceData ? currentDeviceData.room_id : "---"}
              </span>
            </div>
            <div className="text-lg font-serif">
              {t("airmacInUse")}:{" "}
              <span className="font-bold font-sans">
                {currentDeviceData ? currentDeviceData.device_code : "---"}
              </span>
            </div>
            <div className="text-lg font-serif">
              {t("deviceStatusLabel")}{" "}
              <span className="font-bold text-yellow-500">{t("inUse")}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-10">
            <Label className="text-2xl uppercase font-serif">
              {formData.fullName || t("patientName")}
            </Label>
            <div className="text-lg font-serif">
              {t("levelLabel")}:{" "}
              <span className="font-bold font-sans">{formData.level}</span>
            </div>
            <div className="text-lg font-serif">
              <Button
                className="px-3 py-0.5 active:scale-95 bg-transparent focus:bg-transparent focus:ring-0 text-green-500 shadow-lg border-2 border-green-600 shadow-green-300 hover:bg-transparent active:bg-transparent hover:-translate-y-1 transition-all duration-300"
                type="button"
                onClick={handleDone}
              >
                {t("DONE")}
                <StatusIcon status={"DONE"} color={"#4CAF50"} />
              </Button>
            </div>
          </div>
        </section>

        <div className="flex gap-4 ">
          <div className="flex flex-col gap-4 flex-1 min-w-max">
            <section className="flex-1 bg-white rounded-xl shadow-md pt-4 pb-10 px-3 min-h-140 h-full">
              <div className="mb-2">
                <Label className="font-sans text-2xl">
                  <span className="font-serif">Flow = </span> {currentValue}{" "}
                  <span className="font-serif">LPM</span>
                </Label>
              </div>
              <LineChartComponent
                dataList={dataList}
                thresholdValue={currentThreshold}
              />
            </section>

            <section className="flex-1 bg-white rounded-xl shadow-md pt-4 pb-10 px-3 min-h-140 h-full">
              <div className="mb-2">
                <Label className="font-sans text-2xl">
                  <span className="font-serif">Area = </span> {currentValue}{" "}
                  <span className="font-serif">LPM</span>
                </Label>
              </div>
              <AreaChartComponent dataList={dataList} />
            </section>

            <section className="flex-1 bg-white rounded-xl shadow-md pt-4 pb-10 px-3 min-h-140 h-full">
              <div className="mb-2">
                <Label className="font-sans text-2xl">
                  <span className="font-serif">Flow = </span> {currentValue}{" "}
                  <span className="font-serif">LPM</span>
                </Label>
              </div>
              <LineChartComponent
                dataList={dataList}
                thresholdValue={currentThreshold}
              />
            </section>
          </div>
          <div className="flex flex-col">
            <div className="sticky top-29">
              <PressureGauge value={currentValue} />
            </div>
          </div>
        </div>
        {alertInfo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay background - màn hình phủ */}
            <div className="absolute inset-0 bg-black opacity-60 "></div>
            {/* Popup container */}
            <div className="relative z-10">
              <ThresholdPopup
                sixDataPoints={alertInfo.sixDataPoints
                  .map((dataPoint) => dataPoint.value)
                  .join(" - ")}
                timeHappened={alertInfo.timeHappened}
                onDismiss={handleDismiss}
                onAcknowledge={handleAcknowledge}
              />
            </div>
          </div>
        )}
      </form>
    </main>
  );
};
