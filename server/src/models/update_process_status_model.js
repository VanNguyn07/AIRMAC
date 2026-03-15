const database = require("../config/database");

const updateProcessStatusModel = {
    setProcessStatus: async (patientId, processStatus, deviceId = null) => {
        let query;
        let params;

        console.log("Model - patientId:", patientId, "processStatus:", processStatus, "deviceId:", deviceId);

        if (deviceId) {
            // Khi có deviceId, lưu cả device_id và set monitoring_started_at
            query = "UPDATE results SET process_status = $1, device_id = $2, monitoring_started_at = CURRENT_TIMESTAMP WHERE patient_id = $3 RETURNING patient_id, process_status, device_id";
            params = [processStatus, deviceId, patientId];
        } else {
            // Khi không có deviceId, chỉ update process_status
            query = "UPDATE results SET process_status = $1 WHERE patient_id = $2 RETURNING patient_id, process_status, device_id";
            params = [processStatus, patientId];
        }
        
        try {
            const result = await database.query(query, params);
            console.log("Model - Query result:", result.rows[0]); // Debug log
            return result.rows[0]; // trả về dạng đối tượng { patient_id: 5, process_status: "IN_PROGRESS", device_id: 1 }
        } catch(err) {
            console.error("Update process status error: ", err);
            throw err
        }
    }
}

module.exports = updateProcessStatusModel;