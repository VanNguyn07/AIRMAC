const database = require("../config/database");

const getPointsForVitals = async (client, category, value) => {
  if (value === undefined || value === null || value === "") return 0;
  const query = `SELECT points FROM scoring_rules WHERE rule_category = $1 AND $2 >= min_value AND $2 <= max_value LIMIT 1`;
  const result = await client.query(query, [category, value]);
  return result.rows[0] ? result.rows[0].points : 0; // Nếu không khớp rule nào thì trả về 0
};

const getPointsForDisease = async (client, icd_code) => {
  if (!icd_code) return 0;
  const query = `SELECT SUM(points) AS total_points FROM icd_mapping WHERE icd_code = ANY($1::text[])`;
  const result = await client.query(query, [icd_code]);
  return result.rows[0].total_points
    ? parseInt(result.rows[0].total_points)
    : 0; // Nếu không khớp rule nào thì trả về 0
};

const getPointsForAge = async (client, value) => {
  if (value === undefined || value === null || value === "") return 0;
  const query = `SELECT points FROM age_rules WHERE $1 >= min_age AND $1 <= max_age`;
  const result = await client.query(query, [value]);
  return result.rows[0] ? result.rows[0].points : 0; // Nếu không khớp rule nào thì trả về 0
};

const insertPatientInfo = async (client, patientInfo) => {
  const query =
    "INSERT INTO patients (full_name, dob, age, gender) VALUES ($1, $2, $3, $4) RETURNING id";
  //RETURNING id trả giá trị của cột id trong bảng
  const dobValue = patientInfo.dob !== "" ? patientInfo.dob : null;
  const genderValue = patientInfo.gender !== "" ? patientInfo.gender : null;
  const result = await client.query(query, [
    patientInfo.fullName,
    dobValue,
    patientInfo.age,
    genderValue,
  ]);
  return result.rows[0].id;
};

// use data
const insertVitalsInfo = async (client, vitalsInfo, patientId) => {
  const query =
    "INSERT INTO vitals (patient_id, hr, spo2, bp_sys, rr, tem) VALUES ($1, $2, $3, $4, $5, $6)";
  //RETURNING id trả giá trị của cột id trong bảng
  await client.query(query, [
    patientId,
    vitalsInfo.hr,
    vitalsInfo.spo2,
    vitalsInfo.bp_sys,
    vitalsInfo.rr,
    vitalsInfo.tem,
  ]);
};

const getValuesToSetUpLv = async (client, totalScore) => {
  if (totalScore === undefined || totalScore === null || totalScore === "")
    return 0;
  const query = `SELECT risk_level, status, threshold_value, color_code FROM setup_level_rules WHERE $1 >= min_value AND $1 < max_value LIMIT 1`;
  const result = await client.query(query, [totalScore]);
  return result.rows[0];
};

const assignAndGetDevice = async (client, patientId, selectedDevice) => {
  const query = `UPDATE airmacs SET patient_id = $1 WHERE id = $2 RETURNING device_code, room_id`;
  const result = await client.query(query, [patientId, selectedDevice]);
  return result.rows[0];
};

const insertResultsTable = async (client, value) => {
  const query = `INSERT INTO results (
        patient_id, vital_score, pathology_score, age_score, total_score, 
        final_status, selected_icd_codes, risk_level, threshold_value, color_code
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8, $9, $10)
    RETURNING id`;
  const result = await client.query(query, [
    value.patientId,
    value.vitalScore,
    value.pathologyScore,
    value.ageScore,
    value.totalScore,
    value.finalStatus,
    JSON.stringify(value.selectedIcdCodes),
    value.riskLevel,
    value.thresholdValue,
    value.color_code,
  ]);
  return result.rows[0].id;
};

const updatePatientInfo = async (client, patientInfo, patientId) => {
  const query =
    "UPDATE patients SET full_name = $1, dob = $2, age = $3, gender = $4 WHERE id = $5";
  await client.query(query, [
    patientInfo.fullName,
    patientInfo.dob,
    patientInfo.age,
    patientInfo.gender,
    patientId,
  ]);
};

const updateVitalsInfo = async (client, vitalsInfo, patientId) => {
  const query =
    "UPDATE vitals SET hr = $1, spo2 = $2, bp_sys = $3, rr = $4, tem = $5 WHERE patient_id = $6";
  await client.query(query, [
    vitalsInfo.hr,
    vitalsInfo.spo2,
    vitalsInfo.bp_sys,
    vitalsInfo.rr,
    vitalsInfo.tem,
    patientId,
  ]);
};

const updateDeviceInfo = async (client, newDeviceId, patientId) => {
  //reset old device
  await client.query(
    "UPDATE airmacs SET patient_id = NULL WHERE patient_id = $1",
    [patientId],
  );

  const query =
    "UPDATE airmacs SET patient_id = $1 WHERE id = $2 RETURNING device_code, room_id";
  const result = await client.query(query, [patientId, newDeviceId]);
  return result.rows[0];
};

