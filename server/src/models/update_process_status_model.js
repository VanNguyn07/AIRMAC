const database = require("../config/database");

const updateProcessStatusModel = {
    setProcessStatus: async (patientId, processStatus) => {
        const query = "UPDATE results SET process_status = $1 WHERE patient_id = $2 RETURNING patient_id, process_status";
        try {
            const result = await database.query(query, [processStatus, patientId]);
            return result.rows[0]; // trả về dạng đối tượng { patient_id: 5, process_status: "processing" }
        }catch(err) {
            console.error("Update process status error: ", err);
            throw err
        }
    }
}

module.exports = updateProcessStatusModel;