import { usePatientContext } from "../contexts/PatientContext";
import { handleDoneSession } from "../services/handle_done_session_api";

export const useDoneSession = () => {
  const { handleUpdateListGlobal } = usePatientContext();
  const handleSetStatusDone = async (patientId) => {
    if (!patientId) return;
    try {
      const result = await handleDoneSession.setStatusDone(
        patientId,
        "DONE",
      );
      console.log("Kết quả từ Server trả về là:", result);
      if (result.success) {
        handleUpdateListGlobal({
          patient_id: patientId,
          process_status: "DONE",
        });
      }
    } catch (err) {
      console.log("Error when set up API Done Session: ", err);
      alert("Đã xảy ra lỗi kết nối với máy chủ tại API của set status done");
    }
  };
  return {
    handleSetStatusDone
  }
};
