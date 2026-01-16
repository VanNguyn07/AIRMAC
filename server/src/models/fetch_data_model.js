const database = require("../config/database");
const fetchDataModel = {
  getAllInfoPatient: async () => {
    const client = await database.connect();
    try {
      const query = `SELECT p.id as patient_id, p.full_name, p.dob, p.age, p.gender, p.created_at as time_admitted, 
                        v.hr, v.spo2, v.bp_sys, v.rr, v.tem, 
                        r.final_status, r.selected_icd_codes, r.risk_level, r.threshold_value, 
                        a.device_code, a.room_id,
                        s.color_code
                FROM patients p 
                JOIN vitals v ON p.id = v.patient_id
                JOIN results r ON p.id = r.patient_id
                LEFT JOIN airmacs a ON p.id = a.patient_id
                LEFT JOIN setup_level_rules s ON r.total_score >= s.min_value AND r.total_score <= s.max_value
                ORDER BY p.created_at DESC`; //Sắp xếp mới nhất lên đầu
      const result = await client.query(query);
      return result.rows;
    } catch (err) {
      console.log("Error fetch all data", err);
      throw err;
    } finally {
      client.release();
    }
  },
};
module.exports = fetchDataModel;
