const database = require("../config/database");
const updateLevelModel = {
  setLevel: async (patientId, level, threshold, status, color) => {
    const query =
      "UPDATE results SET risk_level = $1, threshold_value = $2, final_status = $3, color_code = $4 WHERE patient_id = $5";
    try {
      const result = await database.query(query, [level, threshold, status, color, patientId]);
        return result;
    } catch (err) {
      console.error("Update level error", err);
      throw err;
    }
  },
};
module.exports = updateLevelModel;
