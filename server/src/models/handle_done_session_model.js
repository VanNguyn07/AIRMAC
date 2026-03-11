const database = require("../config/database");

const handleDoneSessionModel = {
  setStatusDone: async (patientId, process_status) => {
    const query =
      "UPDATE results SET process_status = $1 WHERE patient_id = $2 RETURNING patient_id, process_status";
    try {
      const result = database.query(query, [process_status, patientId]);
      return (await result).rows[0];
    } catch (err) {
      console.error("Set status Done error at model: ", err);
      throw err;
    }
  },
};

module.exports = handleDoneSessionModel;
