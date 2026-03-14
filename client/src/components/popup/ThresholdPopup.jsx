import { AlertTriangle, X } from "lucide-react";
import Lottie from "lottie-react";
import alarmAnimation from "../../assets/alarm.json";

export const ThresholdPopup = () => {
  return (
    <div className="relative w-90 bg-red-50 border-2 border-red-600 rounded-2xl shadow-2xl p-5 flex flex-col items-center gap-4">
      {/* Glow background */}
      <div className="absolute inset-0 rounded-2xl bg-red-400 opacity-10 animate-pulse"></div>

      {/* Alarm Animation */}
      <div className="relative animate-[heartbeat_0.9s_infinite] ">
        <Lottie
          animationData={alarmAnimation}
          loop
          autoplay
          style={{ width: 130, height: 130 }}
        />
      </div>

      {/* Title */}
      <div className="text-center ">
        <p className="text-3xl font-bold text-red-700 tracking-wide">
          AIRMAC ALERT
        </p>
        <p className="text-sm text-red-500">
          System detected abnormal airflow
        </p>
      </div>

      {/* Warning message */}
      <div className="flex items-center gap-3 w-full bg-red-100 border-l-[6px] border-red-600 rounded-xl p-3 shadow-sm">
        <AlertTriangle size={36} className="text-red-600 shrink-0" />

        <p className="text-sm text-gray-700 leading-relaxed">
          <span className="font-bold text-red-600">LPM Threshold exceeded</span>{" "}
          for <span className="font-semibold">6 consecutive readings</span>.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 w-full">
        <button
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold hover:cursor-pointer active:scale-95 hover:-translate-y-1 transition-all duration-300 z-10"
          type="button"
        >
          Acknowledge
        </button>

        <button
          className="flex-1 border border-gray-400 hover:bg-gray-400 py-2 rounded-lg font-semibold flex items-center justify-center gap-1 hover:cursor-pointer active:scale-95 hover:-translate-y-1 transition-all duration-300 z-10"
          type="button"
        >
          <X size={18} />
          Dismiss
        </button>
      </div>
    </div>
  );
};
