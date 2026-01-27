const database = require("../config/database");
const fetchDataModel = {
  getAllInfoPatient: async () => {
    const client = await database.connect();
    try {
      const query = `SELECT DISTINCT ON (p.id) p.id as patient_id, p.full_name, p.dob, p.age, p.gender, p.created_at as time_admitted, 
                        v.hr, v.spo2, v.bp_sys, v.rr, v.tem, 
                        r.final_status, r.selected_icd_codes, r.risk_level, r.threshold_value, r.process_status, r.color_code,
                        a.device_code, a.room_id, a.device_status
                        
                FROM patients p 
                JOIN vitals v ON p.id = v.patient_id
                JOIN results r ON p.id = r.patient_id
                LEFT JOIN airmacs a ON p.id = a.patient_id
              
                ORDER BY p.id, p.created_at DESC`; //Sắp xếp mới nhất lên đầu
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