const updateResultInfo = async (client, value) => {
  const query = `UPDATE results SET vital_score = $1, pathology_score = $2, age_score = $3, total_score = $4, final_status = $5, selected_icd_codes = $6::jsonb, risk_level = $7, threshold_value = $8, color_code = $9 WHERE patient_id = $10`;
  await client.query(query, [
    value.vitalScore,
    value.pathologyScore,
    value.ageScore,
    value.totalScore,
    value.finalStatus,
    JSON.stringify(value.selectedIcdCodes),
    value.riskLevel,
    value.thresholdValue,
    value.color_code,
    value.patientId,
  ]);
};

const calculateRiskScore = async (client, data) => {
  // tách lấy mã bệnh vì icdMapping đang là một mảng đối tượng
  const icdCodesOnly = data.icdMapping.map((item) => item.icd_code);
  const result = await Promise.all([
    getPointsForVitals(client, "hr", data.hr),
    getPointsForVitals(client, "spo2", data.spo2),
    getPointsForVitals(client, "bp_sys", data.bp_sys),
    getPointsForVitals(client, "rr", data.rr),
    getPointsForVitals(client, "tem", data.tem),

    getPointsForDisease(client, icdCodesOnly),

    getPointsForAge(client, data.age),
  ]);
  // Gỡ kết quả ra (Chú ý thứ tự phải khớp với Promise.all ở trên)
  const [p_hr, p_spo2, p_bp, p_rr, p_tem, p_disease, p_age] = result;
  const vitalScore = p_hr + p_spo2 + p_bp + p_rr + p_tem;
  const totalScore = vitalScore + p_disease + p_age;
  console.log(`Tổng điểm tính được: ${totalScore}`);
  return {
    vitalScore,
    totalScore,
    pathologyScore: p_disease,
    ageScore: p_age,
  };
};

const managerFormModel = {
  addForm: async (data) => {
    const client = await database.connect();
    try {
      await client.query("BEGIN");

      const { ageScore, pathologyScore, totalScore, vitalScore } =
        await calculateRiskScore(client, data);

      //get value to set up level
      const getValues = await getValuesToSetUpLv(client, totalScore);

      // insert into table patients
      const newPatientId = await insertPatientInfo(client, {
        fullName: data.fullName,
        dob: data.dob,
        age: data.age,
        gender: data.gender,
      });

      //get value device_code and room_id
      const getInfoAirmac = await assignAndGetDevice(
        client,
        newPatientId,
        data.selectedDevice,
      );

      // insert into table vitals
      await insertVitalsInfo(
        client,
        {
          hr: data.hr,
          spo2: data.spo2,
          bp_sys: data.bp_sys,
          rr: data.rr,
          tem: data.tem,
        },
        newPatientId,
      );

      // insert into table results
      await insertResultsTable(client, {
        patientId: newPatientId,
        vitalScore,
        pathologyScore: pathologyScore,
        ageScore: ageScore,
        totalScore,
        finalStatus: getValues.status,
        selectedIcdCodes: data.icdMapping,
        riskLevel: getValues.risk_level,
        thresholdValue: getValues.threshold_value,
        color_code: getValues.color_code,
      });

      await client.query("COMMIT");
      return {
        success: true,
        message: "Lưu hồ sơ thành công",

        patient_info: {
          id: newPatientId,
          full_name: data.fullName,
          dob: data.dob,
          age: data.age,
          gender: data.gender,
        },

        airmac_info: {
          device_code: getInfoAirmac?.device_code || null,
          room_id: getInfoAirmac?.room_id || null,
        },

        vitals_info: {
          hr: data.hr,
          spo2: data.spo2,
          bp_sys: data.bp_sys,
          rr: data.rr,
          tem: data.tem,
        },

        setup_level: {
          risk_level: getValues.risk_level,
          status: getValues.status,
          threshold_value: getValues.threshold_value,
          color_code: getValues.color_code,
        },
        selected_diseases: data.icdMapping,
      };
    } catch (err) {
      await client.query("ROLLBACK");
      console.log("Error calculate or insert: ", err);
      throw err;
    } finally {
      client.release();
    }
  },
  updateForm: async (data, patientId) => {
    const client = await database.connect();
    try {
      await client.query("BEGIN");
      const { ageScore, pathologyScore, totalScore, vitalScore } =
        await calculateRiskScore(client, data);
      //get value to set up level
      const getValues = await getValuesToSetUpLv(client, totalScore);

      await updatePatientInfo(
        client,
        {
          fullName: data.fullName,
          dob: data.dob,
          age: data.age,
          gender: data.gender,
        },
        patientId,
      );

      await updateVitalsInfo(
        client,
        {
          hr: data.hr,
          spo2: data.spo2,
          bp_sys: data.bp_sys,
          rr: data.rr,
          tem: data.tem,
        },
        patientId,
      );

      await updateDeviceInfo(client, data.selectedDevice, patientId);

      await updateResultInfo(client, {
        patientId: patientId,
        vitalScore,
        pathologyScore,
        ageScore,
        totalScore,
        finalStatus: getValues.status,
        selectedIcdCodes: data.icdMapping,
        riskLevel: getValues.risk_level,
        thresholdValue: getValues.threshold_value,
        color_code: getValues.color_code,
      });

      await client.query("COMMIT");
      return { success: true, message: "Cập nhật hồ sơ thành công" };
    } catch (err) {
      await client.query("ROLLBACK");
      console.log("ERROR caculate or update: ", err);
      throw err;
    } finally {
      client.release();
    }
  },
};
module.exports = managerFormModel;
