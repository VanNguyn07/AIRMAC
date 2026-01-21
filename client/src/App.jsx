import { Navigate, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { ClinicPage } from "./pages/clinic/ClinicPage";
import { OperatingRoomPage } from "./pages/operatingRoom/OperatingRoomPage";
import { PatientProvider } from "./contexts/PatientContext";

export const App = () => {
  return (
    <div className="h-dvh w-screen flex flex-col overflow-hidden">
      {/* Header nằm ngoài Routes để luôn hiển thị ở mọi trang */}
      <Header />
      <div className="flex-1 min-h-0 overflow-hidden">
        <PatientProvider>
          <Routes>
            {/* Mặc định vào trang chủ sẽ chuyển hướng ngay sang Clinic */}
            <Route path="/" element={<Navigate to="/clinic" replace />} />

            {/* Định nghĩa các trang */}
            <Route path="/clinic" element={<ClinicPage />} />
            <Route path="/operatingRoom" element={<OperatingRoomPage />} />
          </Routes>
        </PatientProvider>
      </div>
    </div>
  );
};
