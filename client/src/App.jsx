import { Navigate, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { ClinicPage } from "./pages/clinic/ClinicPage";
import { OperatingRoomPage } from "./pages/operatingRoom/OperatingRoomPage";
import { ChartMonitorPage } from "./pages/chartMonitor/ChartMonitorPage";
import { ReportPage } from "./pages/report/ReportPage";
import { PatientProvider } from "./contexts/PatientContext";

export const App = () => {
  return (
    <div className="h-dvh w-screen flex flex-col">
      {/* Header nằm ngoài Routes để luôn hiển thị ở mọi trang */}
      <Header />
      <div className="flex-1 min-h-0">
        <PatientProvider>
          <Routes>
            {/* Mặc định vào trang chủ sẽ chuyển hướng ngay sang Clinic */}
            <Route path="/" element={<Navigate to="/clinic" replace />} />

            {/* Định nghĩa các trang */}
            <Route path="/clinic" element={<ClinicPage />} />
            <Route path="/operatingRoom" element={<OperatingRoomPage />} />
            <Route path="/chartMonitor" element={<ChartMonitorPage />} />
            <Route path="/report" element={<ReportPage />} />
          </Routes>
        </PatientProvider>
      </div>
    </div>
  );
};
