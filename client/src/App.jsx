import { Navigate, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { ClinicPage } from "./pages/clinic/ClinicPage";
import { OperatingRoomPage } from "./pages/operatingRoom/OperatingRoomPage";
import { PatientProvider } from "./contexts/PatientContext";

export const App = () => {
  return (
    <>
      {/* Header nằm ngoài Routes để luôn hiển thị ở mọi trang */}
      <Header />
      <PatientProvider>
        <Routes>
          {/* Mặc định vào trang chủ sẽ chuyển hướng ngay sang Clinic */}
          <Route path="/" element={<Navigate to="/clinic" replace />} />

          {/* Định nghĩa các trang */}
          <Route path="/clinic" element={<ClinicPage />} />
          <Route path="/operatingRoom" element={<OperatingRoomPage />} />
        </Routes>
      </PatientProvider>
    </>
  );
};
